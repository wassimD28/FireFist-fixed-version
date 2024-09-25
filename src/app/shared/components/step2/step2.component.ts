import { Component, Input } from '@angular/core';
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
  styleUrl: './step2.component.css'
})
export class Step2Component {
  @Input() exercise!: Exercise;

  @Input() categories!: Category[];

  checkBoxesStats = [
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
  ]



  toggleCheckbox(index: number): void {
    const targetedCategory = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach(category => category.checked = false)
    targetedCategory.checked = true;

  }
}
