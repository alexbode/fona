import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoutesHelper } from '@app/app.routes';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly appRoutesHelper = AppRoutesHelper;
  protected readonly currentYear = new Date().getFullYear();
}
