import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { filter, map } from 'rxjs';

import { AuthService } from '@core/services/auth.service';
import { DataService } from '@core/services/data.service';
import { AppRoutesHelper } from '@app/app.routes';
import { ResponsiveService } from '@app/core/services/responsive.service';
import { ButtonDirective } from '@app/directive/button';
import { provideIcons } from '@ng-icons/core';
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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HlmButtonImports, HlmSidebarImports, RouterLink, ButtonDirective],
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
  private readonly dataService = inject(DataService);
  protected readonly responsive = inject(ResponsiveService);

  readonly isLoggedIn = this.dataService.isLoggedIn;
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

  protected signOut() {
    this.authService.signOut();
    this.router.navigate(AppRoutesHelper.getHomeRoute());
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
