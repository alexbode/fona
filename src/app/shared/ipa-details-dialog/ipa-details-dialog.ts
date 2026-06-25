import { Component, OnInit, OnDestroy, inject, signal, model, input, output, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideVolume2, lucideX, lucideBookOpen } from '@ng-icons/lucide';
import { ButtonDirective } from '@app/directive/button';

export interface ExampleWord {
  word: string;
  language: string;
  accent: string;
}

export interface IpaItem {
  ipaSymbol: string;
  ipaNumber: number;
  vowelOrConsonant: 'vowel' | 'consonant';
  placeOfArticulation: string | null;
  mannerOfArticulation: string | null;
  voicing: string;
  vowelHeight: string | null;
  vowelBackness: string | null;
  howToArticulate: string;
  soundUrl: string;
  exampleWords: ExampleWord[];
}

@Component({
  selector: 'app-ipa-details-dialog',
  standalone: true,
  imports: [
    NgIcon,
    HlmIcon,
    ButtonDirective,
  ],
  providers: [
    provideIcons({
      lucideVolume2,
      lucideX,
      lucideBookOpen,
    }),
  ],
  templateUrl: './ipa-details-dialog.html',
})
export class IpaDetailsDialog implements OnInit, OnDestroy {
  // Two-way bound signal for the selected symbol. If null, the dialog is hidden.
  readonly ipaSymbol = model<string | null>(null);

  // Optional word context tokens to display in the navigator
  readonly wordTokens = input<{ char: string; isClickable: boolean }[] | null>(null);

  // Emit on close
  readonly close = output<void>();

  // Full list of loaded items
  readonly allIpaItems = signal<IpaItem[]>([]);

  // Audio playback state
  readonly playingIpaSoundUrl = signal<string | null>(null);
  private currentIpaAudio: HTMLAudioElement | null = null;

  // Selected details computed based on current ipaSymbol()
  readonly selectedIpaItem = computed(() => {
    const symbol = this.ipaSymbol();
    if (!symbol) return null;
    return this.allIpaItems().find((item) => item.ipaSymbol === symbol) || null;
  });

  async ngOnInit() {
    try {
      const response = await fetch('/ipa.json');
      if (response.ok) {
        const data = (await response.json()) as IpaItem[];
        this.allIpaItems.set(data);
      }
    } catch (err) {
      console.error('Failed to load IPA data in IpaDetailsDialog', err);
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  selectIpaToken(char: string) {
    this.ipaSymbol.set(char);
    // Automatically play the sound of the selected token if it has one
    const item = this.allIpaItems().find((i) => i.ipaSymbol === char);
    if (item && item.soundUrl) {
      this.playIpaSound(item.soundUrl);
    }
  }

  closeIpaDetails() {
    this.stopAudio();
    this.ipaSymbol.set(null);
    this.close.emit();
  }

  playIpaSound(url: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!url) return;

    this.stopAudio();

    this.playingIpaSoundUrl.set(url);
    const audio = new Audio(url);
    this.currentIpaAudio = audio;

    audio
      .play()
      .then(() => {
        audio.onended = () => {
          if (this.currentIpaAudio === audio) {
            this.playingIpaSoundUrl.set(null);
          }
        };
      })
      .catch((err) => {
        console.error('Failed to play sound', err);
        if (this.currentIpaAudio === audio) {
          this.playingIpaSoundUrl.set(null);
        }
      });
  }

  private stopAudio() {
    if (this.currentIpaAudio) {
      this.currentIpaAudio.pause();
      this.currentIpaAudio = null;
    }
    this.playingIpaSoundUrl.set(null);
  }
}
