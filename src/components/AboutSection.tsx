import { motion } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, title: "Clean Code", desc: "Writing maintainable, scalable code with modern best practices." },
  { icon: Palette, title: "UI/UX Focus", desc: "Creating intuitive interfaces with pixel-perfect attention to detail." },
  { icon: Zap, title: "Performance", desc: "Optimizing for speed, accessibility, and seamless user experience." },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Crafting digital <span className="text-gradient">experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            I'm a web developer with a passion for building beautiful, functional applications. 
            I specialize in React, TypeScript, and modern frontend technologies, 
            bringing designs to life with clean, efficient code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
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
