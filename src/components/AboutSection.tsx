import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Code2, Bug, Cloud, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t, speechLang } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakIntroduction = useCallback(() => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = t("intro.text");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLang;
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [t, speechLang, isSpeaking]);

  const highlights = [
    { icon: Code2, title: t("about.card1.title"), desc: t("about.card1.desc") },
    { icon: Bug, title: t("about.card2.title"), desc: t("about.card2.desc") },
    { icon: Cloud, title: t("about.card3.title"), desc: t("about.card3.desc") },
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">{t("about.label")}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("about.heading1")}<span className="text-gradient">{t("about.heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-6">
            {t("about.desc")}
          </p>
          <button
            onClick={speakIntroduction}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm border border-primary/20"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 animate-pulse" />
                {t("intro.btnStop")}
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                {t("intro.btn")}
              </>
            )}
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-8 hover:glow-box transition-shadow duration-500 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;