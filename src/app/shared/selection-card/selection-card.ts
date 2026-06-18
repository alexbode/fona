import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideCheckCircle, lucideLock } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';

@Component({
  selector: 'app-selection-card',
  imports: [NgIcon, HlmIcon, HlmCardImports, HlmSkeleton],
  providers: [
    provideIcons({
      lucideCheckCircle,
      lucideLock,
    }),
  ],
  templateUrl: './selection-card.html',
  styleUrl: './selection-card.scss',
})
export class SelectionCard {
  isLoading = input<boolean>(false);
  flag = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
  unlocked = input<boolean>(true);
  footerText = input<string>('');

  select = output<void>();
}
