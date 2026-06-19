import { Component, inject, computed, input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideCheckCircle, lucideLock } from '@ng-icons/lucide';
import { DataService } from '@core/services/data.service';
import { Accent } from '@core/models/language';
import { SelectionCard } from '@app/shared/selection-card/selection-card';
import { AppRoutesHelper } from '@app/app.routes';

import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-accents',
  imports: [NgIcon, HlmIcon, SelectionCard, TitleCasePipe],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideCheckCircle,
      lucideLock,
    }),
  ],
  templateUrl: './accents.html',
  styleUrl: './accents.scss',
})
export class Accents {
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  // Bind the route parameter ':language' (which is the language name)
  readonly languageId = input.required<string>({ alias: 'language' });

  // List of purchased/owned accent names
  readonly purchasedAccents = new Set<string>(['america', 'england', 'mexico']);

  // Fetch the languages list
  readonly languages = this.dataService.getLanguageList();

  // Selected language computed signal based on the route language name
  readonly language = computed(() => {
    const langs = this.languages().value;
    if (!langs) return null;
    const pathLang = this.languageId()?.toLowerCase();
    return langs.find((l) => l.name.toLowerCase() === pathLang) || null;
  });

  onSelect(accent: Accent): void {
    const langName = this.language()?.name?.toLowerCase() || '';
    const accentName = accent.name.toLowerCase();
    const role = `${langName}/${accentName}`
    if (!this.dataService.currentUser().value?.user_roles?.includes(role)) {
      this.router.navigate(AppRoutesHelper.getPaywallRoute(langName, accentName));
      return;
    }

    // Navigate to mode selection for the selected accent
    this.router.navigate(AppRoutesHelper.getModeSelectionRoute(langName, accentName));
  }

  onBack(): void {
    // Navigate back to the languages list screen
    this.router.navigate(AppRoutesHelper.getLanguagesRoute());
  }
}
