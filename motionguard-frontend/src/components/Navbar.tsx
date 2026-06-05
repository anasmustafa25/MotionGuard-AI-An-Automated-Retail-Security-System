import { Eye, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/about", label: "System Architecture" },
  { to: "/contact", label: "Support" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // On initialization, track previous theme history or evaluate native system choices
  useEffect(() => {
    const savedTheme = localStorage.getItem("motionguard_theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Theme changing trigger loop
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("motionguard_theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("motionguard_theme", "light");
    }
  };

  // Check if user is authenticated in Local Storage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // LOGOUT FUNCTION: Clears session and redirects to login
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/auth";
  };

  // If NOT logged in, return null (renders nothing)
  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-border/50 bg-background/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Branding Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-primary dark:bg-blue-600 flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <Eye className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-foreground dark:text-slate-100 tracking-tight">MotionGuard</span>
            <span className="text-lg font-bold text-primary dark:text-sky-400 tracking-wide">AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 border-r border-border dark:border-slate-800 pr-4 mr-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground dark:bg-slate-900 dark:text-sky-400 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>

          {/* Vertical Separator Divider */}
          <div className="h-4 w-[1px] bg-border dark:bg-slate-800" />

          {/* NEW: Dynamic Switch Button (Placed on the most right side) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-border dark:border-slate-800 bg-muted/50 dark:bg-slate-900 text-muted-foreground hover:text-foreground dark:text-sky-400 dark:hover:text-sky-300 transition-all duration-300 shadow-sm"
            aria-label="Toggle Application Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted dark:hover:bg-slate-900 text-foreground transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border dark:border-slate-800 px-6 py-4 space-y-3 bg-background/95 dark:bg-slate-950/95 backdrop-blur-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground dark:bg-slate-900 dark:text-sky-400"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-border dark:border-slate-800 flex items-center justify-between gap-4">
            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

            {/* Mobile Theme Switch Button Icon */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border dark:border-slate-800 bg-muted/50 dark:bg-slate-900 text-muted-foreground dark:text-sky-400"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;