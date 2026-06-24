import { Component, inject, computed, input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { CourseConfig } from '@core/models/config';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { DataState } from '@core/models/state';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-chorus-focus',
  imports: [TitleCasePipe, HlmBreadcrumbImports, HlmSkeleton, HlmCardImports],
  templateUrl: './chorus-focus.html',
  styleUrl: './chorus-focus.scss',
})
export class ChorusFocus {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  readonly languageName = input.required<string>({ alias: 'language' });
  readonly accentName = input.required<string>({ alias: 'accent' });

  // Fetch language list state
  readonly languagesState = this.dataService.getLanguageList();

  // Find selected language object
  readonly language = computed(() => {
    const langs = this.languagesState().value;
    if (!langs) return null;
    const pathLang = this.languageName()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  // Find selected accent object
  readonly accent = computed(() => {
    const lang = this.language();
    if (!lang) return null;
    const pathAccent = this.accentName()?.toLowerCase();
    return lang.accents.find((a) => a.name.toLowerCase() === pathAccent) || null;
  });

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.languageName();
    const acc = this.accentName();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  readonly vowels = computed(() => this.config().value?.vowels ?? []);
  readonly consonants = computed(() => this.config().value?.consonants ?? []);
  readonly semiVowels = computed(() => this.config().value?.semiVowels ?? []);

  readonly sentences = computed(() => {
    const cfg = this.config().value;
    if (!cfg || !cfg.chorus || !cfg.chorus.sentences) return [];
    return cfg.chorus.sentences.map((id) => this.dataService.getSentence(id)());
  });

  readonly ipaCounts = computed(() => {
    const list = this.sentences();
    const counts: Record<string, number> = {};
    const cfg = this.config().value;
    if (!cfg) return counts;

    const allSounds = [
      ...(cfg.vowels || []),
      ...(cfg.consonants || []),
      ...(cfg.semiVowels || []),
    ];

    for (const sound of allSounds) {
      counts[sound] = 0;
    }

    for (const sState of list) {
      if (sState.value) {
        const ipaText = sState.value.ipa;
        for (const sound of allSounds) {
          if (ipaText.includes(sound)) {
            counts[sound]++;
          }
        }
      }
    }
    return counts;
  });

  onSelect(sound: string): void {
    const count = this.ipaCounts()[sound] || 0;
    if (count === 0) return; // Prevent selection of sounds with no sentences

    this.router.navigate(
      AppRoutesHelper.getChorusDashboardRoute(this.languageName(), this.accentName()),
      { queryParams: { ipa: sound } },
    );
  }

  onBack(): void {
    this.router.navigate(
      AppRoutesHelper.getModeSelectionRoute(this.languageName(), this.accentName()),
    );
  }
}
