import { Component, Input } from '@angular/core';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ExerciseDifficulty } from '../../../core/enums/exerciseDifficulty.enum';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [FontAwesomeModule,],
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {
  // font awesome icons
  faEllipsisV = faEllipsisV

  exerciseDifficulty = ExerciseDifficulty;

  @Input() exercise! : Exercise
}
