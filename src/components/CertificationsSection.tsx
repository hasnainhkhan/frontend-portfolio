import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

const certifications: Certification[] = [
{
  title: "LinkedIn Learning Certificate",
  issuer: "LinkedIn Learning",
  date: "2024",
  credentialUrl: "https://www.linkedin.com/learning/certificates/1f8420ddc2b80dfc22a2d9e5ce50ae491d4c774aee3befb65a3b0f275baaf5ff"
},
{
  title: "LinkedIn Learning Certificate",
  issuer: "LinkedIn Learning",
  date: "2024",
  credentialUrl: "https://www.linkedin.com/learning/certificates/e163a0981fc2b32e648630a33840bdae2d06a534778efc833b73005fb243763b"
},
{
  title: "JavaScript (Basic)",
  issuer: "HackerRank",
  date: "2024",
  credentialUrl: "https://www.hackerrank.com/certificates/5e273a859161"
},
{
  title: "SQL (Basic)",
  issuer: "HackerRank",
  date: "2024",
  credentialUrl: "https://www.hackerrank.com/certificates/3b8ea26ad931"
}];


const CertificationsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16">
          
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">
            {t("certs.label")}
          </p>
          <h2 className="text-3xl font-bold mb-6 md:text-4xl">
            {t("certs.heading1")}<span className="text-gradient">{t("certs.heading2")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="glass rounded-xl p-8 hover:glow-box transition-shadow duration-500 group relative">
            
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
              <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
              <p className="text-muted-foreground/60 text-xs font-mono">{cert.date}</p>
              {cert.credentialUrl &&
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm hover:underline">
              
                  {t("certs.viewCredential")} <ExternalLink className="w-3.5 h-3.5" />
                </a>
            }
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default CertificationsSection;