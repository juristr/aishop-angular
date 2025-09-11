import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent, FooterComponent } from '@aishop-angular/shared-ui';

@Component({
  imports: [RouterModule, NavbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected title = 'shop';
}
