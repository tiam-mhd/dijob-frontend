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

  crudModalTitle = "افزودن دسته جدید";
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

  openCreateForm() {
    this.selectedItem = { id: 0 } as MenuItem;
    this.showForm = true;
  }

  openEditForm(category: any) {
    this.selectedItem = category;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedItem = { id: 0 } as MenuItem;
  }

  onSubmitCrud() {

  }

  saveCategory() {
    let data: MenuItem = {...this.selectedItem};
    data.categoryId = +data.categoryId;
    if(this.cafeId) data.cafeId = +this.cafeId;
    data.price = +data.price;
    data.image = '';
    if (data.id != 0) {
      this.itemService.update(data.id, data).subscribe(() => this.loadCategories());
    } else {
      data = {
        title: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        cafeId: data.cafeId,
        categoryId: data.categoryId
      } as MenuItem
      this.itemService.create(data).subscribe(() => this.loadMenuItems());
    }
  }
}
