import { Component, inject, computed, input, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideChevronLeft,
  lucideSearch,
  lucideVolume2,
  lucideX,
  lucidePlay,
  lucideBookOpen,
  lucideFilter,
} from '@ng-icons/lucide';
import { ButtonDirective } from '@app/directive/button';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { AppRoutesHelper } from '@app/app.routes';

interface ExampleWord {
  word: string;
  language: string;
  accent: string;
}

interface IpaItem {
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
  selector: 'app-ipa',
  imports: [
    NgIcon,
    HlmIcon,
    TitleCasePipe,
    HlmSkeleton,
    ButtonDirective,
    HlmBreadcrumbImports,
  ],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideSearch,
      lucideVolume2,
      lucideX,
      lucidePlay,
      lucideBookOpen,
      lucideFilter,
    }),
  ],
  templateUrl: './ipa.html',
  styleUrl: './ipa.scss',
})
export class Ipa implements OnInit {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  // Bind query parameter ':symbol' if present (via component input binding)
  readonly symbol = input<string | undefined>();

  // Full list of items loaded from ipa.json
  readonly allIpaItems = signal<IpaItem[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // Filter and Search States
  readonly selectedCategory = signal<'consonant' | 'vowel'>('consonant');
  readonly searchQuery = signal<string>('');

  // Consonant filters
  readonly consonantManner = signal<string>('all');
  readonly consonantPlace = signal<string>('all');
  readonly consonantVoicing = signal<string>('all');

  // Vowel filters
  readonly vowelHeight = signal<string>('all');
  readonly vowelBackness = signal<string>('all');

  // Audio Playback
  private currentAudio: HTMLAudioElement | null = null;
  readonly playingSoundUrl = signal<string | null>(null);

  // Unique filter values derived from data
  readonly mannersOfArticulation = computed(() => {
    const values = this.allIpaItems()
      .filter(item => item.vowelOrConsonant === 'consonant' && item.mannerOfArticulation)
      .map(item => item.mannerOfArticulation!);
    return ['all', ...Array.from(new Set(values))].sort();
  });

  readonly placesOfArticulation = computed(() => {
    const values = this.allIpaItems()
      .filter(item => item.vowelOrConsonant === 'consonant' && item.placeOfArticulation)
      .map(item => item.placeOfArticulation!);
    return ['all', ...Array.from(new Set(values))].sort();
  });

  readonly vowelHeights = computed(() => {
    const values = this.allIpaItems()
      .filter(item => item.vowelOrConsonant === 'vowel' && item.vowelHeight)
      .map(item => item.vowelHeight!);
    return ['all', ...Array.from(new Set(values))].sort();
  });

  readonly vowelBacknesses = computed(() => {
    const values = this.allIpaItems()
      .filter(item => item.vowelOrConsonant === 'vowel' && item.vowelBackness)
      .map(item => item.vowelBackness!);
    return ['all', ...Array.from(new Set(values))].sort();
  });

  // Filtered items
  readonly filteredIpaItems = computed(() => {
    const items = this.allIpaItems();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return items.filter(item => {
      // Category check
      if (item.vowelOrConsonant !== cat) return false;

      // Search match
      if (query) {
        const matchesSymbol = item.ipaSymbol.toLowerCase().includes(query);
        const matchesHow = item.howToArticulate.toLowerCase().includes(query);
        const matchesManner = item.mannerOfArticulation?.toLowerCase().includes(query) || false;
        const matchesPlace = item.placeOfArticulation?.toLowerCase().includes(query) || false;
        const matchesHeight = item.vowelHeight?.toLowerCase().includes(query) || false;
        const matchesBackness = item.vowelBackness?.toLowerCase().includes(query) || false;
        const matchesExamples = item.exampleWords.some(w =>
          w.word.toLowerCase().includes(query) ||
          w.language.toLowerCase().includes(query) ||
          w.accent.toLowerCase().includes(query)
        );
        if (!matchesSymbol && !matchesHow && !matchesManner && !matchesPlace && !matchesHeight && !matchesBackness && !matchesExamples) {
          return false;
        }
      }

      // Detailed Consonant filters
      if (cat === 'consonant') {
        if (this.consonantManner() !== 'all' && item.mannerOfArticulation !== this.consonantManner()) return false;
        if (this.consonantPlace() !== 'all' && item.placeOfArticulation !== this.consonantPlace()) return false;
        if (this.consonantVoicing() !== 'all' && item.voicing !== this.consonantVoicing()) return false;
      }

      // Detailed Vowel filters
      if (cat === 'vowel') {
        if (this.vowelHeight() !== 'all' && item.vowelHeight !== this.vowelHeight()) return false;
        if (this.vowelBackness() !== 'all' && item.vowelBackness !== this.vowelBackness()) return false;
      }

      return true;
    });
  });

  // Selected detail item based on input query param
  readonly selectedItem = computed(() => {
    const sym = this.symbol();
    if (!sym) return null;
    return this.allIpaItems().find(item => item.ipaSymbol === sym) || null;
  });

  async ngOnInit() {
    try {
      this.isLoading.set(true);
      const response = await fetch('/ipa.json');
      if (!response.ok) {
        throw new Error(`Failed to load IPA data: ${response.statusText}`);
      }
      const data = await response.json() as IpaItem[];
      this.allIpaItems.set(data);
    } catch (err: any) {
      this.error.set(err.message || 'An error occurred while loading IPA reference data.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onBack() {
    if (this.symbol()) {
      // Clear query param to return to reference list
      this.router.navigate([], { queryParams: { symbol: null } });
    } else {
      // Go back to the previous location in history
      this.location.back();
    }
  }

  selectItem(item: IpaItem) {
    this.router.navigate([], { queryParams: { symbol: item.ipaSymbol } });
  }

  playIpaSound(url: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (!url) return;

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.playingSoundUrl.set(url);
    const audio = new Audio(url);
    this.currentAudio = audio;

    audio.play()
      .then(() => {
        audio.onended = () => {
          if (this.currentAudio === audio) {
            this.playingSoundUrl.set(null);
          }
        };
      })
      .catch((err) => {
        console.error('Failed to play sound', err);
        if (this.currentAudio === audio) {
          this.playingSoundUrl.set(null);
        }
      });
  }

  setCategory(cat: 'consonant' | 'vowel') {
    this.selectedCategory.set(cat);
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  resetFilters() {
    this.consonantManner.set('all');
    this.consonantPlace.set('all');
    this.consonantVoicing.set('all');
    this.vowelHeight.set('all');
    this.vowelBackness.set('all');
    this.searchQuery.set('');
  }

  onMannerChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.consonantManner.set(target.value);
  }

  onPlaceChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.consonantPlace.set(target.value);
  }

  onVoicingChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.consonantVoicing.set(target.value);
  }

  onHeightChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.vowelHeight.set(target.value);
  }

  onBacknessChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.vowelBackness.set(target.value);
  }
}
