import { Component, inject, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideLogOut,
  lucideUser,
  lucideSpeech,
  lucideBookOpen,
  lucideChevronLeft,
} from '@ng-icons/lucide';
import { AppRoutesHelper } from '@app/app.routes';
import { SelectionCard } from '@app/shared/selection-card/selection-card';
import { DataService } from '@core/services/data.service';
import { Language } from '@core/models/language';
import { DataState } from '@core/models/state';

@Component({
  selector: 'app-languages',
  imports: [NgIcon, HlmIcon, SelectionCard, TitleCasePipe],
  providers: [
    provideIcons({
      lucideLogOut,
      lucideUser,
      lucideSpeech,
      lucideBookOpen,
      lucideChevronLeft,
    }),
  ],
  templateUrl: './languages.html',
  styleUrl: './languages.scss',
})
export class Languages {
  readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  allTimeReps = 1250;

  readonly languages: Signal<DataState<Language[]>> = this.dataService.getLanguageList();

  purchasedAccents = new Set<string>(['america', 'england', 'mexico']);

  get formattedAllTimeReps(): string {
    return this.allTimeReps.toLocaleString();
  }

  getUnlockedCount(lang: Language): number {
    return lang.accents.filter((a) => this.purchasedAccents.has(a.name.toLowerCase())).length;
  }

  onSelect(lang: Language): void {
    console.log('Selected language:', lang);
    this.router.navigate(AppRoutesHelper.getAccentsRoute(lang.name.toLowerCase()));
  }

  onIpa(): void {
    this.router.navigate(AppRoutesHelper.getIpaRoute());
  }
}
