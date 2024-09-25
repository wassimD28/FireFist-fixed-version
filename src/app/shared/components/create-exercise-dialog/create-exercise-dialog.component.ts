import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { ExerciseDifficulty } from '../../../core/enums/exerciseDifficulty.enum';
import { ExerciseCategory } from '../../../core/enums/exerciseCategory.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../stepper/stepper.component';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../core/models/interfaces/category.interface';
import { ValueCounterService } from '../../../core/services/valueCounter/value-counter.service';
import { ValueCounter } from '../../../core/models/interfaces/valueCounter.interface';
import { Step3Component } from '../step3/step3.component';
import { TargetedMuscleStepComponent } from '../targeted-muscle-step/targeted-muscle-step.component';
import { Muscle } from '../../../core/models/interfaces/muscle.interface';
import { muscleService } from '../../../core/services/muscle/muscle.service';
import { BodyDiagram } from '../../../core/models/interfaces/bodyDiagram.interface';
import { BodyDiagramService } from '../../../core/services/bodyDiagram/body-diagram.service';
import { AlertBoxComponent } from '../alert-box/alert-box.component';
import { Alert } from '../../../core/models/interfaces/common.interface';
import { AlertStatus } from '../../../core/enums/common.enum';
import { EquipmentStepComponent } from '../equipment-step/equipment-step.component';

@Component({
  selector: 'app-create-exercise-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    StepperComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    TargetedMuscleStepComponent,
    AlertBoxComponent,
    EquipmentStepComponent,
  ],
  templateUrl: './create-exercise-dialog.component.html',
})
export class CreateExerciseDialogComponent implements OnInit {
  // display alert
  alert: Alert = { show: false };
  setAlert(value: Alert) {
    this.alert = value;
  }

  constructor(
    private dialogRef: MatDialogRef<CreateExerciseDialogComponent>,
    private categoryService: CategoryService,
    private valueCounterService: ValueCounterService,
    private muscleService: muscleService,
    private bodyDiagramService: BodyDiagramService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  // data
  categories: Category[] = [];
  valueCounters: ValueCounter[] = [];
  muscles: Muscle[] = [];
  bodyDiagrams: BodyDiagram[] = [];

  ngOnInit(): void {
    const token = this.data.accessToken;
    this.fetchCategories(token);
    this.fetchValueCounters(token);
    this.fetchBodyDiagrams(token);
  }

  fetchBodyDiagrams(token: string): any {
    this.bodyDiagramService.getAllBodyDiagrams(token).subscribe({
      next: (Response) => {
        this.bodyDiagrams = Response;
        console.log('the response of body diagram is : ');
      },
      error: (error) => {
        console.error('Error fetching bodyDiagrams', error);
      },
    });
  }
  fetchCategories(token: string): any {
    this.categoryService.getAllCategories(token).subscribe({
      next: (Response) => {
        this.categories = Response;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      },
    });
  }

  fetchValueCounters(token: string): any {
    this.valueCounterService.getAllValueCounters(token).subscribe({
      next: (Response) => {
        this.valueCounters = Response;
      },
      error: (error) => {
        console.error('Error fetching value counters', error);
      },
    });
  }

  fetchMuscles(token: string): any {
    this.muscleService.getAllMuscles(token).subscribe({
      next: (Response) => {
        this.muscles = Response;
      },
      error: (error) => {
        console.error('Error fetching muscles', error);
      },
    });
  }

  // stepper data
  steps = [
    { id: 1, title: 'name & description & image', completed: false, isCurrent: true },
    {
      id: 2,
      title: 'category',
      completed: false,
      isCurrent: false,
    },
    {
      id: 3,
      title: 'value counter',
      completed: false,
      isCurrent: false,
    },
    { id: 4, title: 'targeted muscles', completed: false, isCurrent: false },
    { id: 5, title: 'equipment', completed: false, isCurrent: false },
  ];
  currentStep = this.steps.find((step) => step.isCurrent == true);

  // new exercise
  exercise: Exercise = {
    id: 0,
    name: '',
    description: '',
    image: '',
    category: ExerciseCategory.Strength,
    difficulty: ExerciseDifficulty.Beginner,
    targetedMuscles: [],
  };

  close() {
    this.dialogRef.close();
  }

  // move to next step
  nextStep() {
    const currentIndex = this.steps.findIndex(
      (step) => step.isCurrent === true,
    );
    if (currentIndex !== -1 && currentIndex < this.steps.length - 1) {
      this.steps[currentIndex].isCurrent = false;
      this.steps[currentIndex + 1].isCurrent = true;
      this.steps[currentIndex].completed = true;
    }
  }
  // move to previous step
  previousStep() {
    const currentIndex = this.steps.findIndex(
      (step) => step.isCurrent === true,
    );
    if (currentIndex !== 0 && currentIndex <= this.steps.length - 1) {
      this.steps[currentIndex].isCurrent = false;
      this.steps[currentIndex - 1].isCurrent = true;
      this.steps[currentIndex].completed = false;
    }
  }
}
