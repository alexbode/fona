import { Component, inject, computed, input } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideMic, lucideVolume2 } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';

@Component({
  selector: 'app-mode-selection',
  imports: [NgIcon, HlmIcon, TitleCasePipe],
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
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

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

  onSelectChorusing(): void {
    this.router.navigate(
      AppRoutesHelper.getChorusDashboardRoute(this.languageName(), this.accentName(), 1),
    );
  }

  onSelectMinimalPairs(): void {
    this.router.navigate(
      AppRoutesHelper.getPairsDashboardRoute(this.languageName(), this.accentName(), 1, 1),
    );
  }

  onBack(): void {
    this.router.navigate(AppRoutesHelper.getAccentsRoute(this.languageName()));
  }
}
