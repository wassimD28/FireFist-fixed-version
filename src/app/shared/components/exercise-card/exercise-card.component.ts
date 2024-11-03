import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisV,
  faTrashAlt,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { ExerciseDifficulty } from '../../../core/enums/exerciseDifficulty.enum';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../../core/services/exercise/exercise.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-exercise-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './exercise-card.component.html',
})
export class ExerciseCardComponent {
  //! Variables
  // font awesome icons
  faEllipsisV = faEllipsisV;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  @Output() exerciseDeleted = new EventEmitter();

  exerciseDifficulty = ExerciseDifficulty;

  @Input() exercise!: Exercise;
  isMenuOpen = false;
  //! Dependency injection
  private exerciseService = inject(ExerciseService);
  private authService = inject(AuthService);

  //! Functions
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  deleteExercise(id: number) {
    const token = this.authService.getAccessToken();
    this.exerciseService.deleteExercise(id, token ?? undefined).subscribe({
      next: (res) => {
        console.log('Exercise deleted successfully');
        // remove exercise from the list
        this.exerciseDeleted.emit(id);
        this.isMenuOpen = false;
      },
      error: (error) => {
        console.error('Error deleting exercise:', error);
      },
    });
  }
}
