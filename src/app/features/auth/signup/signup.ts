import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoggingService } from '@app/core/services/logging.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  // Services
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggingService);

  // State
  protected readonly appRoutesHelper = AppRoutesHelper;
  showPassword = false;

  // Signals for state management
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

      // Navigate to your protected route on success
      this.router.navigateByUrl(this.appRoutesHelper.routes.Home);
    } catch (error: any) {
      this.logger.error('signup.ts onSubmit | message: ', error.message);
      this.errorMessage.set(error.message || 'An error occurred during login.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
