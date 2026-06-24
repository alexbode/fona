import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideChevronLeft,
    }),
  ],
  templateUrl: './terms.html',
})
export class Terms {
  readonly appRoutesHelper = AppRoutesHelper;
}
