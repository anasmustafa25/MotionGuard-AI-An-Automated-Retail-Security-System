🛡️ 𝐌𝐨𝐭𝐢𝐨𝐧𝐆𝐮𝐚𝐫𝐝 𝐀𝐈: 𝐀𝐧 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐞𝐝 𝐑𝐞𝐭𝐚𝐢𝐥 𝐒𝐞𝐜𝐮𝐫𝐢𝐭𝐲 𝐒𝐲𝐬𝐭𝐞𝐦 

A fully 𝐢𝐧𝐭𝐞𝐫𝐚𝐜𝐭𝐢𝐯𝐞 and 𝐫𝐞𝐚𝐥 𝐭𝐢𝐦𝐞 𝐜𝐨𝐦𝐩𝐮𝐭𝐞𝐫 𝐯𝐢𝐬𝐢𝐨𝐧 platform designed to track, identify, and mitigate 𝐫𝐞𝐭𝐚𝐢𝐥 𝐬𝐡𝐨𝐩𝐥𝐢𝐟𝐭𝐢𝐧𝐠 𝐛𝐞𝐡𝐚𝐯𝐢𝐨𝐫𝐬 and 𝐢𝐭𝐞𝐦 𝐜𝐨𝐧𝐜𝐞𝐚𝐥𝐦𝐞𝐧𝐭 𝐞𝐯𝐞𝐧𝐭𝐬.


📷 𝐒𝐲𝐬𝐭𝐞𝐦 𝐏𝐫𝐞𝐯𝐢𝐞𝐰

<img width="1384" height="915" alt="Screenshot 2026-06-02 170600" src="https://github.com/user-attachments/assets/8adabd3c-8d33-4d4d-b86f-46190ba3bc83" />


𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰 

This project transforms traditional, passive security camera feeds into an automated anti-theft environment. It integrates a fine-tuned 𝐘𝐎𝐋𝐎𝐯8 object detection model with a custom-engineered 3-𝐓𝐢𝐞𝐫 𝐓𝐞𝐦𝐩𝐨𝐫𝐚𝐥 𝐁𝐞𝐡𝐚𝐯𝐢𝐨𝐫 𝐒𝐭𝐚𝐭𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞 to evaluate human actions frame-by-frame, preventing false alarms and sending instant visual and audible alerts over 𝐖𝐞𝐛𝐒𝐨𝐜𝐤𝐞𝐭𝐬 the moment a crime is verified.

🔍 𝐅𝐞𝐚𝐭𝐮𝐫𝐞𝐬

🤖 𝐀𝐈-𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐃𝐞𝐭𝐞𝐜𝐭𝐢𝐨𝐧: Specialized spatial tracking fine-tuned via 𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 to isolate micro-behaviors associated with product concealment.

⚙️ 3-𝐓𝐢𝐞𝐫 𝐒𝐭𝐚𝐭𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞: Caches frame prediction histories over a moving temporal window to differentiate normal browsing from genuine shoplifting.

🛑 𝐒𝐚𝐟𝐞𝐭𝐲 𝐂𝐚𝐩 𝐌𝐞𝐜𝐡𝐚𝐧𝐢𝐬𝐦: Locks lower-confidence pocket proximity detections at a hard ceiling of 45% threat, breaking only under sustained, continuous concealment to fully eradicate false positives.

🚀 𝐃𝐲𝐧𝐚𝐦𝐢𝐜 𝐅𝐫𝐚frame 𝐒𝐤𝐢𝐩𝐩𝐢𝐧𝐠: Runs heavy deep learning layers on a modulo sequence (frame_count % 3 == 0) to slash CPU computational load by 66% and maintain fluid, real-time video playback.

⚡ 𝐋𝐨𝐰-𝐋𝐚𝐭𝐞𝐧𝐜𝐲 𝐀𝐥𝐞𝐫𝐭𝐢𝐧𝐠: Utilizes persistent bidirectional Flask-SocketIO pipelines to broadcast live theft events to the client interface instantaneously.

🌙 𝐓𝐡𝐞𝐦𝐞-𝐀𝐰𝐚𝐫𝐞 𝐃𝐚𝐬𝐡𝐛𝐨𝐚𝐫𝐝: A minimalist UI featuring an intuitive light mode and a midnight-slate dark mode configuration designed to reduce eye strain during continuous security monitoring shifts.

📧 𝐒𝐞𝐜𝐮𝐫𝐞 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐇𝐮𝐛: Integrated client form routing automated via a server-independent EmailJS pipeline for instant administrator inquiries. 

