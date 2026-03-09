import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Plus, Trash2, FileText, Briefcase, GraduationCap, Code, Award, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

const ResumeBuilder = () => {
  const { t } = useLanguage();
  
  // Pre-filled with Hasnain's data
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Hasnain Haidar',
    title: 'Backend Developer',
    email: 'hhk2170@gmail.com',
    phone: '+91-XXXXXXXXXX',
    location: 'Lucknow, India',
    linkedin: 'linkedin.com/in/hasnainhkhan',
    github: 'github.com/hasnainhkhan',
    summary: 'Computer Science graduate and aspiring Backend Developer with hands-on experience in Java, Spring Boot, REST APIs, and databases like MySQL and PostgreSQL. Strong debugging skills and experience with AWS Lambda and DynamoDB integration.',
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Backend Developer Intern',
      company: 'PearlThoughts',
      duration: '2024',
      description: 'Built custom session modules using AWS DynamoDB, debugged production APIs, resolved CORS issues, implemented appointment & leave workflows, integrated WhatsApp notifications.',
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      degree: 'B.Tech in Computer Science',
      institution: 'University Name',
      year: '2025',
    },
  ]);

  const [skills] = useState([
    'Java', 'Spring Boot', 'REST APIs', 'MySQL', 'PostgreSQL',
    'AWS Lambda', 'DynamoDB', 'Git', 'Docker', 'JavaScript'
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Microservices Architecture',
      description: 'RESTful Microservices demonstrating scalable service-oriented architecture patterns.',
      technologies: 'Java, Spring Boot, REST APIs',
    },
    {
      id: '2',
      name: 'Schedula Backend',
      description: 'Production backend system with custom session module, appointment workflows, and notifications.',
      technologies: 'Java, AWS DynamoDB, Spring Boot',
    },
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'Java Programming',
      issuer: 'Online Platform',
      year: '2024',
    },
  ]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addExperience = () => {
    setExperiences([...experiences, { id: generateId(), title: '', company: '', duration: '', description: '' }]);
  };

  const addEducation = () => {
    setEducation([...education, { id: generateId(), degree: '', institution: '', year: '' }]);
  };

  const addProject = () => {
    setProjects([...projects, { id: generateId(), name: '', description: '', technologies: '' }]);
  };

  const addCertification = () => {
    setCertifications([...certifications, { id: generateId(), name: '', issuer: '', year: '' }]);
  };

  const downloadResume = () => {
    // Generate resume HTML
    const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${personalInfo.name} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
    .name { font-size: 32px; font-weight: bold; color: #1e40af; }
    .title { font-size: 18px; color: #64748b; margin: 5px 0; }
    .contact { font-size: 14px; color: #64748b; }
    .contact a { color: #2563eb; text-decoration: none; }
    .section { margin: 25px 0; }
    .section-title { font-size: 18px; font-weight: bold; color: #1e40af; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; }
    .item { margin-bottom: 15px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; }
    .item-title { font-weight: bold; color: #1e3a8a; }
    .item-subtitle { color: #64748b; font-size: 14px; }
    .item-duration { color: #64748b; font-size: 14px; }
    .item-desc { margin-top: 5px; font-size: 14px; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: #eff6ff; color: #1e40af; padding: 4px 12px; border-radius: 15px; font-size: 13px; }
    .summary { font-size: 14px; color: #475569; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${personalInfo.name}</div>
    <div class="title">${personalInfo.title}</div>
    <div class="contact">
      ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}<br>
      <a href="https://${personalInfo.linkedin}">${personalInfo.linkedin}</a> | 
      <a href="https://${personalInfo.github}">${personalInfo.github}</a>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary">${personalInfo.summary}</p>
  </div>

  <div class="section">
    <div class="section-title">Experience</div>
    ${experiences.map(exp => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${exp.title}</span>
          <span class="item-duration">${exp.duration}</span>
        </div>
        <div class="item-subtitle">${exp.company}</div>
        <p class="item-desc">${exp.description}</p>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Education</div>
    ${education.map(edu => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${edu.degree}</span>
          <span class="item-duration">${edu.year}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Projects</div>
    ${projects.map(proj => `
      <div class="item">
        <div class="item-title">${proj.name}</div>
        <p class="item-desc">${proj.description}</p>
        <div class="item-subtitle">Technologies: ${proj.technologies}</div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <div class="section-title">Skills</div>
    <div class="skills">
      ${skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Certifications</div>
    ${certifications.map(cert => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${cert.name}</span>
          <span class="item-duration">${cert.year}</span>
        </div>
        <div class="item-subtitle">${cert.issuer}</div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">{t('connect.backToPortfolio')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">Resume Builder</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-sm font-mono text-primary tracking-widest uppercase">Resume Builder</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">
              <span className="text-foreground">Build Your </span>
              <span className="text-primary">Professional Resume</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Pre-filled with your information. Edit, customize, and download your resume.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="space-y-6">
              {/* Personal Info */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Personal Information</h3>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    />
                    <Input
                      placeholder="Job Title"
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="LinkedIn URL"
                      value={personalInfo.linkedin}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    />
                    <Input
                      placeholder="GitHub URL"
                      value={personalInfo.github}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Professional Summary"
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
                    rows={4}
                  />
                </div>
              </Card>

              {/* Experience */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Experience</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={addExperience}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {experiences.map((exp, i) => (
                    <div key={exp.id} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Experience {i + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => setExperiences(experiences.map(ex => ex.id === exp.id ? { ...ex, title: e.target.value } : ex))}
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => setExperiences(experiences.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex))}
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g., 2023 - Present)"
                        value={exp.duration}
                        onChange={(e) => setExperiences(experiences.map(ex => ex.id === exp.id ? { ...ex, duration: e.target.value } : ex))}
                      />
                      <Textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => setExperiences(experiences.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex))}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Education */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Education</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={edu.id} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Education {i + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => setEducation(education.filter(e => e.id !== edu.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed))}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed))}
                        />
                        <Input
                          placeholder="Year"
                          value={edu.year}
                          onChange={(e) => setEducation(education.map(ed => ed.id === edu.id ? { ...ed, year: e.target.value } : ed))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Projects */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Projects</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={addProject}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {projects.map((proj, i) => (
                    <div key={proj.id} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Project {i + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => setProjects(projects.filter(p => p.id !== proj.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Project Name"
                        value={proj.name}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p))}
                      />
                      <Textarea
                        placeholder="Description"
                        value={proj.description}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p))}
                        rows={2}
                      />
                      <Input
                        placeholder="Technologies"
                        value={proj.technologies}
                        onChange={(e) => setProjects(projects.map(p => p.id === proj.id ? { ...p, technologies: e.target.value } : p))}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Certifications</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={addCertification}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <div key={cert.id} className="p-4 bg-secondary/30 rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Certification {i + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => setCertifications(certifications.filter(c => c.id !== cert.id))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Certification Name"
                        value={cert.name}
                        onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c))}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Issuer"
                          value={cert.issuer}
                          onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c))}
                        />
                        <Input
                          placeholder="Year"
                          value={cert.year}
                          onChange={(e) => setCertifications(certifications.map(c => c.id === cert.id ? { ...c, year: e.target.value } : c))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Live Preview</h3>
                  <Button onClick={downloadResume} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
                
                {/* Resume Preview */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-inner max-h-[70vh] overflow-y-auto text-sm">
                  {/* Header */}
                  <div className="text-center border-b-2 border-blue-600 pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-blue-800">{personalInfo.name}</h1>
                    <p className="text-gray-600">{personalInfo.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="mb-4">
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Professional Summary</h2>
                    <p className="text-xs text-gray-600">{personalInfo.summary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Experience</h2>
                    {experiences.map(exp => (
                      <div key={exp.id} className="mb-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-blue-900">{exp.title}</span>
                          <span className="text-xs text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div className="mb-4">
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Education</h2>
                    {education.map(edu => (
                      <div key={edu.id} className="mb-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-blue-900">{edu.degree}</span>
                          <span className="text-xs text-gray-500">{edu.year}</span>
                        </div>
                        <p className="text-xs text-gray-600">{edu.institution}</p>
                      </div>
                    ))}
                  </div>

                  {/* Projects */}
                  <div className="mb-4">
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Projects</h2>
                    {projects.map(proj => (
                      <div key={proj.id} className="mb-2">
                        <span className="font-semibold text-blue-900">{proj.name}</span>
                        <p className="text-xs text-gray-600">{proj.description}</p>
                        <p className="text-xs text-gray-500">Tech: {proj.technologies}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                      {skills.map(skill => (
                        <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h2 className="font-bold text-blue-800 border-b border-gray-200 pb-1 mb-2">Certifications</h2>
                    {certifications.map(cert => (
                      <div key={cert.id} className="mb-1">
                        <div className="flex justify-between">
                          <span className="font-semibold text-blue-900 text-xs">{cert.name}</span>
                          <span className="text-xs text-gray-500">{cert.year}</span>
                        </div>
                        <p className="text-xs text-gray-600">{cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
