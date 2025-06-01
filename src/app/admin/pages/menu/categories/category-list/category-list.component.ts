import { Component, OnInit } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuCategoryService } from '../../../../../shared/services/menu-category.service';
import { MenuCategory } from '../../../../../shared/models/menu-category';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  cafeId = localStorage.getItem("cafeId");

  crudModalTitle = "افزودن دسته جدید";
  itemForm: FormGroup;

  categories: MenuCategory[] = [] as MenuCategory[]

  selectedCategory: MenuCategory = { id: 0 } as MenuCategory;

  constructor(private fb: FormBuilder, private categoryService: MenuCategoryService) {
    this.itemForm = this.fb.group({ title: '' } as MenuCategory);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    let id = localStorage.getItem("cafeId");
    if (id) {
      this.categoryService.getByCafe(+id).subscribe(res => {
        this.categories = res.data as MenuCategory[];
      });
    }
  }

  clearSelectedCategory() {
    this.selectedCategory = { id: 0 } as MenuCategory;
  }

  saveCategory() {
    let data = {
      title: this.selectedCategory.title,
      cafeId: (this.cafeId) ? +this.cafeId : 0
    } as MenuCategory

    if (this.selectedCategory.id != 0) {
      this.categoryService.update(this.selectedCategory.id, data).subscribe(() => this.loadCategories());
    } else {
      this.categoryService.create(data).subscribe(() => this.loadCategories());
    }
    this.closeModal("crudModal")
  }

  delete() {
    this.categoryService.delete(this.selectedCategory.id).subscribe(() => this.loadCategories());
    this.closeModal("deleteModal")
    this.clearSelectedCategory();
  }

  closeModal(modalName: string) {
    modalName = modalName + "Close";
    const modalElement = document.getElementById(modalName) as HTMLElement;
    modalElement.click();
  }
}
