import { ViewMode } from './../../../core/enums/common.enum';
import { Component, Input } from '@angular/core';
import { Muscle } from '../../../core/models/interfaces/muscle.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-muscle-tool-tip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './muscle-tool-tip.component.html',
  styleUrl: './muscle-tool-tip.component.css',
})
export class MuscleToolTipComponent {
  @Input() muscle!: Muscle | undefined;
  @Input() mouseX!: number;
  @Input() mouseY!: number;
  @Input() muscleHovered!: boolean;

  public ViewMode = ViewMode;
  getPathViewMode(): string | undefined {
    if (this.muscle?.paths) {
      return this.muscle?.paths[0].viewMode;
    }
    return undefined;
  }
}
