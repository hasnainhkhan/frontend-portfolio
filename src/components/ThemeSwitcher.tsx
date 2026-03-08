import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    name: "Ocean",
    preview: "#599692",
    vars: {
      "--background": "222 44% 12%",
      "--foreground": "213 24% 90%",
      "--card": "222 40% 15%",
      "--card-foreground": "213 24% 90%",
      "--popover": "222 40% 15%",
      "--popover-foreground": "213 24% 90%",
      "--primary": "175 26% 47%",
      "--primary-foreground": "222 44% 12%",
      "--secondary": "222 36% 18%",
      "--secondary-foreground": "213 24% 80%",
      "--muted": "222 30% 16%",
      "--muted-foreground": "216 12% 44%",
      "--accent": "175 26% 47%",
      "--accent-foreground": "222 44% 12%",
      "--border": "222 25% 22%",
      "--input": "222 25% 22%",
      "--ring": "175 26% 47%",
      "--glow-primary": "0 0 30px hsl(175 26% 47% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(175 26% 47% / 0.25)",
    },
    gradient: "linear-gradient(135deg, hsl(175 26% 47%), hsl(190 30% 55%))",
  },
  {
    name: "Ember",
    preview: "#e67e22",
    vars: {
      "--background": "20 30% 8%",
      "--foreground": "30 20% 90%",
      "--card": "20 28% 12%",
      "--card-foreground": "30 20% 90%",
      "--popover": "20 28% 12%",
      "--popover-foreground": "30 20% 90%",
      "--primary": "30 80% 52%",
      "--primary-foreground": "20 30% 8%",
      "--secondary": "20 24% 16%",
      "--secondary-foreground": "30 20% 80%",
      "--muted": "20 20% 14%",
      "--muted-foreground": "20 12% 48%",
      "--accent": "30 80% 52%",
      "--accent-foreground": "20 30% 8%",
      "--border": "20 20% 20%",
      "--input": "20 20% 20%",
      "--ring": "30 80% 52%",
      "--glow-primary": "0 0 30px hsl(30 80% 52% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(30 80% 52% / 0.25)",
    },
    gradient: "linear-gradient(135deg, hsl(30 80% 52%), hsl(15 70% 55%))",
  },
  {
    name: "Violet",
    preview: "#8b5cf6",
    vars: {
      "--background": "260 30% 8%",
      "--foreground": "260 15% 92%",
      "--card": "260 28% 12%",
      "--card-foreground": "260 15% 92%",
      "--popover": "260 28% 12%",
      "--popover-foreground": "260 15% 92%",
      "--primary": "263 70% 66%",
      "--primary-foreground": "260 30% 8%",
      "--secondary": "260 24% 16%",
      "--secondary-foreground": "260 15% 80%",
      "--muted": "260 20% 14%",
      "--muted-foreground": "260 10% 48%",
      "--accent": "263 70% 66%",
      "--accent-foreground": "260 30% 8%",
      "--border": "260 20% 20%",
      "--input": "260 20% 20%",
      "--ring": "263 70% 66%",
      "--glow-primary": "0 0 30px hsl(263 70% 66% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(263 70% 66% / 0.25)",
    },
    gradient: "linear-gradient(135deg, hsl(263 70% 66%), hsl(280 60% 70%))",
  },
  {
    name: "Rose",
    preview: "#f43f5e",
    vars: {
      "--background": "345 25% 8%",
      "--foreground": "345 15% 92%",
      "--card": "345 22% 12%",
      "--card-foreground": "345 15% 92%",
      "--popover": "345 22% 12%",
      "--popover-foreground": "345 15% 92%",
      "--primary": "350 85% 60%",
      "--primary-foreground": "345 25% 8%",
      "--secondary": "345 20% 16%",
      "--secondary-foreground": "345 15% 80%",
      "--muted": "345 18% 14%",
      "--muted-foreground": "345 10% 48%",
      "--accent": "350 85% 60%",
      "--accent-foreground": "345 25% 8%",
      "--border": "345 18% 20%",
      "--input": "345 18% 20%",
      "--ring": "350 85% 60%",
      "--glow-primary": "0 0 30px hsl(350 85% 60% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(350 85% 60% / 0.25)",
    },
    gradient: "linear-gradient(135deg, hsl(350 85% 60%), hsl(330 70% 60%))",
  },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "Ocean";
  });

  const applyTheme = (themeName: string) => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    // Update gradient for .text-gradient
    const style = document.getElementById("theme-gradient-style") || document.createElement("style");
    style.id = "theme-gradient-style";
    style.textContent = `.text-gradient { background-image: ${theme.gradient} !important; }`;
    document.head.appendChild(style);
  };

  useEffect(() => {
    applyTheme(active);
  }, []);

  const handleSelect = (name: string) => {
    setActive(name);
    localStorage.setItem("portfolio-theme", name);
    applyTheme(name);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 glass rounded-xl p-3 space-y-2 min-w-[140px]"
          >
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleSelect(theme.name)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === theme.name
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 border border-border"
                  style={{ backgroundColor: theme.preview }}
                />
                {theme.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full glass border border-border/50 text-muted-foreground hover:text-primary transition-colors shadow-lg"
        aria-label="Change theme"
      >
        <Palette className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
