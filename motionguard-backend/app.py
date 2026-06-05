import cv2
import time
import os
from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load YOLO Model
model = YOLO("best.pt")

# Global variables for AI logic synchronized with your tuned state machine
states = {
    "threat_score": 0.0,
    "crime_committed": False,
    "suspicion_duration": 0,
    "hiding_streak": 0,
    "is_running": False,
    "current_source": 0 
}

def reset_logic():
    global states
    states.update({
        "threat_score": 0.0,
        "crime_committed": False,
        "suspicion_duration": 0,
        "hiding_streak": 0,
        "is_running": True
    })

@app.route('/reset_system', methods=['POST'])
def reset_system():
    global states
    data = request.get_json()
    source_type = data.get('source', 'webcam')
    file_name = data.get('file_name')
    
    reset_logic()
    
    if source_type == 'webcam':
        states["current_source"] = 0
    else:
        base_path = os.path.dirname(os.path.abspath(__file__))
        states["current_source"] = os.path.join(base_path, "test_videos", file_name)
    
    return jsonify({"status": "success", "source": states["current_source"]})

@app.route('/stop_system', methods=['POST'])
def stop_system():
    global states
    states["is_running"] = False
    return jsonify({"status": "stopped"})

def generate_frames():
    global states
    cap = cv2.VideoCapture(states["current_source"])

    fps = cap.get(cv2.CAP_PROP_FPS)
    if fps <= 0 or fps > 100:  
        fps = 30.0
    
    target_frame_duration = 1.0 / fps

    # PERSISTENT STORAGE FOR SKIPPED FRAMES (Maintains UI Stability)
    frame_count = 0
    best_box = None
    is_shoplifting = False
    shoplifting_conf = 0.0

    while cap.isOpened() and states["is_running"]:
        start_time = time.time()  
        
        success, frame = cap.read()
        if not success:
            break

        frame_count += 1

        # 🎯 FIX SPEED BOTTLENECK: ONLY EXECUTE HEAVY MODEL PREDICTIONS ON EVERY 3RD FRAME
        if frame_count % 3 == 0:
            results = model.predict(frame, imgsz=320, conf=0.25, verbose=False)
            
            highest_shoplifting_conf = 0.0
            shoplifting_conf = 0.0
            is_shoplifting = False
            best_box = None

            for r in results:
                for box in r.boxes:
                    conf = float(box.conf[0])
                    cls_id = int(box.cls[0])
                    class_name = str(model.names[cls_id]).lower()

                    if class_name == "shoplifting" or str(cls_id) == "1":
                        is_shoplifting = True
                        if conf > shoplifting_conf:
                            shoplifting_conf = conf
                        
                        if conf > highest_shoplifting_conf:
                            highest_shoplifting_conf = conf
                            best_box = box

            # --- YOUR EXACT EXACT TUNED BEHAVIOR STATE MACHINE ---
            if not states["crime_committed"]:
                if is_shoplifting:
                    if shoplifting_conf >= 0.80:
                        states["hiding_streak"] += 1
                        states["suspicion_duration"] += 1
                        
                        if states["suspicion_duration"] > 12 and states["hiding_streak"] >= 5:
                            states["threat_score"] += 8.0
                        else:
                            states["threat_score"] += 3.0
                            if states["threat_score"] > 60.0:
                                states["threat_score"] = 60.0
                    
                    elif shoplifting_conf >= 0.45:
                        states["hiding_streak"] = 0
                        states["suspicion_duration"] += 1
                        states["threat_score"] += 1.5  
                        
                        # Sustained suspicion logic breaks past 45% if held beyond 10 detection increments
                        if states["threat_score"] > 45.0 and states["suspicion_duration"] <= 10:
                            states["threat_score"] = 45.0
                    
                    else:
                        states["hiding_streak"] = 0
                        states["threat_score"] += 0.1
                        if states["threat_score"] > 15.0:
                            states["threat_score"] = 15.0
                else:
                    states["hiding_streak"] = 0
                    states["suspicion_duration"] = max(0, states["suspicion_duration"] - 3)
                    states["threat_score"] -= 10.0

                states["threat_score"] = max(0.0, min(100.0, states["threat_score"]))
                
                if states["threat_score"] >= 85.0:
                    states["crime_committed"] = True
                    socketio.emit('new_alert', {
                        'id': str(time.time()),
                        'type': 'shoplifting',
                        'title': 'Theft Detected',
                        'description': 'AI identified concealment pattern into clothing/pocket.',
                        'time': time.strftime("%I:%M %p"),
                        'camera': 'CAM-01'
                    })
            else:
                states["threat_score"] = 100.0

        # --- RENDERER (Runs on every frame to ensure continuous tracking lines) ---
        if best_box is not None:
            x1, y1, x2, y2 = map(int, best_box.xyxy[0])

            if states["crime_committed"]:
                box_color = (0, 0, 255) 
                display_label = f"THEFT DETECTED {int(states['threat_score'])}%"
            elif states["threat_score"] >= 45:
                box_color = (0, 165, 255) 
                display_label = f"CONCEALMENT RISK {int(states['threat_score'])}%"
            else:
                box_color = (0, 255, 0) 
                display_label = f"NORMAL BROWSING {int(states['threat_score'])}%"

            # Thin bounding box line around body profile
            cv2.rectangle(frame, (x1, y1), (x2, y2), box_color, 1)
            
            # Text layout configurations
            (w, h), _ = cv2.getTextSize(display_label, cv2.FONT_HERSHEY_SIMPLEX, 0.4, 1)
            cv2.rectangle(frame, (x1, y1 - h - 8), (x1 + w + 6, y1), box_color, -1)
            cv2.putText(frame, display_label, (x1 + 3, y1 - 4), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255, 255, 255), 1)

        ret, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

        # DYNAMIC SPEED SYNC WITH BUILT-IN OVERHEAD CATCH-UP
        elapsed_processing_time = time.time() - start_time
        remaining_sleep_duration = target_frame_duration - elapsed_processing_time
        
        # If running a video file, allow an optimized fallback catch-up break
        if states["current_source"] != 0:
            if remaining_sleep_duration > 0:
                time.sleep(remaining_sleep_duration)
            else:
                # CPU is heavily burdened; provide a tiny default yield to prevent system freezing
                time.sleep(0.001)
        else:
            # Running via live Webcam (No synthetic delay matching needed)
            if remaining_sleep_duration > 0:
                time.sleep(remaining_sleep_duration)

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    socketio.run(app, port=5000, host='0.0.0.0')