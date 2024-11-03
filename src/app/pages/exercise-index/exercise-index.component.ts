import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { SideFilterComponent } from '../../shared/components/side-filter/side-filter.component';
import { Exercise } from '../../core/models/interfaces/exercise.interface';
import { ExerciseCardComponent } from '../../shared/components/exercise-card/exercise-card.component';
import { PrivacyComponent } from '../../shared/components/privacy/privacy.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateExerciseDialogComponent } from '../../shared/components/create-exercise-dialog/create-exercise-dialog.component';
import { ExerciseService } from '../../core/services/exercise/exercise.service';

@Component({
  selector: 'app-exercise-index',
  standalone: true,
  imports: [SideFilterComponent, ExerciseCardComponent, PrivacyComponent, MatDialogModule, CreateExerciseDialogComponent],
  templateUrl: './exercise-index.component.html',
})
export class ExerciseIndexComponent implements OnInit {
  //! Variables

exercises: Exercise[] = [];

  //! Dependency injections
  constructor(
    private dialog: MatDialog,
    private exerciseService : ExerciseService,
    private authService: AuthService  // Inject the AuthService to access the user's access token
  ) { }
  //! Lifecycle hooks
  ngOnInit(): void {
    this.fetchExercises();
  }

  //! Functions
  openDialog() {
    const dialogRef = this.dialog.open(CreateExerciseDialogComponent, {
      width: '600px',
      height: '550px',
      disableClose: true,
      data: {
        accessToken: this.authService.getAccessToken(),
      }
    });

    // Listen for the exerciseCreated event
    dialogRef.componentInstance.exerciseCreated.subscribe(() => {
      this.fetchExercises(); // Refresh the exercise list when an exercise is created
    });
  }

  deleteExerciseFromList(value : number){
    const deletedExerciseIndex = this.exercises.findIndex(exercise => exercise.id === value)
    if(deletedExerciseIndex > -1){
      this.exercises.splice(deletedExerciseIndex, 1)
    }
  }



  fetchExercises(){
    const token = this.authService.getAccessToken();
    const user_id = this.authService.getUserId()
    this.exerciseService.getAllExercises(user_id ?? undefined, token??undefined).subscribe({
      next: response =>{
        this.exercises = response
      },
      error: error => {
        console.log("Error fetching exercises : "+error)
      }
    })
  }
}
