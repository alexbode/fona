import { Component, inject, input, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideCheckCircle, lucideSparkles } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { ButtonDirective } from '@app/directive/button';

import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-paywall',
  imports: [NgIcon, HlmIcon, ButtonDirective, TitleCasePipe, HlmSkeleton],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideCheckCircle,
      lucideSparkles,
    }),
  ],
  templateUrl: './paywall.html',
})
export class Paywall {
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  readonly languageId = input.required<string>({ alias: 'language' });
  readonly accentId = input.required<string>({ alias: 'accent' });

  readonly languages = this.dataService.getLanguageList();

  readonly language = computed(() => {
    const langs = this.languages().value;
    if (!langs) return null;
    const pathLang = this.languageId()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  readonly accent = computed(() => {
    const lang = this.language();
    if (!lang) return null;
    const pathAccent = this.accentId()?.toLowerCase();
    return lang.accents.find((a) => a.name.toLowerCase() === pathAccent) || null;
  });

  protected readonly selected = signal<'monthly' | 'annual'>('annual');
  protected readonly plans: ('monthly' | 'annual')[] = ['monthly', 'annual'];

  protected readonly planFeatures = [
    'Full chorusing library for this language',
    'All accent variants included',
    'Minimal pairs training',
    'Rep tracking & progress history',
    'Offline access',
  ];

  onBack(): void {
    const langCode = this.language()?.name?.toLowerCase();
    if (langCode) {
      this.router.navigate(AppRoutesHelper.getAccentsRoute(langCode));
    } else {
      this.router.navigate(AppRoutesHelper.getLanguagesRoute());
    }
  }
}
