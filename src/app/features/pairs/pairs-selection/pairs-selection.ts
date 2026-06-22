import { Component, inject, computed, input, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { CourseConfig } from '@core/models/config';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { DataState } from '@core/models/state';

@Component({
  selector: 'app-pairs-selection',
  standalone: true,
  imports: [NgIcon, HlmIcon, TitleCasePipe, HlmBreadcrumbImports],
  providers: [
    provideIcons({
      lucideChevronLeft,
    }),
  ],
  templateUrl: './pairs-selection.html',
  styleUrl: './pairs-selection.scss',
})
export class PairsSelection {
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

  readonly pairItems = computed(() => {
    const list = this.config().value?.pairs ?? [];
    return list.map((p, index) => {
      const wordAId = p.words_a[0];
      const wordBId = p.words_b[0];
      return {
        id: index + 1,
        symA: p.ipa_a,
        symB: p.ipa_b,
        wordAId,
        wordBId,
        wordAText: computed(() => this.dataService.getSentence(wordAId)().value?.text ?? '...'),
        wordBText: computed(() => this.dataService.getSentence(wordBId)().value?.text ?? '...'),
      };
    });
  });

  onSelect(pairIndex: number): void {
    this.router.navigate(
      AppRoutesHelper.getPairsDashboardRoute(this.languageName(), this.accentName(), pairIndex),
    );
  }

  onBack(): void {
    this.router.navigate(
      AppRoutesHelper.getModeSelectionRoute(this.languageName(), this.accentName()),
    );
  }
}
