import { Component, input, output } from '@angular/core';

import { ButtonDirective } from '@app/directive/button';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly googleLogin = output<void>();
}
