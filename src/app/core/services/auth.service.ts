import { Injectable, signal, computed, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { SupabaseClient, User, Session } from '@supabase/supabase-js';
import { SupabaseService } from '@core/services/supabase.service';
import { LoggingService } from '@core/services/logging.service';
import { DataService } from '@core/services/data.service';
import { AppUser, CustomJwt } from '@core/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Services
  private supabaseService: SupabaseService = inject(SupabaseService);
  private dataService: DataService = inject(DataService);
  private logger: LoggingService = inject(LoggingService);

  // Clients
  private supabase: SupabaseClient = this.supabaseService.getSupabaseClient();

  // State
  private readonly projectId = this.supabaseService.getProjectId();

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.handleAuthChange(session);
    });
  }

  private async handleAuthChange(session: Session | null) {
    if (session?.user) {
      const decoded = jwtDecode<CustomJwt>(session!.access_token);
      const user: AppUser = session!.user;
      user.user_roles = decoded.user_roles || [];
      this.dataService.setCurrentUser({ value: user, isLoading: false, error: null });
    } else {
      this.dataService.setCurrentUser({ value: null, isLoading: false, error: null });
    }
  }

  async signUp(email: string, password: string, name?: string) {
    const options = name ? { data: { name } } : undefined;
    const response = await this.supabase.auth.signUp({ email, password, options });
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

  // check local storage
  async checkSession(): Promise<boolean> {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();
    this.logger.debug('auth.service.ts checkSession | Session:', session);
    return !!session;
  }
}
