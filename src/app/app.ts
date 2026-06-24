import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
// import { Navbar } from '@features/navbar/navbar';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { filter, map } from 'rxjs';
import { AppRoutesHelper } from '@app/app.routes';
import { Footer } from '@app/shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmSidebarImports, Footer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  protected readonly appRoutesHelper = AppRoutesHelper;

  protected readonly title = signal('repeat-with-me');

  protected readonly isCurrentPathPartOfAuthFlow = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.checkIfAuthFlow(event.urlAfterRedirects)),
    ),
    {
      initialValue: this.checkIfAuthFlow(this.location.path()),
    },
  );

  private checkIfAuthFlow(url: string): boolean {
    const cleanUrl = url.split('?')[0].replace(/^\//, '');
    return this.appRoutesHelper.authFlowRoutes.map(String).includes(cleanUrl);
  }
}

