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
  crudModalTitle = "افزودن دسته جدید";
  categoryForm: FormGroup;

  categories: MenuCategory[] = [];
  selectedCategory: MenuCategory = { id: 0 } as MenuCategory;

  showForm: boolean = false;

  constructor(private fb: FormBuilder, private categoryService: MenuCategoryService) {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
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

  saveCategory(category: MenuCategory) {
    if (category.id) {
      this.categoryService.update(category.id, category).subscribe(() => this.loadCategories());
    } else {
      this.categoryService.create(category).subscribe(() => this.loadCategories());
    }
    this.showForm = false;
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(() => this.loadCategories());
  }
  
  openCreateForm() {
    this.selectedCategory = { id: 0 } as MenuCategory;
    this.showForm = true;
  }

  openEditForm(category: any) {
    this.selectedCategory = category;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedCategory =  { id: 0 } as MenuCategory;
  }

  onSubmitCrud() {

  }

}
