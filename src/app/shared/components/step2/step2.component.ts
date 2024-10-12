import { CategoryService } from './../../../core/services/category/category.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { Category } from '../../../core/models/interfaces/category.interface';
import { ExerciseCategory } from '../../../core/enums/exerciseCategory.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component implements OnInit {
  //! variables
  @Input() formData!: FormData;
  categories: Category[] = [];
  checkBoxesStats = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
  ];

  //! Dependency Injections
  private AuthService = inject(AuthService);
  private CategoryService = inject(CategoryService);
  //! NG live cycle hooks
  ngOnInit(): void {
    const token = this.AuthService.getAccessToken() ?? '';
    this.fetchCategories(token);
  }

  //! functions

  toggleCheckbox(index: number): void {
    const targetedCategory = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach((category) => (category.checked = false));
    targetedCategory.checked = true;
  }

  // collect formData
  collectFormData() {
    if (!this.isFormValid()) {
      console.error('Form is invalid');
      return;
    }
    const selectedIndex = this.checkBoxesStats.findIndex(
      (checkBox) => checkBox.checked,
    );
    const selectedCategoryId = this.categories[selectedIndex].id;
    this.formData.append('category_id', selectedCategoryId.toString());
  }

  // reset formData when go back to the previous step
  resetFormData() {
    this.formData.delete('category_id');
  }

  isFormValid(): boolean {
    let checkedBoxesCounter = 0;
    this.checkBoxesStats.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedBoxesCounter++;
      }
    });
    if (checkedBoxesCounter === 1) {
      return true;
    }
    return false;
  }

  fetchCategories(token: string): any {
    this.CategoryService.getAllCategories(token).subscribe({
      next: (Response) => {
        this.categories = Response;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }
}
