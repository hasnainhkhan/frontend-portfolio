import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const AccessibilityButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, speechLang } = useLanguage();

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.textContent?.trim();

      if (text && text.length > 0 && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = speechLang;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    };
  }, [isEnabled, speechLang]);

  const toggleAccessibility = () => {
    if (!('speechSynthesis' in window)) {
      toast.error(t('a11y.notSupported'));
      return;
    }

    const newState = !isEnabled;
    setIsEnabled(newState);

    if (newState) {
      toast.success(t('a11y.enabled'));
    } else {
      toast.info(t('a11y.disabled'));
      window.speechSynthesis.cancel();
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleAccessibility}
      className={`fixed top-20 right-4 z-50 glass glow-box transition-all ${
        isEnabled ? 'bg-primary text-primary-foreground' : ''
      } ${isSpeaking ? 'animate-pulse' : ''}`}
      aria-label={isEnabled ? 'Disable accessibility mode' : 'Enable accessibility mode'}
    >
      {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </Button>
  );
};

export default AccessibilityButton;
