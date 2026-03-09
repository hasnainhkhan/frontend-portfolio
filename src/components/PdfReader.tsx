import { useState, useRef, useCallback } from 'react';
import { FileText, Upload, Play, Square, Globe, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage, Language, languageLabels } from '@/contexts/LanguageContext';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const speechLangMap: Record<Language, string> = {
  en: "en-US",
  ur: "ur-PK",
  ar: "ar-SA",
  hi: "hi-IN",
};

const PdfReader = () => {
  const { t, language } = useLanguage();
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readLang, setReadLang] = useState<Language>(language);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const extractText = useCallback(async (file: File) => {
    setIsExtracting(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n--- ${t('pdf.page')} ${i} ---\n${pageText}`;
      }

      setPdfText(fullText.trim());
      setFileName(file.name);
      toast.success(`${t('pdf.extracted')} (${pdf.numPages} ${t('pdf.pages')})`);
    } catch (err) {
      console.error('PDF extraction error:', err);
      toast.error(t('pdf.error'));
    } finally {
      setIsExtracting(false);
    }
  }, [t]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      extractText(file);
    } else {
      toast.error(t('pdf.invalidFile'));
    }
    e.target.value = '';
  };

  const startReading = () => {
    if (!pdfText || !('speechSynthesis' in window)) {
      toast.error(t('a11y.notSupported'));
      return;
    }

    window.speechSynthesis.cancel();

    // Split into chunks (speech API has limits)
    const chunks = pdfText.match(/[\s\S]{1,500}/g) || [];
    let chunkIndex = 0;

    const speakNext = () => {
      if (chunkIndex >= chunks.length) {
        setIsReading(false);
        setCurrentPage(0);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      utterance.lang = speechLangMap[readLang];
      utterance.rate = 0.9;
      utterance.pitch = 1;

      // Estimate current page from text position
      const textSoFar = chunks.slice(0, chunkIndex + 1).join('');
      const pageMatches = textSoFar.match(/--- .+? \d+ ---/g);
      if (pageMatches) setCurrentPage(pageMatches.length);

      utterance.onend = () => {
        chunkIndex++;
        speakNext();
      };
      utterance.onerror = () => {
        setIsReading(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    setIsReading(true);
    speakNext();
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setCurrentPage(0);
  };

  const clearPdf = () => {
    stopReading();
    setPdfText('');
    setFileName('');
    setPageCount(0);
  };

  const languages: Language[] = ['en', 'ur', 'ar', 'hi'];
  const langNames: Record<Language, string> = {
    en: 'English',
    ur: 'اردو (Urdu)',
    ar: 'عربي (Arabic)',
    hi: 'हिंदी (Hindi)',
  };

  return (
    <section id="pdf-reader" className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            {t('pdf.label')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-foreground">{t('pdf.heading1')}</span>
            <span className="text-primary">{t('pdf.heading2')}</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            {t('pdf.desc')}
          </p>
        </div>

        <Card className="glass glow-box p-6 md:p-8">
          {!pdfText ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {isExtracting ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <p className="text-muted-foreground">{t('pdf.extracting')}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="h-12 w-12 text-primary" />
                  <p className="text-foreground font-semibold">{t('pdf.upload')}</p>
                  <p className="text-muted-foreground text-sm">{t('pdf.uploadHint')}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* File info header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">{fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {pageCount} {t('pdf.pages')} {isReading && currentPage > 0 && `• ${t('pdf.reading')} ${currentPage}/${pageCount}`}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={clearPdf} className="text-muted-foreground hover:text-destructive">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Language selector */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowLangPicker(!showLangPicker)}
                  className="gap-2"
                  disabled={isReading}
                >
                  <Globe className="h-4 w-4" />
                  {t('pdf.listenIn')}: {langNames[readLang]}
                </Button>
                {showLangPicker && (
                  <div className="absolute top-full mt-2 left-0 z-10 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[200px]">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setReadLang(lang);
                          setShowLangPicker(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                          readLang === lang
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary text-foreground'
                        }`}
                      >
                        {langNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text preview */}
              <div className="bg-secondary/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {pdfText.slice(0, 2000)}{pdfText.length > 2000 ? '...' : ''}
                </pre>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {!isReading ? (
                  <Button onClick={startReading} className="gap-2">
                    <Play className="h-4 w-4" />
                    {t('pdf.play')}
                  </Button>
                ) : (
                  <Button onClick={stopReading} variant="destructive" className="gap-2">
                    <Square className="h-4 w-4" />
                    {t('pdf.stop')}
                  </Button>
                )}
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  {t('pdf.uploadAnother')}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default PdfReader;
