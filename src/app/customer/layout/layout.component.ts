import { Component } from '@angular/core';
import { CoreSharedModule } from '../../shared/core-shared.module';
import { CustomerSharedModule } from '../shared/customer-shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CustomerSharedModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
