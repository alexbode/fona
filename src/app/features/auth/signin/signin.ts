import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoggingService } from '@app/core/services/logging.service';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    ButtonDirective,
    HlmButtonImports,
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggingService);

  // State
  showPassword = false;
  appRoutesHelper = AppRoutesHelper;

  // Signals
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Strongly typed reactive form
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set(null);
    const { email, password } = this.loginForm.getRawValue();
    try {
      const { data, error } = await this.authService.signIn(email, password);
      if (error) throw error;
      this.router.navigate(this.appRoutesHelper.getHomeRoute());
    } catch (error: any) {
      this.logger.error('signin.ts onSubmit | message: ', error.message);
      this.errorMessage.set(error.message || 'An error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
