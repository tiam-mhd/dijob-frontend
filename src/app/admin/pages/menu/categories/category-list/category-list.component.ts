import { Component } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  crudModalTitle = "افزودن دسته جدید";
  categoryForm: FormGroup;

  categories = [
    { id: 1, title: 'نوشیدنی‌ها', description: 'انواع چای، قهوه، نوشابه و آبمیوه' },
    { id: 2, title: 'غذاهای اصلی', description: 'پیتزا، برگر، پاستا و کباب' },
    { id: 3, title: 'پیش‌غذا', description: 'سوپ، سالاد، سیب‌زمینی' },
    { id: 4, title: 'دسر', description: 'کیک، بستنی، شیرینی' }
  ];

  selectedCategory: any = {title: '', description: ''};
  showForm: boolean = false;

  constructor(private fb: FormBuilder){
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  openCreateForm() {
    this.selectedCategory = null;
    this.showForm = true;
  }

  openEditForm(category: any) {
    this.selectedCategory = category;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedCategory = null;
  }

  onSubmitCrud(){

  }

  saveCategory(data: any) {
    if (data.id) {
      // ویرایش
      const index = this.categories.findIndex(c => c.id === data.id);
      if (index > -1) this.categories[index] = data;
    } else {
      // ایجاد جدید
      const newId = Math.max(...this.categories.map(c => c.id)) + 1;
      this.categories.push({ id: newId, ...data });
    }
    this.closeForm();
  }
}
