// Japanese Text-to-Speech utility using Web Speech API

let japaneseVoice: SpeechSynthesisVoice | null = null;

// Load Japanese voice when available
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  japaneseVoice = voices.find(v => v.lang.includes('ja')) || null;
}

// Load voices on init
if (typeof window !== 'undefined') {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

export function speakJapanese(text: string, reading?: string): void {
  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Use reading (hiragana) if available for better pronunciation
  const textToSpeak = reading || text;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.85;
  utterance.pitch = 1;

  if (japaneseVoice) {
    utterance.voice = japaneseVoice;
  }

  speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  speechSynthesis.cancel();
}
