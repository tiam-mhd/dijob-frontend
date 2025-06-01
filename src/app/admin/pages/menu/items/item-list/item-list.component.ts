import { Component } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from '../../../../../shared/models/menu-item';
import { MenuItemService } from '../../../../../shared/services/menu-item.service';
import { MenuCategoryService } from '../../../../../shared/services/menu-category.service';
import { MenuCategory } from '../../../../../shared/models/menu-category';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  cafeId = localStorage.getItem("cafeId");

  crudModalTitle = "افزودن آیتم جدید";
  itemForm: FormGroup;

  categories: MenuCategory[] = [] as MenuCategory[]
  items: MenuItem[] = [] as MenuItem[]

  selectedItem: MenuItem = { id: 0 } as MenuItem;
  showForm: boolean = false;

  constructor(private fb: FormBuilder, private categoryService: MenuCategoryService, private itemService: MenuItemService) {

    this.itemForm = this.fb.group({ title: '', price: 0, categoryId: 0, description: '' } as MenuItem);
    this.loadMenuItems();
    this.loadCategories();
  }

  loadMenuItems() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.itemService.getByCafe(+id).subscribe(res => {
        this.items = res.data as MenuItem[];
        console.log(this.items);
      });
    }
  }

  loadCategories() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.categoryService.getByCafe(+id).subscribe(res => {
        this.categories = res.data as MenuCategory[];
      });
    }
  }

  clearSelectedItem() {
    this.selectedItem = { id: 0 } as MenuItem;
  }

  saveItem() {
    let data = {
      title: this.selectedItem.title,
      price: +this.selectedItem.price,
      description: this.selectedItem.description,
      image: '',
      cafeId: (this.cafeId) ? +this.cafeId : 0,
      categoryId: +this.selectedItem.categoryId
    } as MenuItem

    if (this.selectedItem.id != 0) {
      this.itemService.update(this.selectedItem.id, data).subscribe(() => this.loadCategories());
    } else {
      this.itemService.create(data).subscribe(() => this.loadMenuItems());
    }
    this.closeModal("crudModal")
  }

  delete() {
    this.itemService.delete(this.selectedItem.id).subscribe(() => this.loadMenuItems());
    this.closeModal("deleteModal")
    this.clearSelectedItem();
  }

  closeModal(modalName: string) {
    modalName = modalName + "Close";
    const modalElement = document.getElementById(modalName) as HTMLElement;
    modalElement.click();
  }
}
