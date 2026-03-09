import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-primary tracking-widest uppercase mb-6"
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">Hasnain Haidar</span>
          <br />
          <span className="text-foreground text-3xl md:text-5xl lg:text-6xl">{t("hero.role")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a href="#projects" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-box">
            {t("hero.viewProjects")}
          </a>
          <a href="#contact" className="px-8 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors">
            {t("hero.getInTouch")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/hasnainhkhan", label: "GitHub" },
            { icon: Mail, href: "mailto:hhk2170@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
          <a
            href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=hasnainhaidar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            {t("hero.followLinkedIn")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
