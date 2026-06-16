import {
  Component,
  input,
  inject,
  signal,
  resource,
  effect,
  computed,
  Signal,
} from '@angular/core';
import { AudioPlayer } from '@features/dashboard/audio-player/audio-player';
import { SentenceText } from '@features/dashboard/sentence-text/sentence-text';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '@core/services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutesHelper } from '@app/app.routes';
import { DataState } from '@app/core/models/state';
import { CourseConfig } from '@app/core/models/config';
import { ButtonDirective } from '@app/directive/button';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-chorus-dashboard',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    AudioPlayer,
    SentenceText,
    MatCardModule,
    MatProgressSpinnerModule,
    HlmButtonImports,
    ButtonDirective,
  ],
  templateUrl: './chorus-dashboard.html',
  styleUrl: './chorus-dashboard.scss',
  host: {
    '(window:keydown.arrowleft)': 'previousSentence()',
    '(window:keydown.arrowright)': 'nextSentence()',
  },
})
export class ChorusDashboard {
  protected dataService = inject(DataService);
  private router = inject(Router);

  protected readonly language = input.required<string>();
  protected readonly accent = input.required<string>();
  protected readonly sentenceIndex = input.required<string>();

  protected sessionCount = signal<number>(0);
  private trackedSentenceId: number = -1;

  constructor() {
    effect(() => {
      const count = this.sentenceCount().value;
      const isLoading = this.sentenceCount().isLoading;
      const currentSentenceId = this.sentenceId();
      if (isLoading || count === null || count === undefined || !currentSentenceId) {
        return;
      }
      if (this.trackedSentenceId !== currentSentenceId) {
        this.sessionCount.set(0);
        this.trackedSentenceId = currentSentenceId; // Mark this sentence as initialized
      } else {
        this.sessionCount.update((v) => v + 1);
      }
    });
  }

  config: Signal<DataState<CourseConfig>> = computed(() => {
    const lang = this.language();
    const acc = this.accent();
    return this.dataService.getCourseConfig(lang, acc)();
  });

  sentenceId: Signal<number | null> = computed(() => {
    const config = this.config();
    if (!config.value || config.isLoading || config.error) return null;
    return config.value.chorus.sentences[parseInt(this.sentenceIndex(), 10) - 1];
  });

  numSentences = computed(() => {
    const config = this.config().value;
    if (config != null) {
      return config.chorus.sentences.length;
    }
    return 0;
  });

  previousSentence() {
    if (Number(this.sentenceIndex()) > 1) {
      this.router.navigate(
        AppRoutesHelper.getChorusDashboardRoute(
          this.language(),
          this.accent(),
          Number(this.sentenceIndex()) - 1,
        ),
      );
    }
  }

  nextSentence() {
    if (Number(this.sentenceIndex()) < this.numSentences()) {
      this.router.navigate(
        AppRoutesHelper.getChorusDashboardRoute(
          this.language(),
          this.accent(),
          Number(this.sentenceIndex()) + 1,
        ),
      );
    }
  }

  disablePreviousButton() {
    return Number(this.sentenceIndex()) === 1;
  }

  disableNextButton() {
    return Number(this.sentenceIndex()) === this.numSentences();
  }

  // sentenceCountResource = resource({
  //   params: () => ({
  //     id: this.sentenceId(),
  //     _refresh: this.dataService.sentenceCountUpdateTrigger(),
  //   }),
  //   loader: async ({ params }) => {
  //     if (!params.id) return null;
  //     return await this.dataService.fetchSentenceCount(params.id);
  //   },
  // });
  sentenceCount: Signal<DataState<number>> = computed(() => {
    const id = this.sentenceId();
    if (!id) return { value: null, isLoading: false, error: null };
    return this.dataService.getSentenceCount(id)();
  });

  resetSessionCount() {
    this.sessionCount.set(0);
  }
}
