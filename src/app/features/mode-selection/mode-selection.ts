import { Component, inject, computed, input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideMic, lucideVolume2, lucideTarget } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { LoggingService } from '@core/services/logging.service';
import { CourseConfig } from '@core/models/config';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-mode-selection',
  imports: [NgIcon, HlmIcon, TitleCasePipe, HlmBreadcrumbImports, HlmSkeleton, HlmCardImports],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideMic,
      lucideVolume2,
      lucideTarget,
    }),
  ],
  templateUrl: './mode-selection.html',
  styleUrl: './mode-selection.scss',
})
export class ModeSelection {
  protected readonly AppRoutesHelper = AppRoutesHelper;
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);
  private readonly logger = inject(LoggingService);

  // Bind route parameters ':language' and ':accent'
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

  configState = computed(() => {
    return this.dataService.getCourseConfig(this.languageName(), this.accentName())();
  });

  config: Signal<CourseConfig | null> = computed(() => {
    return this.configState().value;
  });

  hasChorus = computed(() => {
    const cfg = this.config();
    return !!(cfg && cfg.chorus && cfg.chorus.sentences && cfg.chorus.sentences.length > 0);
  });

  hasChorusFocus = computed(() => {
    const cfg = this.config();
    return !!(
      cfg &&
      ((cfg.vowels && cfg.vowels.length > 0) ||
        (cfg.consonants && cfg.consonants.length > 0) ||
        (cfg.semiVowels && cfg.semiVowels.length > 0))
    );
  });

  hasPairs = computed(() => {
    const cfg = this.config();
    return !!(cfg && cfg.pairs && cfg.pairs.length > 0);
  });

  hasPairsQuiz = computed(() => {
    const cfg = this.config();
    return !!(cfg && cfg.pairsQuiz && cfg.pairsQuiz.length > 0);
  });

  ngOnInit() {
    this.logger.debug(
      'config',
      this.dataService.getCourseConfig(this.languageName(), this.accentName())(),
    );
  }

  onSelectChorusing(): void {
    if (this.config() === null) {
      this.router.navigate(AppRoutesHelper.getLanguagesRoute());
      return;
    }
    this.router.navigate(
      AppRoutesHelper.getChorusDashboardRoute(this.languageName(), this.accentName()),
    );
  }

  onSelectChorusFocus(): void {
    this.router.navigate(
      AppRoutesHelper.getChorusFocusSelectionRoute(this.languageName(), this.accentName()),
    );
  }

  onSelectMinimalPairs(): void {
    this.router.navigate(
      AppRoutesHelper.getPairsSelectionRoute(this.languageName(), this.accentName()),
    );
  }

  onSelectPairsQuiz(): void {
    this.router.navigate(AppRoutesHelper.getPairsQuizRoute(this.languageName(), this.accentName()));
  }

  onBack(): void {
    this.router.navigate(AppRoutesHelper.getAccentsRoute(this.languageName()));
  }
}
