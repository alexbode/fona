import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';
import { ButtonDirective } from '@app/directive/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideChevronLeft, lucideExternalLink, lucideGithub } from '@ng-icons/lucide';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ButtonDirective, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideExternalLink,
      lucideGithub,
    }),
  ],
  templateUrl: './contact.html',
})
export class Contact {
  readonly appRoutesHelper = AppRoutesHelper;
}
