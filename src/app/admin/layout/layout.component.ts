import { Component } from '@angular/core';
import { CoreSharedModule } from '../../shared/core-shared.module';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AdminSharedModule, SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
