import { CategoryService } from './../../../core/services/category/category.service';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { Category } from '../../../core/models/interfaces/category.interface';
import { ExerciseCategory } from '../../../core/enums/exerciseCategory.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css',
})
export class Step2Component implements OnInit {
  //! variables
  @Input() exercise!: Exercise;
  categories: Category[] = [];
  checkBoxesStats = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
  ];

  //! injections
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
