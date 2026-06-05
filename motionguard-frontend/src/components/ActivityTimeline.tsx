import { motion } from "framer-motion";
import { Shield, Eye, AlertTriangle, CheckCircle } from "lucide-react";

const activities = [
  { icon: AlertTriangle, text: "Alert triggered on CAM-04", time: "14:23", color: "text-destructive", bg: "bg-destructive/10" },
  { icon: Eye, text: "AI detection model updated", time: "14:10", color: "text-primary", bg: "bg-primary/10" },
  { icon: CheckCircle, text: "Incident #847 resolved", time: "13:55", color: "text-success", bg: "bg-success/10" },
  { icon: Shield, text: "Security patrol completed Zone B", time: "13:40", color: "text-primary", bg: "bg-primary/10" },
  { icon: AlertTriangle, text: "Motion detected in restricted area", time: "13:22", color: "text-warning", bg: "bg-warning/10" },
  { icon: CheckCircle, text: "System health check passed", time: "13:00", color: "text-success", bg: "bg-success/10" },
];

const ActivityTimeline = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Activity Timeline</h3>
        <span className="text-[10px] font-mono text-muted-foreground">TODAY</span>
      </div>
      <div className="space-y-3">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <span className="text-[10px] font-mono text-muted-foreground w-10 shrink-0">{item.time}</span>
            <div className={`p-1.5 rounded ${item.bg}`}>
              <item.icon className={`w-3 h-3 ${item.color}`} />
            </div>
            <p className="text-xs text-foreground/80">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
