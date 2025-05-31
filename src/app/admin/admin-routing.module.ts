import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu', loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule) },
      // { path: 'addresses', loadChildren: () => import('./pages/addresses/addresses.module').then(m => m.AddressesModule) },
      // منو و دیگر صفحات به صورت lazy load اضافه می‌شن
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
