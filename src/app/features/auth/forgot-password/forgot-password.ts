import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggingService } from '@app/core/services/logging.service';
import { NotificationService } from '@core/services/notification.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { ButtonDirective } from '@app/directive/button';
import { AuthLayout } from '@features/auth/auth-layout/auth-layout';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmButtonImports,
    HlmInputImports,
    AuthLayout,
    ButtonDirective,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggingService);
  private notification = inject(NotificationService);

  // State
  appRoutesHelper = AppRoutesHelper;

  // Signals
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Strongly typed form
  forgotForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async onSubmit() {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email } = this.forgotForm.getRawValue();
    const redirectTo = `${window.location.origin}/reset-password`;

    try {
      const { error } = await this.authService.sendPasswordResetEmail(email, redirectTo);
      if (error) throw error;

      this.notification.show('Password reset link has been sent to your email.');
      this.router.navigate(this.appRoutesHelper.getSigninRoute());
    } catch (error: any) {
      this.logger.error('forgot-password.ts onSubmit | error: ', error.message);
      this.errorMessage.set(error.message || 'An error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
