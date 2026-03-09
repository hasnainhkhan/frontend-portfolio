import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Volume2, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.contact"), href: "#contact" },
    { label: t("nav.connect"), href: "/connect", isRoute: true },
    { label: "Resume Builder", href: "/resume-builder", isRoute: true, icon: FileText },
    { label: t("pdf.heading1") + t("pdf.heading2"), href: "/pdf-reader", isRoute: true, icon: Volume2 },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLink = (link: typeof navLinks[0], onClick?: () => void) =>
    link.isRoute ? (
      <Link
        key={link.label}
        to={link.href}
        onClick={onClick}
        className={`text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ${
          link.icon ? 'text-primary font-medium' : ''
        }`}
      >
        {link.icon && <Volume2 className="h-3.5 w-3.5" />}
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
