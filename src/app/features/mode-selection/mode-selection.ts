import { Component, inject, computed, input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideMic, lucideVolume2 } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { LoggingService } from '@core/services/logging.service';
import { CourseConfig } from '@core/models/config';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';

@Component({
  selector: 'app-mode-selection',
  imports: [NgIcon, HlmIcon, TitleCasePipe, HlmBreadcrumbImports],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideMic,
      lucideVolume2,
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

  config: Signal<CourseConfig | null> = computed(() => {
    const configState = this.dataService.getCourseConfig(this.languageName(), this.accentName())();
    return configState.value;
  });

  hasChorus = computed(() => {
    const cfg = this.config();
    return !!(cfg && cfg.chorus && cfg.chorus.sentences && cfg.chorus.sentences.length > 0);
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
    this.dataService.initializeChorusSessionState(this.config()!);
    this.router.navigate(
      AppRoutesHelper.getChorusDashboardRoute(this.languageName(), this.accentName(), 1),
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
