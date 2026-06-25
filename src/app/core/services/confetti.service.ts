import { Service, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import confetti, {
  createConfetti,
  ConfettiOptions,
  GlobalOptions,
  ShapeData,
} from '@core/utils/confetti/confetti';

/*
HOW TO USE

import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { ConfettiService } from './confetti.service';

@Component({
  selector: 'app-celebration',
  standalone: true,
  template: `
    <div class="celebration-container">
      <h2>Confetti Playground</h2>
      
      <button (click)="triggerBasic()">Basic Celebration</button>
      <button (click)="triggerStars()">Star Pattern</button>
      
      <canvas #localCanvas width="400" height="300" style="border: 1px solid #ccc; margin-top: 20px;"></canvas>
      <button (click)="triggerLocal()">Fire in Box</button>
    </div>
  `,
  styles: [`
    .celebration-container { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 2rem; }
    button { padding: 10px 20px; cursor: pointer; border-radius: 6px; border: 1px solid #ccc; }
  `]
})
export class CelebrationComponent {
  private readonly confettiService = inject(ConfettiService);
  
  @ViewChild('localCanvas') localCanvasRef!: ElementRef<HTMLCanvasElement>;

  // 1. Basic full-screen trigger
  triggerBasic(): void {
    this.confettiService.fire({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a']
    });
  }

  // 2. Trigger with custom shapes (Stars)
  triggerStars(): void {
    const starDefaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star' as const],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    // Fire multiple bursts to create a specific effect
    this.confettiService.fire({ ...starDefaults, particleCount: 40, scalar: 1.2 });
    this.confettiService.fire({ ...starDefaults, particleCount: 10, scalar: 0.75 });
  }

  // 3. Triggering inside a specific custom canvas element
  triggerLocal(): void {
    if (!this.localCanvasRef) return;
    
    // Create a specific cannon bound to this canvas
    const localFire = this.confettiService.createCustomCannon(this.localCanvasRef.nativeElement, {
      resize: true
    });

    localFire({
      particleCount: 100,
      spread: 60,
      origin: { y: 1 } // Fire from the bottom of the canvas
    });
  }
}
*/

@Service()
export class ConfettiService {
  // Inject PLATFORM_ID to safely handle Angular SSR/Prerendering
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /**
   * Fires the default full-screen confetti cannon.
   */
  public fire(options?: ConfettiOptions): Promise<void> {
    if (!this.isBrowser) {
      return Promise.resolve(); // Fail silently on the server
    }

    const result = confetti(options);
    return result ? result : Promise.resolve();
  }

  /**
   * Creates a scoped confetti cannon attached to a specific canvas.
   */
  public createCustomCannon(canvas: HTMLCanvasElement, globalOpts?: GlobalOptions) {
    if (!this.isBrowser) {
      return (options?: ConfettiOptions) => Promise.resolve();
    }

    return createConfetti(canvas, globalOpts);
  }

  /**
   * Stops the current animation and clears the canvas.
   */
  public reset(): void {
    if (this.isBrowser) {
      confetti.reset();
    }
  }

  /**
   * Helper to generate a text/emoji shape
   */
  public createShapeFromText(text: string): ShapeData | null {
    if (!this.isBrowser) return null;
    return confetti.shapeFromText({ text, scalar: 2 });
  }
}
