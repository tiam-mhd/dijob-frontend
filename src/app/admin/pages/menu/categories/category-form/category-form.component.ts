import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminSharedModule } from '../../../../shared/admin-shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [AdminSharedModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  @Input() formTitle: string = 'دسته جدید';
  @Input() category: any = null; // برای ویرایش
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnChanges(): void {
    if (this.category) {
      this.categoryForm.patchValue({
        title: this.category.title,
        description: this.category.description
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const data = {
        ...this.category,
        ...this.categoryForm.value
      };
      this.formSubmit.emit(data);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
