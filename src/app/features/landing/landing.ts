import { Component } from '@angular/core';
import { AppRoutesHelper } from '@app/app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  protected appRoutesHelper = AppRoutesHelper;
}
