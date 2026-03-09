import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Mail, ArrowLeft, Briefcase, Heart, Megaphone, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const templates = [
  { id: "job-application", label: "Job Application", icon: Briefcase, subject: "Application for [Position] – [Your Name]", body: `Dear [Hiring Manager],\n\nI am writing to express my interest in the [Position] role at [Company]. With my background in [Your Skills/Experience], I am confident I can contribute effectively to your team.\n\nI have [X years] of experience in [relevant field], and my key accomplishments include:\n• [Achievement 1]\n• [Achievement 2]\n• [Achievement 3]\n\nI would welcome the opportunity to discuss how my skills align with your needs. Please find my resume attached.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]\n[Your Phone]\n[Your Email]` },
  { id: "thank-you", label: "Thank You", icon: Heart, subject: "Thank You – [Context]", body: `Dear [Name],\n\nThank you so much for [reason]. I truly appreciate your [time/help/support/generosity].\n\n[Add a personal note about why it mattered to you.]\n\nI look forward to [next step or staying in touch].\n\nWarm regards,\n[Your Name]` },
  { id: "follow-up", label: "Follow Up", icon: Send, subject: "Following Up – [Original Subject]", body: `Dear [Name],\n\nI hope this message finds you well. I wanted to follow up on [topic/previous conversation/application] from [date].\n\n[Briefly restate context or your ask.]\n\nI would appreciate any update at your convenience. Please let me know if there is anything else you need from my end.\n\nThank you for your time.\n\nBest regards,\n[Your Name]` },
  { id: "cover-letter", label: "Cover Letter", icon: FileText, subject: "Cover Letter – [Position] at [Company]", body: `Dear [Hiring Manager],\n\nI am excited to apply for the [Position] at [Company]. Your company's commitment to [something specific about the company] resonates deeply with my professional values.\n\nIn my current role as [Your Role] at [Current Company], I have:\n• [Key accomplishment with metrics]\n• [Relevant project or initiative]\n• [Skill demonstration]\n\nI am particularly drawn to this opportunity because [specific reason related to the role/company].\n\nI would love to discuss how I can contribute to [Company]'s continued success.\n\nSincerely,\n[Your Name]` },
  { id: "newsletter", label: "Newsletter", icon: Megaphone, subject: "[Newsletter Name] – [Month/Topic]", body: `Hi [First Name],\n\nHere's what's new this [week/month]:\n\n📌 [Headline 1]\n[Brief description]\n\n📌 [Headline 2]\n[Brief description]\n\n📌 [Headline 3]\n[Brief description]\n\n💡 Tip of the [week/month]: [Share a useful tip]\n\nThanks for reading! Hit reply if you have questions.\n\n– [Your Name / Brand]` },
];

const EmailTemplateGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState(templates[0].subject);
  const [body, setBody] = useState(templates[0].body);
  const [copied, setCopied] = useState(false);

  const selectTemplate = (t: typeof templates[0]) => {
    setSelectedTemplate(t);
    setSubject(t.subject);
    setBody(t.body);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const full = `To: ${recipientEmail}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Email Template Generator</h1>
            <p className="text-muted-foreground text-sm mt-1">Choose a template, customize, and copy</p>
          </div>
        </div>

        {/* Template selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {templates.map((t) => {
            const Icon = t.icon;
            return (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectTemplate(t)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  selectedTemplate.id === t.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Editor */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Recipient Name</label>
                <Input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Recipient Email</label>
                <Input value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Body</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={16}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>
            <Button onClick={copyToClipboard} className="w-full gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Email Template"}
            </Button>
          </motion.div>

          {/* Preview */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Email Preview</span>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">To:</span> <span className="text-foreground">{recipientEmail || "recipient@example.com"}</span></div>
                <div><span className="text-muted-foreground">Subject:</span> <span className="font-medium text-foreground">{subject}</span></div>
                <div className="border-t border-border pt-4">
                  <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">{body}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateGenerator;
