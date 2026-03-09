import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

const ProjectCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const refCallback = useCallback(
    (_node: HTMLDivElement | null) => {
      if (emblaApi) {
        emblaApi.on("select", onSelect);
      }
    },
    [emblaApi, onSelect]
  );

  return (
    <div className="relative h-40" ref={refCallback}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 h-full">
              <img
                src={img}
                alt={`${title} - ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 backdrop-blur text-foreground hover:text-primary transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 backdrop-blur text-foreground hover:text-primary transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${idx === selectedIndex ? "bg-primary" : "bg-foreground/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectsSection = () => {
  const { t } = useLanguage();

  const defaultProjects = [
    {
      title: t("projects.p1.title"),
      desc: t("projects.p1.desc"),
      tags: ["Java", "Spring Boot", "Microservices", "REST API"],
      github: "https://github.com/hasnainhkhan/Microservices",
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=600&h=400&fit=crop",
      ],
    },
    {
      title: t("projects.p2.title"),
      desc: t("projects.p2.desc"),
      tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
      github: "https://github.com/hasnainhkhan/SpringBootBackend",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      ],
    },
    {
      title: t("projects.p3.title"),
      desc: t("projects.p3.desc"),
      tags: ["Java", "AWS", "DynamoDB", "PostgreSQL"],
      github: "#",
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
      ],
    },
    {
      title: t("projects.p4.title"),
      desc: t("projects.p4.desc"),
      tags: ["JavaScript", "HTML", "CSS", "Web Dev"],
      github: "https://github.com/hasnainhkhan/Java_Script",
      images: [
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=600&h=400&fit=crop",
      ],
    },
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest uppercase mb-3">{t("projects.label")}</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            {t("projects.heading1")}<span className="text-gradient">{t("projects.heading2")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass rounded-xl overflow-hidden hover:glow-box transition-shadow duration-500 group"
            >
              <div className="relative">
                <ProjectCarousel images={project.images} title={project.title} />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500 pointer-events-none" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/80 backdrop-blur text-foreground hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.desc}</p>
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