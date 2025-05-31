import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

const routes: Routes = [{
    path: '',
    component: MenuComponent,
    children: [
      { path: '', component: ItemListComponent },
      { path: 'category', component: CategoryListComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
