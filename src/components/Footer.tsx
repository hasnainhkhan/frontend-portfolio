import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hasnain Haidar — {t("footer.text")}
        </p>
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: "https://github.com/hasnainhkhan", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/hasnainhaidar/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:hhk2170@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
