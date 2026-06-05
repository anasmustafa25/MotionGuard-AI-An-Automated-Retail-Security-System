import { motion } from "framer-motion";
import { Camera, AlertTriangle, ShieldCheck, Eye } from "lucide-react";

const stats = [
  {
    label: "Active Cameras",
    value: "12",
    sub: "All online",
    icon: Camera,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Detections Today",
    value: "47",
    sub: "+12 from yesterday",
    icon: Eye,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    label: "Active Alerts",
    value: "3",
    sub: "2 high priority",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
  },
  {
    label: "Prevented Incidents",
    value: "128",
    sub: "This month",
    icon: ShieldCheck,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative rounded-lg border ${stat.border} ${stat.bg} p-5 overflow-hidden`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 font-mono ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
