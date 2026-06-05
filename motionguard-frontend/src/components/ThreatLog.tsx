import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, Clock, Shield, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ThreatAlert {
  id: string;
  type: "shoplifting" | "suspicious";
  title: string;
  description: string;
  time: string;
  camera: string;
}

interface ThreatLogProps {
  alerts: ThreatAlert[];
  onDeleteAlert?: (id: string) => void;
  onClearAll?: () => void;
}

const ThreatLog = ({ alerts, onDeleteAlert, onClearAll }: ThreatLogProps) => {
  return (
    <div className="card-elevated h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm transition-colors duration-300">
      
      {/* Log Header Section */}
      <div className="px-5 py-4 border-b border-border dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-destructive dark:text-rose-500" />
            <h2 className="text-sm font-semibold text-foreground dark:text-slate-100">Live Threat Log</h2>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground dark:text-slate-400 px-2 py-0.5 bg-muted dark:bg-slate-800 rounded-full transition-colors">
            {alerts.length} EVENTS
          </span>
        </div>
      </div>

      {/* Main Alert Content Viewport */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center py-16 px-4"
            >
              {/* Green Safeguard Icon Placeholder (Updated for clean Dark Blue contrast) */}
              <div className="w-14 h-14 rounded-full bg-success/10 dark:bg-emerald-950/30 flex items-center justify-center mb-4 transition-colors">
                <Shield className="w-7 h-7 text-success dark:text-emerald-400" />
              </div>
              <p className="text-sm font-medium text-foreground dark:text-slate-200 mb-1">All Clear</p>
              <p className="text-xs text-muted-foreground dark:text-slate-400">
                No threats detected. The system will alert you when suspicious activity is identified.
              </p>
            </motion.div>
          ) : (
            alerts.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg border p-3 transition-colors duration-200 ${
                  alert.type === "shoplifting"
                    ? "border-destructive/30 bg-destructive/5 dark:border-red-900/40 dark:bg-red-950/10"
                    : "border-warning/30 bg-warning/5 dark:border-amber-900/40 dark:bg-amber-950/10"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 relative ${
                    alert.type === "shoplifting" ? "bg-destructive dark:bg-rose-500" : "bg-warning dark:bg-amber-500"
                  } pulse-dot`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {alert.type === "shoplifting" ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-destructive dark:text-rose-400" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-warning dark:text-amber-400" />
                        )}
                        <span className={`text-[10px] font-mono font-bold uppercase ${
                          alert.type === "shoplifting" ? "text-destructive dark:text-rose-400" : "text-warning dark:text-amber-400"
                        }`}>
                          {alert.type === "shoplifting" ? "SHOPLIFTING ALERT" : "SUSPICIOUS"}
                        </span>
                      </div>
                      <button
                        onClick={() => onDeleteAlert?.(alert.id)}
                        className="p-0.5 rounded hover:bg-muted dark:hover:bg-slate-800 text-muted-foreground dark:text-slate-400 hover:text-destructive dark:hover:text-rose-400 transition-colors"
                        title="Delete alert"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-medium text-foreground dark:text-slate-200 mt-1">{alert.title}</p>
                    <p className="text-[11px] text-muted-foreground dark:text-slate-400 mt-0.5">{alert.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground dark:text-slate-500 font-mono">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </span>
                      <span className="text-[10px] text-muted-foreground dark:text-slate-500 font-mono">
                        {alert.camera}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Clear Logs Action Footer Area */}
      {alerts.length > 0 && (
        <div className="px-3 py-3 border-t border-border dark:border-slate-800 transition-colors duration-300">
          <Button
            onClick={onClearAll}
            variant="ghost"
            size="sm"
            className="w-full gap-2 text-xs text-muted-foreground dark:text-slate-400 hover:text-destructive dark:hover:text-rose-400 dark:hover:bg-slate-800/50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All Logs
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThreatLog;