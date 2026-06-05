import { motion } from "framer-motion";
import { Maximize2, AlertTriangle } from "lucide-react";

const feeds = [
  { id: 1, name: "Entrance - Main", location: "CAM-01", status: "live", alert: false },
  { id: 2, name: "Aisle 3 - Electronics", location: "CAM-04", status: "live", alert: true },
  { id: 3, name: "Checkout Area", location: "CAM-07", status: "live", alert: false },
  { id: 4, name: "Storage Room", location: "CAM-09", status: "live", alert: false },
  { id: 5, name: "Parking Lot - East", location: "CAM-12", status: "live", alert: true },
  { id: 6, name: "Aisle 1 - Cosmetics", location: "CAM-02", status: "live", alert: false },
];

const VideoFeedGrid = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Live Monitoring</h2>
          <p className="text-xs text-muted-foreground font-mono">6 FEEDS ACTIVE • AI DETECTION ENABLED</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-destructive pulse-dot" />
          <span className="text-xs font-mono text-destructive">REC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {feeds.map((feed, i) => (
          <motion.div
            key={feed.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`relative rounded-lg overflow-hidden border group cursor-pointer ${
              feed.alert ? "border-destructive/50 glow-danger" : "border-border hover:border-primary/30"
            }`}
          >
            {/* Simulated video feed */}
            <div className="aspect-video bg-muted relative grid-pattern">
              {/* Scan line effect */}
              <div className="absolute inset-0 scan-line pointer-events-none" />

              {/* Camera overlay info */}
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <span className="text-[10px] font-mono bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded text-foreground">
                  {feed.location}
                </span>
                {feed.alert && (
                  <span className="flex items-center gap-1 text-[10px] font-mono bg-destructive/90 text-destructive-foreground px-2 py-0.5 rounded">
                    <AlertTriangle className="w-3 h-3" />
                    ALERT
                  </span>
                )}
              </div>

              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive pulse-dot" />
                  <span className="text-[10px] font-mono text-destructive">LIVE</span>
                </div>
              </div>

              {/* Center play / AI indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/60 pulse-dot" />
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="absolute bottom-2 left-2">
                <span className="text-[10px] font-mono bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded text-muted-foreground">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              {/* Expand */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary/20">
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Feed info */}
            <div className="px-3 py-2 bg-card">
              <p className="text-sm font-medium text-foreground">{feed.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeedGrid;
