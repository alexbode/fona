import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggingService } from '@app/core/services/logging.service';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff } from '@ng-icons/lucide';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonDirective,
    HlmButtonImports,
    HlmInputImports,
    NgIconComponent,
  ],
  providers: [provideIcons({ lucideEye, lucideEyeOff })],
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
      this.router.navigate(this.appRoutesHelper.getLanguagesRoute());
    } catch (error: any) {
      this.logger.error('signin.ts onSubmit | message: ', error.message);
      this.errorMessage.set(error.message || 'An error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
