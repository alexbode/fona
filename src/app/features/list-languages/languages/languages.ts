import { Component, inject } from '@angular/core';
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

export interface Accent {
  id: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  accents: Accent[];
}

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
  private readonly router = inject(Router);

  // Mock data
  user: { name: string; email: string } | null = {
    name: 'Alex Bode',
    email: 'alex@example.com',
  };

  allTimeReps = 1250;

  languages: Language[] = [
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      accents: [
        { id: 'en-us', name: 'US Accent' },
        { id: 'en-gb', name: 'UK Accent' },
        { id: 'en-au', name: 'AU Accent' },
      ],
    },
    {
      id: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      accents: [
        { id: 'es-es', name: 'Spain Accent' },
        { id: 'es-mx', name: 'Mexico Accent' },
      ],
    },
    {
      id: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      accents: [{ id: 'fr-fr', name: 'France Accent' }],
    },
  ];

  purchasedAccents = new Set<string>(['en-us', 'en-gb', 'es-mx']);

  get userInitials(): string {
    if (!this.user) return '';
    return this.user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2);
  }

  get userFirstName(): string {
    if (!this.user) return '';
    return this.user.name.split(' ')[0];
  }

  get formattedAllTimeReps(): string {
    return this.allTimeReps.toLocaleString();
  }

  getUnlockedCount(lang: Language): number {
    return lang.accents.filter((a) => this.purchasedAccents.has(a.id)).length;
  }

  onSelect(lang: Language): void {
    console.log('Selected language:', lang);
    this.router.navigate(['/', lang.id]);
  }

  onIpa(): void {
    console.log('IPA Reference clicked');
    alert('IPA Reference clicked (Mock Action)');
  }

  onSignIn(): void {
    console.log('Sign In clicked');
    this.router.navigate(AppRoutesHelper.getSigninRoute());
  }

  onSignOut(): void {
    console.log('Sign Out clicked');
    this.user = null;
  }
}
