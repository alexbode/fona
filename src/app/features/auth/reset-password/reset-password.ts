import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LoggingService } from '@app/core/services/logging.service';
import { NotificationService } from '@core/services/notification.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';
import { ButtonDirective } from '@app/directive/button';
import { AuthLayout } from '@features/auth/auth-layout/auth-layout';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    HlmButtonImports,
    HlmInputImports,
    NgIconComponent,
    AuthLayout,
    ButtonDirective,
  ],
  providers: [provideIcons({ lucideEye, lucideEyeOff })],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggingService);
  private notification = inject(NotificationService);

  // State
  showPassword = false;
  showConfirmPassword = false;
  appRoutesHelper = AppRoutesHelper;

  // Signals
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  // Strongly typed form
  resetForm = this.fb.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: passwordMatchValidator,
  });

  async onSubmit() {
    if (this.resetForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { password } = this.resetForm.getRawValue();

    try {
      const { error } = await this.authService.updatePassword(password);
      if (error) throw error;

      this.notification.show('Your password has been successfully reset.');
      // Since they are now authenticated with the recovery session, we can redirect directly to the languages dashboard
      this.router.navigate(this.appRoutesHelper.getLanguagesRoute());
    } catch (error: any) {
      this.logger.error('reset-password.ts onSubmit | error: ', error.message);
      this.errorMessage.set(error.message || 'An error occurred during password reset.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
