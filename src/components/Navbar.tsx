import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Volume2, FileText, Mail, UserCheck, Wrench, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.contact"), href: "#contact" },
    { label: t("nav.connect"), href: "/connect", isRoute: true, icon: UserCheck },
  ];

  const toolLinks = [
    { label: "Resume Builder", href: "/resume-builder", icon: FileText },
    { label: "Email Templates", href: "/email-templates", icon: Mail },
    { label: t("pdf.heading1") + t("pdf.heading2"), href: "/pdf-reader", icon: Volume2 },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLink = (link: { label: string; href: string; isRoute?: boolean; icon?: any }, onClick?: () => void) => {
    const Icon = typeof link.icon === 'function' ? link.icon : null;
    
    return link.isRoute ? (
      <Link
        key={link.label}
        to={link.href}
        onClick={onClick}
        className="text-sm text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {link.label}
      </Link>
    ) : (
      <a
        key={link.label}
        href={link.href}
        onClick={onClick}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {link.label}
      </a>
    );
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gradient">
          {"<HH />"}
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => renderLink(link))}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="text-sm text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              <Wrench className="h-3.5 w-3.5" />
              Tools
              <ChevronDown className={`h-3 w-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full right-0 mt-2 glass rounded-xl p-3 min-w-[200px] flex flex-col gap-2"
                >
                  {toolLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setToolsOpen(false)}
                      className="text-sm text-primary font-medium hover:text-primary/80 hover:bg-primary/5 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg"
                    >
                      <link.icon className="h-3.5 w-3.5" />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors"
          >
            {t("nav.hireMe")}
          </a>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => renderLink(link, () => setMobileOpen(false)))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
