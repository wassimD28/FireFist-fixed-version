import { Step2Component } from './../step2/step2.component';
import {
  AfterViewInit,
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
import { Alert, Step } from '../../../core/models/interfaces/common.interface';
import { EquipmentStepComponent } from '../equipment-step/equipment-step.component';
import { DifficultyLevelStepComponent } from '../difficulty-level-step/difficulty-level-step.component';

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
    DifficultyLevelStepComponent,
  ],
  templateUrl: './create-exercise-dialog.component.html',
})
export class CreateExerciseDialogComponent implements OnInit , AfterViewInit{
  //! Variables
  // create exercise components
  @ViewChild(Step1Component) step1!: Step1Component;
  @ViewChild(Step2Component) step2!: Step2Component;
  @ViewChild(Step3Component) step3!: Step3Component;
  @ViewChild(TargetedMuscleStepComponent)
  targetedMuscleStep!: TargetedMuscleStepComponent;
  @ViewChild(EquipmentStepComponent) equipmentStep!: EquipmentStepComponent;
  @ViewChild(DifficultyLevelStepComponent)
  difficultyLevelStep!: DifficultyLevelStepComponent;
  // component step array
  stepComponents: any[] = [];
  // stepper data
  steps: Step[] = [
    {
      id: 1,
      title: 'name & description & image',
      completed: false,
      isCurrent: true,
      component: this.step1,
    },
    {
      id: 2,
      title: 'category',
      completed: false,
      isCurrent: false,
      component: this.step2,
    },
    {
      id: 3,
      title: 'value counter',
      completed: false,
      isCurrent: false,
      component: this.step3,
    },
    {
      id: 4,
      title: 'targeted muscles',
      completed: false,
      isCurrent: false,
      component: this.targetedMuscleStep,
    },
    {
      id: 5,
      title: 'equipment',
      completed: false,
      isCurrent: false,
      component: this.equipmentStep,
    },
    {
      id: 6,
      title: 'difficulty level',
      completed: false,
      isCurrent: false,
      component: this.difficultyLevelStep,
    },
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
  bodyDiagrams: BodyDiagram[] = [];
  // display alert
  alert: Alert = { show: false };

  //! Dependency Injections
  constructor(
    private dialogRef: MatDialogRef<CreateExerciseDialogComponent>,
    private bodyDiagramService: BodyDiagramService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  //! Lifecycle hooks
  ngOnInit(): void {
    const token = this.data.accessToken;
    this.fetchBodyDiagrams(token);
  }
  ngAfterViewInit(): void {
    this.stepComponents = [
      this.step1,
      this.step2,
      this.step3,
      this.targetedMuscleStep,
      this.equipmentStep,
      this.difficultyLevelStep,
    ]
  }
  //! Functions
  setAlert(value: Alert) {
    this.alert = value;
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
  // close pop up create exercise widow
  close() {
    this.dialogRef.close();
  }

  // move to next step
  nextStep() {
    const currentIndex = this.steps.findIndex(
      (step) => step.isCurrent === true,
    );
    // if the form is valid in the current step
    //? this is test
    if (this.stepComponents[currentIndex].isFormValid()) {
      console.log(
        'form is valid :' + this.stepComponents[currentIndex].isFormValid(),
      );
    } else if (!this.stepComponents[currentIndex].isFormValid()) {
      console.log(
        'form is invalid :' + this.stepComponents[currentIndex].isFormValid(),
      );
    }
    //? this is test 
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
