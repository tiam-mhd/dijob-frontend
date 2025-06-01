import { Component } from '@angular/core';
import { CustomerSharedModule } from '../../../shared/customer-shared.module';
import { MenuCategory } from '../../../../shared/models/menu-category';
import { FormBuilder } from '@angular/forms';
import { MenuCategoryService } from '../../../../shared/services/menu-category.service';
import { MenuItemService } from '../../../../shared/services/menu-item.service';
import { MenuItem } from '../../../../shared/models/menu-item';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CustomerSharedModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  quantity=0
  cafeId = 1;
  categories: MenuCategory[] = [] as MenuCategory[]
  items: MenuItem[] = [] as MenuItem[]

  selectedCategory: MenuCategory = { id: 0 } as MenuCategory;
  selectedItem: MenuItem = { id: 0 } as MenuItem;

  constructor(private categoryService: MenuCategoryService,private itemService: MenuItemService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.categoryService.getByCafe(+id).subscribe(res => {
        this.categories = res.data as MenuCategory[];
        this.selectedCategory = this.categories[0];
        this.loadItems(this.categories[0].id);
      });
    }
  }
  
  loadItems(id:number) {
    // let id = localStorage.getItem("cafeId");
    if (id) {
      this.itemService.getByCategory(+id).subscribe(res => {
        this.items = res.data as MenuItem[];
      });
    }
  }

  selectItem(item:MenuItem){
    this.quantity =0;
    this.selectedItem = item;
  }

  clearSelectedCategory() {
    this.selectedCategory = { id: 0 } as MenuCategory;
  }

  closeModal(modalName: string) {
    modalName = modalName + "Close";
    const modalElement = document.getElementById(modalName) as HTMLElement;
    modalElement.click();
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
