import { Shield, LayoutDashboard, Video, Bell, BarChart3, Settings, Activity, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Video, label: "Live Feeds", active: false },
  { icon: Bell, label: "Alerts", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Suspects", active: false },
  { icon: Activity, label: "Activity Log", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const Sidebar = () => {
  return (
    <aside className="w-[72px] hover:w-[240px] transition-all duration-300 bg-card border-r border-border flex flex-col items-center group overflow-hidden shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 w-full">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 glow-primary">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <p className="text-sm font-bold text-foreground tracking-wide">MotionGuard</p>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">AI Security</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 w-full px-3 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
              item.active
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Status */}
      <div className="w-full px-3 pb-6">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-success/5 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success pulse-dot shrink-0" />
          <span className="text-xs text-success font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
