import { Component, input } from '@angular/core';
import { CustomerSharedModule } from '../../shared/customer-shared.module';
import { CoreSharedModule } from '../../../shared/core-shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomerSharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  sidebarId = input('sidebar1');
}
