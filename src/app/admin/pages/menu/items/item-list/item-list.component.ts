import { Component } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from '../../../../../shared/models/menu-item';
import { MenuItemService } from '../../../../../shared/services/menu-item.service';
import { MenuCategoryService } from '../../../../../shared/services/menu-category.service';
import { MenuCategory } from '../../../../../shared/models/menu-category';
import { GlobalService } from '../../../../../shared/services/global.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  baseUrl = "";

  cafeId = localStorage.getItem("cafeId");

  crudModalTitle = "افزودن آیتم جدید";
  itemForm: FormGroup;

  categories: MenuCategory[] = [] as MenuCategory[]
  items: MenuItem[] = [] as MenuItem[]

  selectedItem: MenuItem = { id: 0 } as MenuItem;
  showForm: boolean = false;

  imageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
    private categoryService: MenuCategoryService,
    private itemService: MenuItemService,
    private globalService: GlobalService) {
    this.baseUrl = globalService.apiUrl;
    this.itemForm = this.fb.group({ title: '', price: 0, categoryId: 0, description: '' } as MenuItem);
    this.loadMenuItems();
    this.loadCategories();
  }

  loadMenuItems() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.itemService.getByCafe(+id).subscribe(res => {
        this.items = (res.data as MenuItem[]).sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
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
    this.imagePreview = null;
    this.imageFile = null;
    this.selectedItem = { id: 0 } as MenuItem;
  }

  saveItem() {
    const formData = new FormData();

    let data = {
      title: this.selectedItem.title,
      price: +this.selectedItem.price,
      description: this.selectedItem.description,
      image: '',
      cafeId: (this.cafeId) ? +this.cafeId : 0,
      categoryId: +this.selectedItem.categoryId
    } as MenuItem

    formData.append('title', this.selectedItem.title);
    formData.append('price', this.selectedItem.price.toString());
    formData.append('description', this.selectedItem.description);
    formData.append('cafeId', (this.cafeId) ? this.cafeId.toString() : "0");
    formData.append('categoryId', this.selectedItem.categoryId.toString());

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (this.selectedItem.id != 0) {
      this.itemService.update(this.selectedItem.id, formData).subscribe(() => this.loadMenuItems());
    } else {
      this.itemService.create(formData).subscribe(() => this.loadMenuItems());
    }
    this.closeModal("crudModal")
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
