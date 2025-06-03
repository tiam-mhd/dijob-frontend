import { Component } from '@angular/core';
import { CoreSharedModule } from '../../../shared/core-shared.module';
import { CustomerSharedModule } from '../../shared/customer-shared.module';
import { navItems } from '../sidebar-nav.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CustomerSharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = navItems;

  isSidebarOpen = false;

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

closeSidebar() {
  this.isSidebarOpen = false;
}
}
