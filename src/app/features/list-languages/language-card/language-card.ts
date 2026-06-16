import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideLock } from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { Language } from '../languages/languages';

@Component({
  selector: 'app-language-card',
  imports: [NgIcon, HlmIcon, HlmCardImports],
  providers: [
    provideIcons({
      lucideLock,
    }),
  ],
  templateUrl: './language-card.html',
  styleUrl: './language-card.scss',
})
export class LanguageCard {
  lang = input.required<Language>();
  unlockedCount = input.required<number>();

  select = output<Language>();
}
