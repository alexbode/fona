import { Component, input, output, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideLock } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { Language } from '@core/models/language';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-language-card',
  imports: [HlmCardImports, HlmButtonImports, HlmSkeleton],
  providers: [
    provideIcons({
      lucideLock,
    }),
  ],
  templateUrl: './language-card.html',
  styleUrl: './language-card.scss',
})
export class LanguageCard {
  isLoading = input<boolean>(false);
  lang = input<Language>();
  unlockedCount = input<number>(0);

  select = output<Language>();


  private readonly dataService = inject(DataService);
  protected readonly currentUser = this.dataService.currentUser;
}
