import { Component, inject, computed } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { AppRoutesHelper } from '@app/app.routes';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly currentUser = this.authService.currentUser;
  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly userRoles = this.authService.userRoles;

  protected readonly appRoutesHelper = AppRoutesHelper;

  protected logOut() {
    this.authService.signOut();
  }

  protected readonly isCurrentPathPartOfAuthFlow = computed(() => {
    const nav = this.router.lastSuccessfulNavigation();
    const currentUrl = nav?.finalUrl?.toString().slice(1) ?? this.router.url;
    return this.appRoutesHelper.authFlowPaths.map(String).includes(currentUrl);
  });
}
