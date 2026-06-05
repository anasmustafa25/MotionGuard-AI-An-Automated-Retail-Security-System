import { motion } from "framer-motion";
import { Upload, Video, ShieldCheck, AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";

const HeroSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setSelectedVideo(url);
    }
  };

  return (
    <div className="gradient-hero">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            AI-Powered Shoplifting Detection
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            Secure Your Store with{" "}
            <span className="text-primary">Intelligent</span> Surveillance
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload pre-recorded footage or connect live CCTV feeds. MotionGuard's AI detects suspicious behavior in real-time.
          </p>
        </motion.div>

        {/* Video Source Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Upload from device */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer rounded-2xl border-2 border-dashed border-border hover:border-primary bg-card p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-1">Upload Video</h3>
              <p className="text-sm text-muted-foreground">
                Select a pre-recorded video from your device to test AI detection
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
              CLICK TO BROWSE
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* CCTV option */}
          <div className="relative rounded-2xl border-2 border-dashed border-border bg-card p-8 flex flex-col items-center gap-4 opacity-60 cursor-not-allowed">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 border border-warning/20">
              <AlertTriangle className="w-3 h-3 text-warning" />
              <span className="text-[10px] font-mono font-semibold text-warning">NOT AVAILABLE</span>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Video className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-1">Connect CCTV</h3>
              <p className="text-sm text-muted-foreground">
                Live feed from connected CCTV cameras — coming soon
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-muted text-muted-foreground">
              COMING SOON
            </span>
          </div>
        </motion.div>

        {/* Video Player */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-2 text-xs font-mono text-muted-foreground truncate">{fileName}</span>
              </div>
              <video
                src={selectedVideo}
                controls
                className="w-full aspect-video bg-foreground/5"
              />
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default HeroSection;
