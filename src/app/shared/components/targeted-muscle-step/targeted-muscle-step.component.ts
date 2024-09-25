import { AlertStatus, PressureLevel } from './../../../core/enums/common.enum';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { Muscle } from '../../../core/models/interfaces/muscle.interface';
import { FormsModule } from '@angular/forms';
import { TargetedMuscle } from '../../../core/models/interfaces/targetedMuscle.interface';
import { BodyDiagramComponent } from '../body-diagram/body-diagram.component';
import { BodyDiagram } from '../../../core/models/interfaces/bodyDiagram.interface';
import { CommonModule } from '@angular/common';
import { FirstLetterUppercasePipe } from '../../pipes/firstLetterUppercase/first-letter-uppercase.pipe';
import { Alert } from '../../../core/models/interfaces/common.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-targeted-muscle-step',
  standalone: true,
  imports: [
    FormsModule,
    BodyDiagramComponent,
    CommonModule,
    FirstLetterUppercasePipe,
  ],
  templateUrl: './targeted-muscle-step.component.html',
  styleUrl: './targeted-muscle-step.component.css',
  animations:[
    trigger('targetedMuscleItemAnim',[
      transition(':leave',[
        animate('300ms ease-in-out', style({
          right: -300,
          opacity: 0,
        }))
      ]),
      transition(':enter',[
        style({ opacity: 0, transform: 'scale(0.8)'}),
        animate('200ms ease-in-out', style({
          opacity: 1,
          transform: 'scale(1)',
        }))
      ]),
    ]),
    trigger('EmptyTargetedMuscleList',[
      transition(':enter',[
        style({ opacity: 0, transform: 'transitionY(400)' , height: 0}),
        animate('400ms 300ms ease-in-out', style({
          opacity: 1,
          transform: 'transitionY(0)',
          height: 200
        }))
      ]),

    ])
  ]
})
export class TargetedMuscleStepComponent {
  @Input() exercise!: Exercise;
  @Input() bodyDiagrams!: BodyDiagram[];
  @Input() isChoosingMuscle: boolean = false;
  @Output() isChoosingMuscleChange = new EventEmitter<boolean>();
  @Output() alertChange = new EventEmitter<Alert>();


  public PressureLevel = PressureLevel;
  pressureLevels = Object.values(PressureLevel);
  targetedMuscles: TargetedMuscle[] = [];

  advancedView = false;


  onMuscleSelected(muscle: Muscle): void {
    if (muscle) {
      // make sure that the selected muscle not already exists in the muscle list
      const muscleAlreadyExists = this.targetedMuscles.find(targetedMuscle => targetedMuscle.id === muscle.id);
      if (muscleAlreadyExists) {
        // display alert if muscle is already chosen
        const alert = {
          title: 'Muscle Already Chosen!',
          description: 'This muscle has already been chosen, Please choose another one not in the list.',
          alertStatus: AlertStatus.Warning,
          show: true,
        };
        this.alertChange.emit(alert);
        return;
      }


      let initialPressureLevel: PressureLevel;
      switch (this.targetedMuscles.length) {
        case 0:
          initialPressureLevel = PressureLevel.VeryHigh;
          break;
        case 1:
          initialPressureLevel = PressureLevel.High;
          break;
        case 2:
          initialPressureLevel = PressureLevel.Medium;
          break;
        default:
          initialPressureLevel = PressureLevel.Low;
      }
      this.targetedMuscles.push({
        id: muscle.id,
        name: muscle.name,
        image: muscle.image,
        pressureLevel: initialPressureLevel,
      });
      this.isChoosingMuscle = false;
      this.isChoosingMuscleChange.emit(this.isChoosingMuscle);
    }
  }

  toggleAdvancedView(): void {
    this.advancedView = !this.advancedView;
  }

  removeTargetedMuscle(index: number): void {
    this.targetedMuscles.splice(index, 1);
  }

  chooseMuscle(): void {
    this.isChoosingMuscle = true;
    this.isChoosingMuscleChange.emit(this.isChoosingMuscle);
    this.alertChange.emit({ show: false })
  }

  onIsChoosingMuscleChange(value: boolean): void {
    this.isChoosingMuscle = value;
    this.isChoosingMuscleChange.emit(this.isChoosingMuscle);
  }
}
