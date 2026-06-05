import { Eye } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border dark:border-slate-900 bg-card dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary dark:text-sky-400" />
            <span className="font-semibold text-foreground dark:text-slate-200 text-sm">MotionGuard AI</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-slate-400">
            <span>Developed by</span>
            <span className="font-mono font-semibold text-foreground dark:text-slate-100 typewriter-text inline-block">
              Anas Mustafa
            </span>
          </div>
          <p className="text-xs text-muted-foreground dark:text-slate-500 text-center">
            © {new Date().getFullYear()} MotionGuard AI. An Automated Retail Security System.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;