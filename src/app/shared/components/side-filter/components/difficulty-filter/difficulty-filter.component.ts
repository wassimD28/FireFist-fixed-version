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
    {
      Difficulty: ExerciseDifficulty.Beginner,
      description: 'Ideal for those new to exercise, focusing on foundational movements and basic techniques to build confidence and prevent injury.'
    },
    {
      Difficulty: ExerciseDifficulty.Intermediate,
      description: 'Designed for individuals with some exercise experience, incorporating moderate intensity and more complex routines to enhance strength and endurance.'
    },
    {
      Difficulty: ExerciseDifficulty.Advanced,
      description: 'Perfect for seasoned fitness enthusiasts, featuring high-intensity workouts and challenging exercises to push limits and achieve peak performance.'
    }
  ];

}
