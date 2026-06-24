import { Component } from '@angular/core';
import { ButtonDirective } from '@app/directive/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { lucideExternalLink, lucideGithub } from '@ng-icons/lucide';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ButtonDirective, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideExternalLink,
      lucideGithub,
    }),
  ],
  templateUrl: './contact.html',
})
export class Contact {}
