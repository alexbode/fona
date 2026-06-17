import { Component, inject, computed, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideLogOut,
  lucideUser,
  lucideMic,
  lucideBookOpen,
  lucideChevronLeft,
} from '@ng-icons/lucide';
import { AppRoutesHelper } from '@app/app.routes';
import { LanguageCard } from '../language-card/language-card';
import { DataService } from '@core/services/data.service';
import { Language } from '@core/models/language';
import { DataState } from '@core/models/state';

@Component({
  selector: 'app-languages',
  imports: [NgIcon, HlmIcon, LanguageCard],
  providers: [
    provideIcons({
      lucideLogOut,
      lucideUser,
      lucideMic,
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

  purchasedAccents = new Set<string>(['en-us', 'en-gb', 'es-mx']);

  get formattedAllTimeReps(): string {
    return this.allTimeReps.toLocaleString();
  }

  getUnlockedCount(lang: Language): number {
    return lang.accents.filter((a) => this.purchasedAccents.has(a.name)).length;
  }

  onSelect(lang: Language): void {
    console.log('Selected language:', lang);
    this.router.navigate(['/', lang.id]);
  }

  onIpa(): void {
    console.log('IPA Reference clicked');
    this.dataService.getLanguageList();
    console.log(this.languages());
    alert('IPA Reference clicked (Mock Action)');
  }

}
