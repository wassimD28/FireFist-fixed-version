import { Component } from '@angular/core';
import { Difficulty } from '../../../../../core/models/interfaces/difficulty.interface';
import { ExerciseDifficulty } from '../../../../../core/enums/exerciseDifficulty.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-difficulty-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './difficulty-filter.component.html',
})
export class DifficultyFilterComponent {
  allDifficulties : boolean = true;


  difficulties: Difficulty[] = [
    
  ];

}
