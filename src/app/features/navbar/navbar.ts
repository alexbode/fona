import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'; // Added
import { Router, NavigationEnd, RouterLink } from '@angular/router'; // Added NavigationEnd & RouterLink
import { Location } from '@angular/common'; // Added
import { filter, map } from 'rxjs'; // Added

import { AuthService } from '@core/services/auth.service';
import { AppRoutesHelper } from '@app/app.routes';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, RouterLink], // Make sure RouterLink is imported
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly authService = inject(AuthService);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly userRoles = this.authService.userRoles;

  protected readonly appRoutesHelper = AppRoutesHelper;

  // 1. Reactively listen to Router events
  protected readonly isCurrentPathPartOfAuthFlow = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.checkIfAuthFlow(event.urlAfterRedirects)),
    ),
    {
      // 2. Use Location.path() for the initial value. This catches the URL instantly
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
    return this.appRoutesHelper.authFlowPaths.map(String).includes(cleanUrl);
  }
}
