import { Component, Input } from '@angular/core';
import { Category } from '../../../core/models/interfaces/category.interface';
import { ExerciseCategory } from '../../../core/enums/exerciseCategory.enum';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { DifficultyFilterComponent } from './components/difficulty-filter/difficulty-filter.component';
import { TargetedMusclesFilterComponent } from './components/targeted-muscles-filter/targeted-muscles-filter.component';

@Component({
  selector: 'side-filter',
  standalone: true,
  imports: [CategoryFilterComponent,DifficultyFilterComponent,TargetedMusclesFilterComponent],
  templateUrl: './side-filter.component.html',
})
export class SideFilterComponent {
}
