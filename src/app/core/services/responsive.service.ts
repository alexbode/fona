import { Injectable, inject, computed } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);

  // Observe the breakpoints and convert the Observable to a Signal
  private screenState = toSignal(
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.Web,
    ]),
  );

  isMobile = computed(() => {
    const state = this.screenState();
    return state ? state.breakpoints[Breakpoints.HandsetPortrait] : false;
  });

  isDesktop = computed(() => {
    const state = this.screenState();
    return state ? state.breakpoints[Breakpoints.Web] : true;
  });
}
