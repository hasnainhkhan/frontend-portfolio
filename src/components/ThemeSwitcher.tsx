import { useState, useEffect } from "react";
import { Palette, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeDef = {
  name: string;
  preview: string;
  dark: Record<string, string>;
  light: Record<string, string>;
  gradientDark: string;
  gradientLight: string;
};

const themes: ThemeDef[] = [
  {
    name: "Ocean",
    preview: "#599692",
    dark: {
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
    light: {
      "--background": "210 30% 97%",
      "--foreground": "222 44% 12%",
      "--card": "210 25% 94%",
      "--card-foreground": "222 44% 12%",
      "--popover": "210 25% 94%",
      "--popover-foreground": "222 44% 12%",
      "--primary": "175 30% 40%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "210 20% 90%",
      "--secondary-foreground": "222 30% 30%",
      "--muted": "210 18% 92%",
      "--muted-foreground": "216 12% 50%",
      "--accent": "175 30% 40%",
      "--accent-foreground": "0 0% 100%",
      "--border": "210 15% 85%",
      "--input": "210 15% 85%",
      "--ring": "175 30% 40%",
      "--glow-primary": "0 0 30px hsl(175 30% 40% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(175 30% 40% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(175 26% 47%), hsl(190 30% 55%))",
    gradientLight: "linear-gradient(135deg, hsl(175 30% 40%), hsl(190 35% 48%))",
  },
  {
    name: "Ember",
    preview: "#e67e22",
    dark: {
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
    light: {
      "--background": "35 30% 97%",
      "--foreground": "20 30% 12%",
      "--card": "35 25% 93%",
      "--card-foreground": "20 30% 12%",
      "--popover": "35 25% 93%",
      "--popover-foreground": "20 30% 12%",
      "--primary": "30 75% 45%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "35 20% 89%",
      "--secondary-foreground": "20 25% 30%",
      "--muted": "35 18% 91%",
      "--muted-foreground": "20 12% 48%",
      "--accent": "30 75% 45%",
      "--accent-foreground": "0 0% 100%",
      "--border": "35 15% 83%",
      "--input": "35 15% 83%",
      "--ring": "30 75% 45%",
      "--glow-primary": "0 0 30px hsl(30 75% 45% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(30 75% 45% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(30 80% 52%), hsl(15 70% 55%))",
    gradientLight: "linear-gradient(135deg, hsl(30 75% 45%), hsl(15 65% 50%))",
  },
  {
    name: "Violet",
    preview: "#8b5cf6",
    dark: {
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
    light: {
      "--background": "265 25% 97%",
      "--foreground": "260 30% 12%",
      "--card": "265 20% 93%",
      "--card-foreground": "260 30% 12%",
      "--popover": "265 20% 93%",
      "--popover-foreground": "260 30% 12%",
      "--primary": "263 65% 55%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "265 18% 89%",
      "--secondary-foreground": "260 20% 30%",
      "--muted": "265 15% 91%",
      "--muted-foreground": "260 10% 48%",
      "--accent": "263 65% 55%",
      "--accent-foreground": "0 0% 100%",
      "--border": "265 12% 84%",
      "--input": "265 12% 84%",
      "--ring": "263 65% 55%",
      "--glow-primary": "0 0 30px hsl(263 65% 55% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(263 65% 55% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(263 70% 66%), hsl(280 60% 70%))",
    gradientLight: "linear-gradient(135deg, hsl(263 65% 55%), hsl(280 55% 60%))",
  },
  {
    name: "Rose",
    preview: "#f43f5e",
    dark: {
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
    light: {
      "--background": "350 25% 97%",
      "--foreground": "345 25% 12%",
      "--card": "350 20% 93%",
      "--card-foreground": "345 25% 12%",
      "--popover": "350 20% 93%",
      "--popover-foreground": "345 25% 12%",
      "--primary": "350 80% 50%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "350 18% 89%",
      "--secondary-foreground": "345 20% 30%",
      "--muted": "350 15% 91%",
      "--muted-foreground": "345 10% 48%",
      "--accent": "350 80% 50%",
      "--accent-foreground": "0 0% 100%",
      "--border": "350 12% 84%",
      "--input": "350 12% 84%",
      "--ring": "350 80% 50%",
      "--glow-primary": "0 0 30px hsl(350 80% 50% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(350 80% 50% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(350 85% 60%), hsl(330 70% 60%))",
    gradientLight: "linear-gradient(135deg, hsl(350 80% 50%), hsl(330 65% 55%))",
  },
  {
    name: "Cyber",
    preview: "#00e5ff",
    dark: {
      "--background": "200 40% 6%",
      "--foreground": "195 20% 92%",
      "--card": "200 36% 10%",
      "--card-foreground": "195 20% 92%",
      "--popover": "200 36% 10%",
      "--popover-foreground": "195 20% 92%",
      "--primary": "187 100% 50%",
      "--primary-foreground": "200 40% 6%",
      "--secondary": "200 30% 14%",
      "--secondary-foreground": "195 20% 80%",
      "--muted": "200 25% 12%",
      "--muted-foreground": "200 12% 45%",
      "--accent": "187 100% 50%",
      "--accent-foreground": "200 40% 6%",
      "--border": "200 22% 18%",
      "--input": "200 22% 18%",
      "--ring": "187 100% 50%",
      "--glow-primary": "0 0 30px hsl(187 100% 50% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(187 100% 50% / 0.3)",
    },
    light: {
      "--background": "195 25% 97%",
      "--foreground": "200 40% 10%",
      "--card": "195 20% 93%",
      "--card-foreground": "200 40% 10%",
      "--popover": "195 20% 93%",
      "--popover-foreground": "200 40% 10%",
      "--primary": "187 85% 38%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "195 18% 89%",
      "--secondary-foreground": "200 30% 30%",
      "--muted": "195 15% 91%",
      "--muted-foreground": "200 12% 48%",
      "--accent": "187 85% 38%",
      "--accent-foreground": "0 0% 100%",
      "--border": "195 12% 83%",
      "--input": "195 12% 83%",
      "--ring": "187 85% 38%",
      "--glow-primary": "0 0 30px hsl(187 85% 38% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(187 85% 38% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(187 100% 50%), hsl(200 90% 60%))",
    gradientLight: "linear-gradient(135deg, hsl(187 85% 38%), hsl(200 75% 45%))",
  },
  {
    name: "Mint",
    preview: "#34d399",
    dark: {
      "--background": "150 30% 6%",
      "--foreground": "150 15% 92%",
      "--card": "150 28% 10%",
      "--card-foreground": "150 15% 92%",
      "--popover": "150 28% 10%",
      "--popover-foreground": "150 15% 92%",
      "--primary": "160 64% 52%",
      "--primary-foreground": "150 30% 6%",
      "--secondary": "150 24% 14%",
      "--secondary-foreground": "150 15% 80%",
      "--muted": "150 20% 12%",
      "--muted-foreground": "150 10% 45%",
      "--accent": "160 64% 52%",
      "--accent-foreground": "150 30% 6%",
      "--border": "150 18% 18%",
      "--input": "150 18% 18%",
      "--ring": "160 64% 52%",
      "--glow-primary": "0 0 30px hsl(160 64% 52% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(160 64% 52% / 0.25)",
    },
    light: {
      "--background": "150 25% 97%",
      "--foreground": "150 30% 10%",
      "--card": "150 20% 93%",
      "--card-foreground": "150 30% 10%",
      "--popover": "150 20% 93%",
      "--popover-foreground": "150 30% 10%",
      "--primary": "160 55% 42%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "150 18% 89%",
      "--secondary-foreground": "150 22% 28%",
      "--muted": "150 15% 91%",
      "--muted-foreground": "150 10% 48%",
      "--accent": "160 55% 42%",
      "--accent-foreground": "0 0% 100%",
      "--border": "150 12% 83%",
      "--input": "150 12% 83%",
      "--ring": "160 55% 42%",
      "--glow-primary": "0 0 30px hsl(160 55% 42% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(160 55% 42% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(160 64% 52%), hsl(140 55% 50%))",
    gradientLight: "linear-gradient(135deg, hsl(160 55% 42%), hsl(140 48% 40%))",
  },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => localStorage.getItem("portfolio-theme") || "Ocean");
  const [mode, setMode] = useState<"dark" | "light">(() => (localStorage.getItem("portfolio-mode") as "dark" | "light") || "dark");

  const applyTheme = (themeName: string, themeMode: "dark" | "light") => {
    const theme = themes.find((t) => t.name === themeName);
    if (!theme) return;
    const vars = themeMode === "dark" ? theme.dark : theme.light;
    const gradient = themeMode === "dark" ? theme.gradientDark : theme.gradientLight;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    const style = document.getElementById("theme-gradient-style") || document.createElement("style");
    style.id = "theme-gradient-style";
    style.textContent = `.text-gradient { background-image: ${gradient} !important; }`;
    document.head.appendChild(style);
  };

  useEffect(() => {
    applyTheme(active, mode);
  }, []);

  const handleSelect = (name: string) => {
    setActive(name);
    localStorage.setItem("portfolio-theme", name);
    applyTheme(name, mode);
    setOpen(false);
  };

  const toggleMode = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("portfolio-mode", next);
    applyTheme(active, next);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass rounded-xl p-3 space-y-2 min-w-[140px]"
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

      <div className="flex gap-2">
        <button
          onClick={toggleMode}
          className="p-3 rounded-full glass border border-border/50 text-muted-foreground hover:text-primary transition-colors shadow-lg"
          aria-label="Toggle light/dark mode"
        >
          {mode === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="p-3 rounded-full glass border border-border/50 text-muted-foreground hover:text-primary transition-colors shadow-lg"
          aria-label="Change theme"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
