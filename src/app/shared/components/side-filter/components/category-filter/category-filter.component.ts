import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../core/models/interfaces/category.interface';
import { CategoryService } from '../../../../../core/services/category/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './category-filter.component.html',
  providers: [CategoryService]
})
export class CategoryFilterComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  categories: Category[] = []

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }
}
