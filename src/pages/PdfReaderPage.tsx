import { useState, useRef, useCallback } from 'react';
import { FileText, Upload, Play, Square, Globe, X, Loader2, Languages, ArrowLeft, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const speechLangMap: Record<Language, string> = {
  en: "en-US",
  ur: "ur-PK",
  ar: "ar-SA",
  hi: "hi-IN",
};

const translateLangMap: Record<Language, string> = {
  en: "en",
  ur: "ur",
  ar: "ar",
  hi: "hi",
};

const PdfReaderPage = () => {
  const { t, language } = useLanguage();
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readLang, setReadLang] = useState<Language>('en');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const languages: Language[] = ['en', 'ur', 'ar', 'hi'];
  const langNames: Record<Language, string> = {
    en: 'English',
    ur: 'اردو (Urdu)',
    ar: 'عربي (Arabic)',
    hi: 'हिंदी (Hindi)',
  };

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
        fullText += `\n--- Page ${i} ---\n${pageText}`;
      }

      setOriginalText(fullText.trim());
      setTranslatedText('');
      setFileName(file.name);
      setReadLang('en'); // Reset to English since it's original
      toast.success(`Text extracted (${pdf.numPages} pages)`);
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

  // Translate text using MyMemory Translation API (free)
  const translateText = useCallback(async (text: string, targetLang: Language) => {
    if (targetLang === 'en') {
      setTranslatedText('');
      return;
    }

    setIsTranslating(true);
    try {
      // Split text into chunks for translation (API has limits)
      const chunks = text.match(/[\s\S]{1,500}/g) || [];
      let translated = '';

      for (const chunk of chunks) {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${translateLangMap[targetLang]}`
        );
        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
          translated += data.responseData.translatedText + ' ';
        } else {
          translated += chunk + ' ';
        }
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setTranslatedText(translated.trim());
      toast.success(`Translated to ${langNames[targetLang]}`);
    } catch (err) {
      console.error('Translation error:', err);
      toast.error('Translation failed. Reading in original language.');
      setTranslatedText('');
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const handleLanguageChange = async (lang: Language) => {
    setReadLang(lang);
    setShowLangPicker(false);
    
    if (originalText && lang !== 'en') {
      await translateText(originalText, lang);
    } else {
      setTranslatedText('');
    }
  };

  const startReading = () => {
    const textToRead = translatedText || originalText;
    if (!textToRead || !('speechSynthesis' in window)) {
      toast.error(t('a11y.notSupported'));
      return;
    }

    window.speechSynthesis.cancel();

    // Split into chunks (speech API has limits)
    const chunks = textToRead.match(/[\s\S]{1,500}/g) || [];
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
    setOriginalText('');
    setTranslatedText('');
    setFileName('');
    setPageCount(0);
  };

  const displayText = translatedText || originalText;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">{t('connect.backToPortfolio')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">PDF Reader</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="text-sm font-mono text-primary tracking-widest uppercase">
              {t('pdf.label')}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-foreground">{t('pdf.heading1')}</span>
              <span className="text-primary">{t('pdf.heading2')}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              {t('pdf.desc')}
            </p>
            <p className="text-primary/80 mt-2 text-sm flex items-center justify-center gap-2">
              <Languages className="h-4 w-4" />
              Upload English PDF → Listen in Hindi, Urdu, or Arabic with auto-translation!
            </p>
          </div>

          {/* PDF Reader Card */}
          <Card className="glass glow-box p-6 md:p-8">
            {!originalText ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-xl p-16 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {isExtracting ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-16 w-16 text-primary animate-spin" />
                    <p className="text-muted-foreground text-lg">{t('pdf.extracting')}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="h-16 w-16 text-primary" />
                    <p className="text-foreground font-semibold text-xl">{t('pdf.upload')}</p>
                    <p className="text-muted-foreground">{t('pdf.uploadHint')}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* File info header */}
                <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">{fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        {pageCount} {t('pdf.pages')} {isReading && currentPage > 0 && `• ${t('pdf.reading')} ${currentPage}/${pageCount}`}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={clearPdf} className="text-muted-foreground hover:text-destructive">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Language selector with translation */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Select language to listen (will auto-translate if needed):
                  </p>
                  <div className="relative">
                    <Button
                      variant="outline"
                      onClick={() => setShowLangPicker(!showLangPicker)}
                      className="gap-2 w-full sm:w-auto justify-between"
                      disabled={isReading || isTranslating}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t('pdf.listenIn')}: {langNames[readLang]}
                      </div>
                      {isTranslating && <Loader2 className="h-4 w-4 animate-spin" />}
                    </Button>
                    {showLangPicker && (
                      <div className="absolute top-full mt-2 left-0 z-10 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[250px]">
                        {languages.map((lang) => (
                          <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`w-full text-left px-4 py-3 rounded-md text-sm transition-colors ${
                              readLang === lang
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-secondary text-foreground'
                            }`}
                          >
                            <span className="font-medium">{langNames[lang]}</span>
                            {lang !== 'en' && (
                              <span className="text-xs opacity-75 block mt-0.5">
                                Will translate from English
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Translation status */}
                {isTranslating && (
                  <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    <p className="text-foreground">Translating to {langNames[readLang]}...</p>
                  </div>
                )}

                {/* Text preview */}
                <div className="bg-secondary/50 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      {translatedText ? `Translated (${langNames[readLang]})` : 'Original (English)'}
                    </span>
                  </div>
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                    {displayText.slice(0, 3000)}{displayText.length > 3000 ? '...' : ''}
                  </pre>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                  {!isReading ? (
                    <Button 
                      onClick={startReading} 
                      className="gap-2"
                      disabled={isTranslating}
                      size="lg"
                    >
                      <Play className="h-5 w-5" />
                      {t('pdf.play')} ({langNames[readLang]})
                    </Button>
                  ) : (
                    <Button onClick={stopReading} variant="destructive" className="gap-2" size="lg">
                      <Square className="h-5 w-5" />
                      {t('pdf.stop')}
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} size="lg">
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

          {/* Instructions */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <p className="text-foreground font-medium">Upload PDF</p>
              <p className="text-muted-foreground text-sm">Any PDF document (English)</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <p className="text-foreground font-medium">Choose Language</p>
              <p className="text-muted-foreground text-sm">Hindi, Urdu, Arabic, or English</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <p className="text-foreground font-medium">Listen</p>
              <p className="text-muted-foreground text-sm">Auto-translated & read aloud</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfReaderPage;