🛠️ 𝐓𝐨𝐨𝐥𝐬 & 𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐢𝐞𝐬 

𝐔𝐬𝐞𝐝𝐔𝐥𝐭𝐫𝐚𝐥𝐲𝐭𝐢𝐜𝐬 𝐘𝐎𝐋𝐎𝐯8: Machine learning model core for spatial human behavior profiling. 𝐎𝐩𝐞𝐧𝐂𝐕 (𝐜𝐯2): Core video infrastructure managing video file parsing, matrix manipulation, and frame-buffer streaming.  

𝐅𝐥𝐚𝐬𝐤 & 𝐅𝐥𝐚𝐬𝐤-𝐒𝐨𝐜𝐤𝐞𝐭𝐈𝐎: High-performance Python backend server managing state variables and broadcasting real-time network alert events. 

𝐍𝐞𝐱𝐭.𝐣𝐬 / 𝐑𝐞𝐚𝐜𝐭 / 𝐓𝐚𝐢𝐥𝐰𝐢𝐧𝐝 𝐂𝐒𝐒: Full-stack frontend application framework driving the responsive monitoring dashboard layouts. 

𝐄𝐦𝐚𝐢𝐥𝐉𝐒: Serverless notification architecture for managing administrative bug reports and technical inquiries.

📁 𝐒𝐲𝐬𝐭𝐞𝐦 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞

The platform functions continuously across four highly integrated pipeline domains:𝐕𝐢𝐝𝐞𝐨 𝐈𝐧𝐠𝐞𝐬𝐭𝐢𝐨𝐧: OpenCV decodes pre-recorded .mp4 video files from the test_videos/ path, scaling dimensions to 320px (imgsz=320) to heavily conserve general CPU capacity. 

𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐄𝐱𝐭𝐫𝐚𝐜𝐭𝐢𝐨𝐧: YOLOv8 extracts target coordinate vectors (x1, y1, x2, y2) and confidence arrays strictly associated with custom behavior feature maps. 

𝐁𝐞𝐡𝐚𝐯𝐢𝐨𝐫𝐚𝐥 𝐄𝐯𝐚𝐥𝐮𝐚𝐭𝐢𝐨𝐧: The state machine calculates threat scores continuously. Clear browsing triggers an active cooldown drain (-10.0 points/frame) down to a strict 0% floor, whereas verified concealment rapidly builds threat values up toward a critical 85% breach line. 

𝐀𝐥𝐞𝐫𝐭 𝐃𝐢𝐬𝐩𝐚𝐭𝐜𝐡: Once breached, crime_committed turns True, forcing a red bounding box rendering overlay on the video feed and updating the frontend ThreatLog.tsx panel instantly via WebSockets. 

📌 𝐇𝐨𝐰 𝐭𝐨 𝐔𝐬𝐞 & 𝐑𝐮𝐧

1. 𝐂𝐥𝐨𝐧𝐞 𝐭𝐡𝐞 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐲Bashgit clone https://github.com/AnasMustafa/MotionGuard-AI.git
cd MotionGuard-AI

3. 𝐒𝐞𝐭 𝐔𝐩 𝐭𝐡𝐞 𝐅𝐥𝐚𝐬𝐤 𝐁𝐚𝐜𝐤𝐞𝐧𝐝Bashcd backend
pip install -r requirements.txt
python app.py
(The AI engine will initialize and boot up locally on http://localhost:5000)

4. 𝐒𝐞𝐭 𝐔𝐩 𝐭𝐡𝐞 𝐍𝐞𝐱𝐭.𝐣𝐬 𝐅𝐫𝐨𝐧𝐭𝐞𝐧𝐝Bashcd ../frontend
npm install
npm run dev
(Open http://localhost:3000 in your web browser to access the live dashboard)

5. 𝐓𝐞𝐬𝐭 𝐃𝐞𝐭𝐞𝐜𝐭𝐢𝐨𝐧 𝐒𝐞𝐪𝐮𝐞𝐧𝐜𝐞𝐬Use the dashboard interface dropdown to select an operational pre-recorded video source file from your test_videos/ archive folder.Click Start to watch the state machine initialize from scratch and monitor the dynamic color-shifting tracking frames live.
 
✒️ 𝐀𝐮𝐭𝐡𝐨𝐫: Anas Mustafa (2022-AG-7706) — Computer Science Undergraduate Student.
