import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Upload, X } from "lucide-react";

const defaultProjects = [
  {
    title: "Microservices Architecture",
    desc: "RESTful Microservices built with Java and Spring Boot, demonstrating scalable service-oriented architecture patterns.",
    tags: ["Java", "Spring Boot", "Microservices", "REST API"],
    github: "https://github.com/hasnainhkhan/Microservices",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  {
    title: "Spring Boot Backend",
    desc: "A collection of Spring Boot backend projects showcasing authentication, CRUD operations, and enterprise patterns.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    github: "https://github.com/hasnainhkhan/SpringBootBackend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
  },
  {
    title: "Schedula Backend (PearlThoughts)",
    desc: "Production backend system with custom session module using AWS DynamoDB, appointment & leave workflows, and WhatsApp notifications.",
    tags: ["Java", "AWS", "DynamoDB", "PostgreSQL"],
    github: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    title: "JavaScript Tutorials",
    desc: "Comprehensive JavaScript tutorials and projects covering core concepts, DOM manipulation, and modern ES6+ features.",
    tags: ["JavaScript", "HTML", "CSS", "Web Dev"],
    github: "https://github.com/hasnainhkhan/Java_Script",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newProjects = [...projects];
      newProjects[index] = { ...newProjects[index], image: e.target?.result as string };
      setProjects(newProjects);
    };
    reader.readAsDataURL(file);
  };

  const resetImage = (index: number) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], image: defaultProjects[index].image };
    setProjects(newProjects);
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden group hover:glow-box transition-shadow duration-500"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
                
                {/* Upload overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <input
                    ref={(el) => { fileInputRefs.current[i] = el; }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(i, file);
                    }}
                  />
                  <button
                    onClick={() => fileInputRefs.current[i]?.click()}
                    className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary transition-colors mr-2"
                    title="Upload project image"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  {project.image !== defaultProjects[i]?.image && (
                    <button
                      onClick={() => resetImage(i)}
                      className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-destructive transition-colors mr-2"
                      title="Reset to default"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
