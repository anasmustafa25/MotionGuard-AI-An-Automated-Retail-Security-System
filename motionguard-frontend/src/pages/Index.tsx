import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { Eye, Play, Square, Video, Shield, Activity, Upload, RefreshCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreatLog, { type ThreatAlert } from "@/components/ThreatLog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [sessionID, setSessionID] = useState(0);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem("motionguard_logs");
    if (savedLogs) setAlerts(JSON.parse(savedLogs));
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("new_alert", (newAlert: ThreatAlert) => {
      toast.error("THEFT DETECTED", { description: newAlert.description });
      setAlerts((prev) => {
        const updated = [newAlert, ...prev];
        localStorage.setItem("motionguard_logs", JSON.stringify(updated));
        return updated;
      });
    });
    return () => { socket.disconnect(); };
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
      setSelectedFileName(file.name);
      toast.success(`Video Loaded: ${file.name}`);
    }
  };

  const handleStart = async (sourceType: 'video' | 'webcam') => {
    try {
      const response = await fetch("http://localhost:5000/reset_system", { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            source: sourceType, 
            file_name: sourceType === 'video' ? selectedFileName : null 
        })
      });
      if (response.ok) {
        setSessionID(Date.now());
        setIsRunning(true);
        if (sourceType === 'webcam') setVideoPreview(null);
      }
    } catch (e) {
      toast.error("Backend Connection Failed");
    }
  };

  const handleStop = async () => {
    setIsRunning(false);
    await fetch("http://localhost:5000/stop_system", { method: "POST" });
  };

  const handleClearVideo = () => {
    handleStop(); 
    setVideoPreview(null);
    setSelectedFileName(null);
    setSessionID(0);
    if (fileInputRef.current) fileInputRef.current.value = ""; 
    toast.info("Viewport Cleared");
  };

  const handleClearAlerts = () => {
    setAlerts([]);
    localStorage.removeItem("motionguard_logs");
    toast.info("Logs cleared permanently");
  };

  const handleDeleteAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    localStorage.setItem("motionguard_logs", JSON.stringify(updated));
  };

  return (
    // Root container transitions background color from light gray to midnight blue slate
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-4 md:py-8">
        
        {/* Centered Panel Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-slate-900 dark:text-sky-400 text-xs font-medium border border-primary/20 dark:border-slate-800 font-mono">
            <Eye className="w-3.5 h-3.5" /> Control Panel
          </div>
        </div>

        {/* Title and Status section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 text-center sm:text-left">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Security Dashboard
            </h1>
          </div>
          <div className={`px-3 py-1 rounded-full border flex items-center gap-2 transition-all ${
            isRunning 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50' 
              : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-800'
          }`}>
             <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
             <span className="text-[10px] font-bold uppercase tracking-wider">
               {isRunning ? "System Online" : "System Offline"}
             </span>
          </div>
        </div>

        {/* Dynamic Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[ 
            { label: 'Active Feed', val: isRunning ? "1" : "0", icon: Video, color: 'text-blue-600 dark:text-sky-400', bg: 'bg-blue-50 dark:bg-slate-800/50' },
            { label: 'Detections', val: alerts.length, icon: Shield, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30' },
            { label: 'Status', val: isRunning ? "Live" : "Standby", icon: Activity, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' }
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center gap-4 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {s.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Viewport and Controls Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-slate-900 aspect-video relative rounded-3xl border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800/50">
              {isRunning ? (
                <img src={`http://localhost:5000/video_feed?v=${sessionID}`} className="w-full h-full object-contain" alt="Feed" />
              ) : videoPreview ? (
                <video src={videoPreview} className="w-full h-full object-contain bg-black" muted />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300">
                  <Video className="w-8 h-8 opacity-20 mb-2 dark:text-sky-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 dark:opacity-60">
                    Awaiting Input
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Controls Dashboard Dock */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm flex flex-wrap items-center gap-3 transition-colors duration-300">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="video/*" />
              
              <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-bold h-11 px-6 rounded-xl">
                <Upload className="w-4 h-4 mr-2" /> Upload Video 
              </Button>
              
              <div className="flex-1" />
              
              <Button onClick={() => handleStart('video')} disabled={isRunning || !videoPreview} className="bg-emerald-600 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 font-bold h-11 px-6 rounded-xl">
                <Play className="w-4 h-4 mr-2 fill-current" /> Start
              </Button>
              
              <Button onClick={handleStop} disabled={!isRunning} className="bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400 font-bold h-11 px-6 rounded-xl">
                <Square className="w-4 h-4 mr-2 fill-current" /> Stop
              </Button>
              
              <Button onClick={handleClearVideo} variant="ghost" className="h-11 px-4 text-slate-400 dark:text-slate-500 dark:hover:text-slate-300 rounded-xl">
                <RefreshCcw className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </div>
          
          {/* Real-time Incident Threat Tracker panel */}
          <div className="w-full">
            <ThreatLog 
              alerts={alerts} 
              onDeleteAlert={handleDeleteAlert} 
              onClearAll={handleClearAlerts} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;