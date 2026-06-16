import { Component, signal } from '@angular/core';
import { AppRoutesHelper } from '@app/app.routes';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, ButtonDirective, HlmButtonImports],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  appRoutesHelper = AppRoutesHelper;
  demoError = signal<boolean>(false);

  phoneticSymbols = ['/ɪ/', '/θ/', '/ɾ/', '/øː/', '/ɑː/', '/ʒ/', '/ŋ/', '/æ/', '/ɔɪ/'];

  stats = [
    { value: '12,400+', label: 'active learners' },
    { value: '6', label: 'languages' },
    { value: '18', label: 'accent packs' },
    { value: '4.9 ★', label: 'average rating' },
  ];

  howSteps = [
    {
      num: '01',
      title: 'Listen & Chorus',
      body: 'Listen to native speakers and speak along in real-time. Chorusing helps your brain map the rhythm and melody of a new language.',
    },
    {
      num: '02',
      title: 'Master Minimal Pairs',
      body: 'Train your ears and tongue to distinguish and produce subtle sound differences like "ship" and "sheep".',
    },
    {
      num: '03',
      title: 'Get Instant Feedback',
      body: 'Our visual feedback shows you exactly where your pronunciation aligns and where to adjust.',
    },
  ];

  whyCards = [
    {
      icon: '🧠',
      title: 'Neuro-linguistic approach',
      body: 'Based on speech shadowing and chorusing research to form long-term muscle memory.',
    },
    {
      icon: '🎯',
      title: 'Targeted practice',
      body: 'Focus specifically on the phonemes and sound transitions that define your accent.',
    },
    {
      icon: '⚡',
      title: 'Interactive visual feedback',
      body: "See your voice waveform side-by-side with a native speaker's reference.",
    },
    {
      icon: '🔄',
      title: 'Learn at your own pace',
      body: 'Practice anywhere, anytime, with bite-sized exercises designed for busy schedules.',
    },
  ];

  testimonials = [
    {
      name: 'Elena Rostova',
      quote:
        'Chorusing felt strange at first, but after two weeks, my colleagues noticed my rhythm was much more natural. It really works!',
      initials: 'ER',
      role: 'Software Engineer',
    },
    {
      name: 'Kenji Sato',
      quote:
        'Minimal pairs helped me finally hear the difference between L and R sounds. Fona makes it easy to practice consistently.',
      initials: 'KS',
      role: 'Product Manager',
    },
    {
      name: 'Sofia Martinez',
      quote:
        "I've tried many accent apps, but Fona's science-backed focus on muscle memory is the only thing that actually made a difference.",
      initials: 'SM',
      role: 'Marketing Lead',
    },
  ];

  playDemoSound(lang: string, text: string): void {
    if ('speechSynthesis' in window) {
      this.demoError.set(false);
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find((v) => v.lang.startsWith(lang.split('-')[0]));

      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      this.demoError.set(true);
    }
  }
}
