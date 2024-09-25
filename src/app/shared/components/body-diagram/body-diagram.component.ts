import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuscleToolTipComponent } from '../muscle-tool-tip/muscle-tool-tip.component';
import { BodyDiagram } from '../../../core/models/interfaces/bodyDiagram.interface';
import { AlertStatus, ViewAngle, ViewMode } from '../../../core/enums/common.enum';
import { Muscle } from '../../../core/models/interfaces/muscle.interface';
import { Alert } from '../../../core/models/interfaces/common.interface';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-body-diagram',
  standalone: true,
  imports: [CommonModule, MuscleToolTipComponent],
  templateUrl: './body-diagram.component.html',
  styleUrl: './body-diagram.component.css',
  animations:[
    trigger('flipAnimation', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front => back', [
        animate('100ms ease-in-out')
      ]),
      transition('back => front', [
        animate('100ms ease-in-out')
      ])
    ])
  ]
})
export class BodyDiagramComponent implements OnChanges {
  @Input() bodyDiagrams!: BodyDiagram[];
  @Input() advancedView!: boolean;
  @Output() selectedMuscle = new EventEmitter<Muscle>();
  @Input() isChoosingMuscle: boolean = false;
  @Output() isChoosingMuscleChange = new EventEmitter<boolean>();
  alert : Alert = {
    title : '',
    description : '',
    alertStatus : AlertStatus.None,
    show : false
  }

  @Output() alertChange = new EventEmitter<Alert>();

  viewMode: ViewMode = ViewMode.Simple;
  viewAngle: ViewAngle = ViewAngle.Front;
  currentBody: BodyDiagram | undefined;

  muscleToShow: Muscle | undefined;
  muscleHovered = false;
  mouseX: number = 0;
  mouseY: number = 0;

  public ViewAngle = ViewAngle;
  public ViewMode = ViewMode;

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['advancedView'] && changes['advancedView'].currentValue !== undefined) {
      this.viewMode = this.advancedView ? ViewMode.Advanced : ViewMode.Simple;
    }

    if (changes['isChoosingMuscle'] && !changes['isChoosingMuscle'].firstChange) {
      this.isChoosingMuscle = changes['isChoosingMuscle'].currentValue;
    }

    if (changes['bodyDiagrams'] && changes['bodyDiagrams'].currentValue) {
      this.bodyDiagrams = changes['bodyDiagrams'].currentValue || [];
    }

    this.currentBody = this.getBodyDiagram(this.viewMode, this.viewAngle);
  }

  onMousemove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  chooseTargetedMuscle(index: number): void {
    if (this.isChoosingMuscle) {
      const selectedMuscle = this.currentBody?.muscles[index];
      this.selectedMuscle.emit(selectedMuscle);
      this.isChoosingMuscle = false;
      this.isChoosingMuscleChange.emit(this.isChoosingMuscle);
      this.alert = {
        title: 'Please select',
        description: 'none',
        alertStatus: AlertStatus.None,
        show: false,
      }
      this.alertChange.emit(this.alert);
    }
  }

  muscleOnMouseover(index: number): void {
    const targetedMuscle = this.currentBody?.muscles[index];
    if (targetedMuscle?.paths) {
      targetedMuscle.paths.forEach((path) => {
        path.selected = true;
      });
    }

    this.muscleToShow = targetedMuscle;
    this.muscleHovered = true;
  }

  muscleOnMouseout(index: number): void {
    const targetedMuscle = this.currentBody?.muscles[index];
    if (targetedMuscle?.paths) {
      targetedMuscle.paths.forEach((path) => {
        path.selected = false;
      });
    }

    this.muscleHovered = false;
  }

  toggleViewAngle(): void {
    this.viewAngle =
      this.viewAngle === ViewAngle.Front ? ViewAngle.Back : ViewAngle.Front;
    this.currentBody = this.getBodyDiagram(this.viewMode, this.viewAngle);
    if (!this.currentBody) {
      console.error('No matching body diagram found!');
    }
  }

  getBodyDiagram(
    viewMode: ViewMode,
    viewAngle: ViewAngle,
  ): BodyDiagram | undefined {
    if (!this.bodyDiagrams || this.bodyDiagrams.length === 0) {
      return undefined;
    }

    return this.bodyDiagrams.find(
      (bodyDiagram) =>
        bodyDiagram.viewMode === viewMode &&
        bodyDiagram.viewAngle === viewAngle,
    );
  }
}
