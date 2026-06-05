import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPin, ChevronRight } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "high",
    title: "Suspicious Behavior Detected",
    location: "Aisle 3 - Electronics",
    camera: "CAM-04",
    time: "2 min ago",
    description: "Individual concealing merchandise in bag",
  },
  {
    id: 2,
    type: "high",
    title: "Unauthorized Zone Entry",
    location: "Parking Lot - East",
    camera: "CAM-12",
    time: "8 min ago",
    description: "Movement detected in restricted area after hours",
  },
  {
    id: 3,
    type: "medium",
    title: "Loitering Detected",
    location: "Entrance - Main",
    camera: "CAM-01",
    time: "15 min ago",
    description: "Individual present for extended duration without purchase",
  },
  {
    id: 4,
    type: "low",
    title: "Tag Removal Attempt",
    location: "Aisle 1 - Cosmetics",
    camera: "CAM-02",
    time: "32 min ago",
    description: "Possible security tag tampering detected",
  },
];

const severityStyles = {
  high: { bg: "bg-destructive/10", border: "border-destructive/30", dot: "bg-destructive", text: "text-destructive" },
  medium: { bg: "bg-warning/10", border: "border-warning/30", dot: "bg-warning", text: "text-warning" },
  low: { bg: "bg-primary/10", border: "border-primary/30", dot: "bg-primary", text: "text-primary" },
};

const AlertsPanel = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recent Alerts</h2>
          <p className="text-xs text-muted-foreground font-mono">4 ALERTS • 2 HIGH PRIORITY</p>
        </div>
        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          View All →
        </button>
      </div>

      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const styles = severityStyles[alert.type as keyof typeof severityStyles];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg border ${styles.border} ${styles.bg} p-4 cursor-pointer hover:bg-opacity-20 transition-all group`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full ${styles.dot} mt-2 shrink-0 pulse-dot`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <span className={`text-[10px] font-mono uppercase font-bold ${styles.text} shrink-0`}>
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <MapPin className="w-3 h-3" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
