import { motion } from "framer-motion";
import { Brain, Eye, ShieldCheck, Zap, TrendingDown, Clock, Fingerprint, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const useCases = [
  { icon: Brain, title: "AI-Powered Detection", desc: "Deep learning models trained on thousands of hours of retail footage identify suspicious behavior patterns with high accuracy." },
  { icon: Eye, title: "Real-Time Monitoring", desc: "Process live CCTV feeds with sub-second latency. Security staff receive instant alerts when threats are detected." },
  { icon: ShieldCheck, title: "Loss Prevention", desc: "Proactively identify concealment, tag removal, and unusual movement patterns before incidents occur." },
  { icon: Zap, title: "Instant Alerts", desc: "Push notifications and dashboard alerts for every detected event, with severity classification and visual evidence." },
];

const benefits = [
  { icon: TrendingDown, title: "Reduce Shrinkage", desc: "Cut retail losses by up to 70% with AI automation." },
  { icon: Clock, title: "24/7 Coverage", desc: "Continuous monitoring without fatigue or blind spots." },
  { icon: Fingerprint, title: "Accurate Detection", desc: "Minimized false positives with intelligent filtering." },
  { icon: BarChart3, title: "Actionable Insights", desc: "Analytics dashboard for security trends and patterns." },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-slate-950 text-foreground dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-slate-900 text-primary dark:text-sky-400 text-xs font-medium mb-6 border dark:border-slate-800">
              <Eye className="w-3.5 h-3.5" />
              System Architecture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-slate-100 mb-5 leading-tight">
              How <span className="text-primary dark:text-sky-400">MotionGuard AI</span> Works
            </h1>
            <p className="text-base text-muted-foreground dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              MotionGuard AI is an intelligent retail security system that leverages computer vision and deep learning
              to detect, classify, and alert on suspicious behavior in real-time. Built to protect your store around the clock,
              our system transforms passive CCTV cameras into proactive security agents.
            </p>
          </motion.div>
        </section>

        {/* Use Cases Section */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated dark:bg-slate-900 dark:border-slate-800/80 p-7 hover:shadow-lg dark:hover:shadow-blue-950/20 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-primary/15 dark:group-hover:bg-slate-700/50 transition-colors">
                  <item.icon className="w-5 h-5 text-primary dark:text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground dark:text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Grid Banner Section */}
        <section className="bg-card dark:bg-slate-900/50 border-y border-border dark:border-slate-900 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-bold text-foreground dark:text-slate-100 mb-3">Real-Time Benefits</h2>
              <p className="text-sm text-muted-foreground dark:text-slate-400 max-w-lg mx-auto">
                Deploy MotionGuard AI and see measurable impact on your security operations from day one.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                    <b.icon className="w-5 h-5 text-primary dark:text-sky-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground dark:text-slate-200 mb-1">{b.title}</h4>
                  <p className="text-xs text-muted-foreground dark:text-slate-400">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Developer Section */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-elevated dark:bg-slate-900 dark:border-slate-800 p-8 flex flex-col md:flex-row items-center gap-8 transition-colors duration-300"
          >
            {/* <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-muted dark:bg-slate-800 border-2 border-border dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
              <img 
                src="/profile.jpeg" 
                alt="Anas Mustafa" 
                className="w-full h-full object-cover" 
              />
            </div> */}
            <div className="text-center md:text-left">
              <h3 className="text-xl text-center font-bold text-foreground dark:text-slate-100 mb-2">About the Developer</h3>
              <p className="text-sm text-muted-foreground dark:text-slate-400 leading-relaxed">
                MotionGuard AI was developed by <span className="font-semibold text-foreground dark:text-slate-200">Anas Mustafa</span> as 
                a Final Year Project under the supervision of <span className="font-semibold text-foreground dark:text-slate-200">Dr. Ahmad Mateen Buttar</span>. 
                This system was built as a capstone project combining computer vision, deep learning, 
                and modern web technologies to create an intelligent, automated retail security platform.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;