import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // Added
import { Router, NavigationEnd } from '@angular/router'; // Added NavigationEnd & RouterLink
import { Location } from '@angular/common'; // Added
import { filter, map } from 'rxjs'; // Added

import { AuthService } from '@core/services/auth.service';
import { AppRoutesHelper } from '@app/app.routes';
import { ResponsiveService } from '@app/core/services/responsive.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import {
  lucideArrowUp,
  lucideInbox,
  lucideCalendar,
  lucideSearch,
  lucideSettings,
  lucideHouse,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { ButtonDirective } from '@app/directive/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HlmButtonImports, HlmSidebarImports, NgIcon, HlmIcon, ButtonDirective],
  providers: [
    provideIcons({
      lucideArrowUp,
      lucideHouse,
      lucideInbox,
      lucideCalendar,
      lucideSearch,
      lucideSettings,
    }),
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly authService = inject(AuthService);
  protected readonly responsive = inject(ResponsiveService);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly userRoles = this.authService.userRoles;

  protected readonly appRoutesHelper = AppRoutesHelper;

  isHovered = false;

  // eactively listen to Router events
  protected readonly isCurrentPathPartOfAuthFlow = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.checkIfAuthFlow(event.urlAfterRedirects)),
    ),
    {
      // Use Location.path() for the initial vaconvert your layout observableslue. This catches the URL instantly
      // on a hard refresh, preventing the split-second flicker.
      initialValue: this.checkIfAuthFlow(this.location.path()),
    },
  );

  protected logOut() {
    this.authService.signOut();
  }

  // Helper method to clean up the URL formatting and check the array
  private checkIfAuthFlow(url: string): boolean {
    // Strip query parameters and remove the leading slash so it matches your routing array
    const cleanUrl = url.split('?')[0].replace(/^\//, '');
    return this.appRoutesHelper.authFlowRoutes.map(String).includes(cleanUrl);
  }

  protected readonly _items = [
    {
      title: 'Home',
      url: '#',
      icon: 'lucideHouse',
    },
    {
      title: 'Inbox',
      url: '#',
      icon: 'lucideInbox',
    },
    {
      title: 'Calendar',
      url: '#',
      icon: 'lucideCalendar',
    },
    {
      title: 'Search',
      url: '#',
      icon: 'lucideSearch',
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'lucideSettings',
    },
  ];
}
