import { motion } from "framer-motion";
import { Mail, Phone, Send, MessageCircle, Headphones } from "lucide-react";
import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = "service_vzer918"; 
    const TEMPLATE_ID = "template_zuvi7cg"; 
    const PUBLIC_KEY = "4fyxJtw_4NX-Gm14_";   

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
          publicKey: PUBLIC_KEY,
        })
        .then(
          () => {
            setSubmitted(true);
            toast.success("Inquiry Sent!", {
              description: "Anas Mustafa will review your message shortly.",
            });
          },
          (error) => {
            console.error("EmailJS Error:", error);
            toast.error("Send Failed", {
              description: "Check your console (F12) for the specific error.",
            });
          }
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-slate-950 text-foreground dark:text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
        
        {/* Support Header Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-slate-900 text-primary dark:text-sky-400 text-xs font-medium mb-6 font-mono border dark:border-slate-800">
            <Headphones className="w-3.5 h-3.5" />
            Support Center
          </div>
          <h1 className="text-4xl font-bold text-foreground dark:text-slate-100 mb-3 tracking-tight">Get Support</h1>
          <p className="text-muted-foreground dark:text-slate-400 max-w-md mx-auto">
            Have questions about MotionGuard AI? We are here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Details Side Grid */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="space-y-5">
              
              {/* Email Card */}
              <div className="card-elevated dark:bg-slate-900 dark:border-slate-800/80 p-6 flex items-start gap-4 border-l-4 border-l-primary transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-slate-200 text-xs uppercase tracking-widest mb-1">Email</h3>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anasmustafa464@gmail.com" className="text-sm text-primary dark:text-sky-400 hover:underline font-mono">
                    anasmustafa464@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="card-elevated dark:bg-slate-900 dark:border-slate-800/80 p-6 flex items-start gap-4 border-l-4 border-l-emerald-500 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/30">
                  <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-slate-200 text-xs uppercase tracking-widest mb-1">WhatsApp</h3>
                  <a href="https://wa.me/923081872437" target="_blank" rel="noreferrer" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-mono">
                    +92 308 1872437
                  </a>
                </div>
              </div>
                
              {/* Call Card */}
              <div className="card-elevated dark:bg-slate-900 dark:border-slate-800/80 p-6 flex items-start gap-4 border-l-4 border-l-blue-500 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground dark:text-slate-200 text-xs uppercase tracking-widest mb-1">Call</h3>
                  <a href="tel:+923081872437" className="text-sm text-blue-600 dark:text-sky-400 hover:underline font-mono">
                    +92 308 1872437
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Input Form Panel */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            {submitted ? (
              <div className="card-elevated p-10 text-center border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-slate-900 shadow-sm transition-all">
                <Send className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">Message Sent!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">We will get back to you shortly.</p>
                
                {/* STYLING FIX: Replaced default outline buttons to maintain high-contrast text styles in Dark Mode */}
                <Button 
                  onClick={() => setSubmitted(false)} 
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="card-elevated p-8 space-y-5 bg-white dark:bg-slate-900 shadow-sm border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm dark:text-slate-100 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Address</label>
                  <input
                    name="reply" 
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm dark:text-slate-100 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Subject</label>
                  <input
                    name="title" 
                    type="text"
                    placeholder="Technical Inquiry"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm dark:text-slate-100 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Message</label>
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm dark:text-slate-100 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors">
                  {loading ? "Sending Message..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;