import { Component, input } from '@angular/core';
import { AdminSharedModule } from '../../shared/admin-shared.module';
import { CoreSharedModule } from '../../../shared/core-shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  sidebarId = input('sidebar1');
}
