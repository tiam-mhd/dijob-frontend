import { Component } from '@angular/core';
import { AdminSharedModule } from '../../shared/admin-shared.module';

@Component({
  selector: 'app-menu',
    standalone: true,
    imports: [AdminSharedModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}
