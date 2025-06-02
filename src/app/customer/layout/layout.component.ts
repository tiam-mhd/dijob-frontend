import { Component, ViewChild } from '@angular/core';
import { CoreSharedModule } from '../../shared/core-shared.module';
import { CustomerSharedModule } from '../shared/customer-shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CartDrawerComponent } from '../shared/components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CustomerSharedModule, CartDrawerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('cartDrawer') cartDrawer!: CartDrawerComponent;

}
