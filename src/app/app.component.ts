import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@coreui/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dijob-frontend';
}
