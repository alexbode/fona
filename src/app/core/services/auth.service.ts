import { Injectable, signal, computed, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Services
  private service: SupabaseService = inject(SupabaseService);
  private logger: LoggingService = inject(LoggingService);

  // Clients
  private supabase: SupabaseClient = this.service.getSupabaseClient();

  // State
  private readonly projectId = this.service.getProjectId();
  currentUser = signal<User | null>(null);
  jwtToken = signal<string>('');

  readonly userRoles = computed(
    () => (jwtDecode(this.jwtToken()) as any)?.app_metadata?.roles || [],
  );
  readonly userId = computed(() => (this.currentUser()?.id));
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.set(session?.user ?? null);
      this.jwtToken.set(session?.access_token ?? '');
    });
  }

  async signUp(email: string, password: string) {
    const response = await this.supabase.auth.signUp({ email, password });
    this.logger.debug('auth.service.ts signUp | Sign-up response:', response);
    return response;
  }

  async signIn(email: string, password: string) {
    const response = await this.supabase.auth.signInWithPassword({ email, password });
    this.logger.debug('auth.service.ts signIn | Sign-in response:', response);
    return response;
  }

  async signOut() {
    localStorage.removeItem(`sb-${this.projectId}-auth-token`);
    const response = await this.supabase.auth.signOut();
    this.logger.debug('auth.service.ts signOut | Sign-out response:', response);
    return response;
  }

  async refreshSession() {
    const reponse = await this.supabase.auth.refreshSession();
    this.logger.debug('auth.service.ts refreshSession | Refresh session response:', reponse);
    return reponse;
  }

  async checkSession(): Promise<boolean> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    this.logger.debug('auth.service.ts checkSession | Session:', session);
    return !!session;
  }
}
