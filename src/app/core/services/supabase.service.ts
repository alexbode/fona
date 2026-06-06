import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private client: SupabaseClient;
  private readonly projectId = 'pskgaxfcwrutoqfuzhye';

  constructor() {
    this.client = createClient(
      `https://${this.projectId}.supabase.co`,
      'sb_publishable_yMFs6pNQAMWiiZjcO4MMBA_8fMtqNFg',
    );
  }

  getSupabaseClient() {
    return this.client;
  }

  getProjectId() {
    return this.projectId;
  }
}
