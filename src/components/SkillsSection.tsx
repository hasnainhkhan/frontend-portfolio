import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    { title: t("skills.cat1"), skills: ["Java", "Spring Boot", "Python", "Django", "JavaScript", "HTML/CSS"] },
    { title: t("skills.cat2"), skills: ["Basic Knowledge of AWS", "PostgreSQL", "DynamoDB", "MySQL", "REST APIs", "Microservices"] },
    { title: t("skills.cat3"), skills: ["Git", "GitHub", "Docker", "Render", "VS Code", "Postman"] }];


  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16">

          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">{t("skills.label")}</p>
          <h2 className="text-3xl font-bold md:text-4xl">
            {t("skills.heading1")}<span className="text-gradient">{t("skills.heading2")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-xl p-8">

              <h3 className="text-lg font-semibold mb-6 text-primary">{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill) =>
                  <span
                    key={skill}
                    className="font-mono text-sm px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default">

                    {skill}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default SkillsSection;