import { Component } from '@angular/core';
import { CoreSharedModule } from '../../../shared/core-shared.module';
import { AdminSharedModule } from '../../shared/admin-shared.module';
import { HeaderComponent, SidebarComponent } from '@coreui/angular';
import { AdminModule } from '../../admin.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  stats = [
    { title: 'تعداد کاربران', value: 320, subtitle: 'کاربران فعال' },
    { title: 'سفارشات امروز', value: 87, subtitle: 'در حال پردازش' },
    { title: 'درآمد ماه', value: '۳۲٬۵۰۰٬۰۰۰ تومان', subtitle: 'ماه جاری' },
    { title: 'بازدید وبسایت', value: 4500, subtitle: '24 ساعت اخیر' },
  ];
}
