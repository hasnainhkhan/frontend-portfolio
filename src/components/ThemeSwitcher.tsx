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
  {
    name: "Dark Developer",
    preview: "#22C55E",
    dark: {
      "--background": "222 47% 11%",
      "--foreground": "215 28% 91%",
      "--card": "222 40% 14%",
      "--card-foreground": "215 28% 91%",
      "--popover": "222 40% 14%",
      "--popover-foreground": "215 28% 91%",
      "--primary": "142 71% 45%",
      "--primary-foreground": "222 47% 11%",
      "--secondary": "222 36% 17%",
      "--secondary-foreground": "215 28% 80%",
      "--muted": "222 30% 15%",
      "--muted-foreground": "215 12% 45%",
      "--accent": "189 94% 43%",
      "--accent-foreground": "222 47% 11%",
      "--border": "222 25% 21%",
      "--input": "222 25% 21%",
      "--ring": "142 71% 45%",
      "--glow-primary": "0 0 30px hsl(142 71% 45% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(142 71% 45% / 0.25)",
    },
    light: {
      "--background": "210 30% 97%",
      "--foreground": "222 47% 11%",
      "--card": "210 25% 93%",
      "--card-foreground": "222 47% 11%",
      "--popover": "210 25% 93%",
      "--popover-foreground": "222 47% 11%",
      "--primary": "142 64% 38%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "210 20% 89%",
      "--secondary-foreground": "222 30% 30%",
      "--muted": "210 18% 91%",
      "--muted-foreground": "215 12% 48%",
      "--accent": "189 80% 36%",
      "--accent-foreground": "0 0% 100%",
      "--border": "210 15% 84%",
      "--input": "210 15% 84%",
      "--ring": "142 64% 38%",
      "--glow-primary": "0 0 30px hsl(142 64% 38% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(142 64% 38% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(142 71% 45%), hsl(189 94% 43%))",
    gradientLight: "linear-gradient(135deg, hsl(142 64% 38%), hsl(189 80% 36%))",
  },
  {
    name: "Light Minimal",
    preview: "#2563EB",
    dark: {
      "--background": "222 47% 11%",
      "--foreground": "210 40% 96%",
      "--card": "222 40% 14%",
      "--card-foreground": "210 40% 96%",
      "--popover": "222 40% 14%",
      "--popover-foreground": "210 40% 96%",
      "--primary": "221 83% 53%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "222 36% 17%",
      "--secondary-foreground": "210 30% 80%",
      "--muted": "222 30% 15%",
      "--muted-foreground": "215 16% 47%",
      "--accent": "215 16% 47%",
      "--accent-foreground": "210 40% 96%",
      "--border": "222 25% 21%",
      "--input": "222 25% 21%",
      "--ring": "221 83% 53%",
      "--glow-primary": "0 0 30px hsl(221 83% 53% / 0.15)",
      "--glow-primary-strong": "0 0 60px hsl(221 83% 53% / 0.25)",
    },
    light: {
      "--background": "0 0% 100%",
      "--foreground": "222 47% 11%",
      "--card": "220 14% 96%",
      "--card-foreground": "222 47% 11%",
      "--popover": "220 14% 96%",
      "--popover-foreground": "222 47% 11%",
      "--primary": "221 83% 53%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "220 14% 92%",
      "--secondary-foreground": "222 30% 30%",
      "--muted": "220 14% 94%",
      "--muted-foreground": "215 16% 47%",
      "--accent": "215 16% 47%",
      "--accent-foreground": "0 0% 100%",
      "--border": "220 13% 87%",
      "--input": "220 13% 87%",
      "--ring": "221 83% 53%",
      "--glow-primary": "0 0 30px hsl(221 83% 53% / 0.08)",
      "--glow-primary-strong": "0 0 60px hsl(221 83% 53% / 0.12)",
    },
    gradientDark: "linear-gradient(135deg, hsl(221 83% 53%), hsl(215 16% 57%))",
    gradientLight: "linear-gradient(135deg, hsl(221 83% 53%), hsl(215 16% 47%))",
  },
  {
    name: "Neon Cyber",
    preview: "#00F5D4",
    dark: {
      "--background": "0 0% 5%",
      "--foreground": "210 40% 96%",
      "--card": "0 0% 8%",
      "--card-foreground": "210 40% 96%",
      "--popover": "0 0% 8%",
      "--popover-foreground": "210 40% 96%",
      "--primary": "168 100% 48%",
      "--primary-foreground": "0 0% 5%",
      "--secondary": "0 0% 12%",
      "--secondary-foreground": "210 30% 80%",
      "--muted": "0 0% 10%",
      "--muted-foreground": "210 10% 45%",
      "--accent": "322 85% 65%",
      "--accent-foreground": "0 0% 5%",
      "--border": "0 0% 16%",
      "--input": "0 0% 16%",
      "--ring": "168 100% 48%",
      "--glow-primary": "0 0 30px hsl(168 100% 48% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(168 100% 48% / 0.35)",
    },
    light: {
      "--background": "168 20% 97%",
      "--foreground": "0 0% 10%",
      "--card": "168 15% 93%",
      "--card-foreground": "0 0% 10%",
      "--popover": "168 15% 93%",
      "--popover-foreground": "0 0% 10%",
      "--primary": "168 80% 35%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "168 12% 89%",
      "--secondary-foreground": "0 0% 25%",
      "--muted": "168 10% 91%",
      "--muted-foreground": "0 0% 45%",
      "--accent": "322 70% 50%",
      "--accent-foreground": "0 0% 100%",
      "--border": "168 10% 83%",
      "--input": "168 10% 83%",
      "--ring": "168 80% 35%",
      "--glow-primary": "0 0 30px hsl(168 80% 35% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(168 80% 35% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(168 100% 48%), hsl(322 85% 65%))",
    gradientLight: "linear-gradient(135deg, hsl(168 80% 35%), hsl(322 70% 50%))",
  },
  {
    name: "Purple Tech",
    preview: "#8B5CF6",
    dark: {
      "--background": "229 84% 5%",
      "--foreground": "215 28% 91%",
      "--card": "229 60% 9%",
      "--card-foreground": "215 28% 91%",
      "--popover": "229 60% 9%",
      "--popover-foreground": "215 28% 91%",
      "--primary": "263 90% 66%",
      "--primary-foreground": "229 84% 5%",
      "--secondary": "229 50% 14%",
      "--secondary-foreground": "215 28% 80%",
      "--muted": "229 40% 12%",
      "--muted-foreground": "229 15% 45%",
      "--accent": "330 81% 60%",
      "--accent-foreground": "229 84% 5%",
      "--border": "229 35% 18%",
      "--input": "229 35% 18%",
      "--ring": "263 90% 66%",
      "--glow-primary": "0 0 30px hsl(263 90% 66% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(263 90% 66% / 0.3)",
    },
    light: {
      "--background": "260 25% 97%",
      "--foreground": "229 60% 12%",
      "--card": "260 20% 93%",
      "--card-foreground": "229 60% 12%",
      "--popover": "260 20% 93%",
      "--popover-foreground": "229 60% 12%",
      "--primary": "263 75% 55%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "260 15% 89%",
      "--secondary-foreground": "229 30% 30%",
      "--muted": "260 12% 91%",
      "--muted-foreground": "229 15% 48%",
      "--accent": "330 70% 50%",
      "--accent-foreground": "0 0% 100%",
      "--border": "260 10% 84%",
      "--input": "260 10% 84%",
      "--ring": "263 75% 55%",
      "--glow-primary": "0 0 30px hsl(263 75% 55% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(263 75% 55% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(263 90% 66%), hsl(330 81% 60%))",
    gradientLight: "linear-gradient(135deg, hsl(263 75% 55%), hsl(330 70% 50%))",
  },
  {
    name: "Green Hacker",
    preview: "#16A34A",
    dark: {
      "--background": "0 0% 0%",
      "--foreground": "142 71% 45%",
      "--card": "0 0% 4%",
      "--card-foreground": "142 71% 45%",
      "--popover": "0 0% 4%",
      "--popover-foreground": "142 71% 45%",
      "--primary": "142 76% 36%",
      "--primary-foreground": "0 0% 0%",
      "--secondary": "0 0% 8%",
      "--secondary-foreground": "142 50% 55%",
      "--muted": "0 0% 6%",
      "--muted-foreground": "142 20% 30%",
      "--accent": "142 69% 58%",
      "--accent-foreground": "0 0% 0%",
      "--border": "142 30% 12%",
      "--input": "142 30% 12%",
      "--ring": "142 76% 36%",
      "--glow-primary": "0 0 30px hsl(142 76% 36% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(142 76% 36% / 0.35)",
    },
    light: {
      "--background": "140 20% 97%",
      "--foreground": "0 0% 10%",
      "--card": "140 15% 93%",
      "--card-foreground": "0 0% 10%",
      "--popover": "140 15% 93%",
      "--popover-foreground": "0 0% 10%",
      "--primary": "142 70% 32%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "140 12% 89%",
      "--secondary-foreground": "0 0% 25%",
      "--muted": "140 10% 91%",
      "--muted-foreground": "0 0% 45%",
      "--accent": "142 60% 45%",
      "--accent-foreground": "0 0% 100%",
      "--border": "140 10% 83%",
      "--input": "140 10% 83%",
      "--ring": "142 70% 32%",
      "--glow-primary": "0 0 30px hsl(142 70% 32% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(142 70% 32% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(142 76% 36%), hsl(142 69% 58%))",
    gradientLight: "linear-gradient(135deg, hsl(142 70% 32%), hsl(142 60% 45%))",
  },
  {
    name: "Ocean Blue",
    preview: "#3B82F6",
    dark: {
      "--background": "229 84% 5%",
      "--foreground": "210 40% 96%",
      "--card": "229 60% 9%",
      "--card-foreground": "210 40% 96%",
      "--popover": "229 60% 9%",
      "--popover-foreground": "210 40% 96%",
      "--primary": "217 91% 60%",
      "--primary-foreground": "229 84% 5%",
      "--secondary": "229 50% 14%",
      "--secondary-foreground": "210 30% 80%",
      "--muted": "229 40% 12%",
      "--muted-foreground": "229 15% 45%",
      "--accent": "189 94% 53%",
      "--accent-foreground": "229 84% 5%",
      "--border": "229 35% 18%",
      "--input": "229 35% 18%",
      "--ring": "217 91% 60%",
      "--glow-primary": "0 0 30px hsl(217 91% 60% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(217 91% 60% / 0.3)",
    },
    light: {
      "--background": "210 30% 97%",
      "--foreground": "229 60% 12%",
      "--card": "210 25% 93%",
      "--card-foreground": "229 60% 12%",
      "--popover": "210 25% 93%",
      "--popover-foreground": "229 60% 12%",
      "--primary": "217 80% 50%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "210 18% 89%",
      "--secondary-foreground": "229 30% 30%",
      "--muted": "210 15% 91%",
      "--muted-foreground": "229 15% 48%",
      "--accent": "189 80% 42%",
      "--accent-foreground": "0 0% 100%",
      "--border": "210 12% 84%",
      "--input": "210 12% 84%",
      "--ring": "217 80% 50%",
      "--glow-primary": "0 0 30px hsl(217 80% 50% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(217 80% 50% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(217 91% 60%), hsl(189 94% 53%))",
    gradientLight: "linear-gradient(135deg, hsl(217 80% 50%), hsl(189 80% 42%))",
  },
  {
    name: "Sunset",
    preview: "#F97316",
    dark: {
      "--background": "217 33% 17%",
      "--foreground": "210 40% 96%",
      "--card": "217 30% 13%",
      "--card-foreground": "210 40% 96%",
      "--popover": "217 30% 13%",
      "--popover-foreground": "210 40% 96%",
      "--primary": "25 95% 53%",
      "--primary-foreground": "217 33% 10%",
      "--secondary": "217 28% 20%",
      "--secondary-foreground": "210 30% 80%",
      "--muted": "217 25% 15%",
      "--muted-foreground": "217 12% 45%",
      "--accent": "351 95% 72%",
      "--accent-foreground": "217 33% 10%",
      "--border": "217 22% 24%",
      "--input": "217 22% 24%",
      "--ring": "25 95% 53%",
      "--glow-primary": "0 0 30px hsl(25 95% 53% / 0.2)",
      "--glow-primary-strong": "0 0 60px hsl(25 95% 53% / 0.3)",
    },
    light: {
      "--background": "30 30% 97%",
      "--foreground": "217 33% 15%",
      "--card": "30 25% 93%",
      "--card-foreground": "217 33% 15%",
      "--popover": "30 25% 93%",
      "--popover-foreground": "217 33% 15%",
      "--primary": "25 85% 45%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "30 18% 89%",
      "--secondary-foreground": "217 25% 30%",
      "--muted": "30 15% 91%",
      "--muted-foreground": "217 12% 48%",
      "--accent": "351 80% 58%",
      "--accent-foreground": "0 0% 100%",
      "--border": "30 12% 84%",
      "--input": "30 12% 84%",
      "--ring": "25 85% 45%",
      "--glow-primary": "0 0 30px hsl(25 85% 45% / 0.1)",
      "--glow-primary-strong": "0 0 60px hsl(25 85% 45% / 0.15)",
    },
    gradientDark: "linear-gradient(135deg, hsl(25 95% 53%), hsl(351 95% 72%))",
    gradientLight: "linear-gradient(135deg, hsl(25 85% 45%), hsl(351 80% 58%))",
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
