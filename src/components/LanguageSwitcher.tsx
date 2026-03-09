import { useLanguage, Language, languageLabels } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages: Language[] = ["en", "ur", "ar", "hi"];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
    // Speak announcement
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const langNames: Record<Language, string> = {
        en: "Language changed to English",
        ur: "زبان اردو میں تبدیل ہو گئی",
        ar: "تم تغيير اللغة إلى العربية",
        hi: "भाषा हिंदी में बदल गई",
      };
      const speechLangs: Record<Language, string> = {
        en: "en-US", ur: "ur-PK", ar: "ar-SA", hi: "hi-IN",
      };
      const utterance = new SpeechSynthesisUtterance(langNames[lang]);
      utterance.lang = speechLangs[lang];
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{languageLabels[language]}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full mt-2 right-0 glass rounded-xl border border-border/50 overflow-hidden min-w-[120px] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full px-4 py-2.5 text-sm text-start hover:bg-primary/10 transition-colors ${
                  language === lang ? "text-primary font-semibold bg-primary/5" : "text-foreground"
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
