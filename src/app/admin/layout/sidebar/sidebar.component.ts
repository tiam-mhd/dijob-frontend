import { Component } from '@angular/core';
import { CoreSharedModule } from '../../../shared/core-shared.module';
import { AdminSharedModule } from '../../shared/admin-shared.module';
import { navItems } from '../sidebar-nav.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = navItems;
}
