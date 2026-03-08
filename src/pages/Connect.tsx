import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/hasnainhkhan",
    color: "hover:border-[#333] hover:shadow-[0_0_30px_rgba(51,51,51,0.3)]",
    bg: "bg-[#333]/10",
    desc: "Check out my repositories & open source work",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/hasnainhaidar/",
    color: "hover:border-[#0A66C2] hover:shadow-[0_0_30px_rgba(10,102,194,0.3)]",
    bg: "bg-[#0A66C2]/10",
    desc: "Connect with me professionally",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/hasnain4tech",
    color: "hover:border-[#E4405F] hover:shadow-[0_0_30px_rgba(228,64,95,0.3)]",
    bg: "bg-[#E4405F]/10",
    desc: "Follow my tech journey & daily life",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hhk2170@gmail.com",
    color: "hover:border-primary hover:shadow-[0_0_30px_hsl(160_84%_52%/0.3)]",
    bg: "bg-primary/10",
    desc: "Drop me a message anytime",
  },
];

const Connect = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            I'm always open to new opportunities, collaborations, and conversations.
            Reach out through any platform below.
          </p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`glass rounded-xl p-6 flex items-start gap-4 border border-border/50 transition-all duration-500 group ${social.color}`}
            >
              <div className={`p-3 rounded-lg ${social.bg}`}>
                <social.icon className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{social.name}</h3>
                <p className="text-sm text-muted-foreground">{social.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-xl p-8 border border-border/50 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Download My Resume</h2>
          <p className="text-muted-foreground mb-6">
            Get a detailed overview of my experience, skills, and projects.
          </p>
          <a
            href="/Hasnain_Haidar_Resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-box"
          >
            <Download className="w-5 h-5" />
            Download Resume (PDF)
          </a>
        </motion.div>

        {/* Follow LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hasnainhaidar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A66C2] text-white font-medium hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Follow on LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Connect;
