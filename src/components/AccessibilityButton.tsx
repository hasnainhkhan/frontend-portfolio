import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AccessibilityButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Get text content from the element
      const text = target.textContent?.trim();
      
      if (text && text.length > 0 && 'speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        // Create new speech utterance
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(utterance);
      }
    };

    // Add listener to document
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    };
  }, [isEnabled]);

  const toggleAccessibility = () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech not supported in your browser');
      return;
    }

    const newState = !isEnabled;
    setIsEnabled(newState);
    
    if (newState) {
      toast.success('Accessibility mode enabled - Hover over text to listen');
    } else {
      toast.info('Accessibility mode disabled');
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
