import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { ValueCounter } from '../../../core/models/interfaces/valueCounter.interface';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component {
  @Input() exercise!: Exercise;

  @Input() valueCounters!: ValueCounter[];

  checkBoxesStats = [
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ]



  toggleCheckbox(index: number): void {
    const targetedValueCounter = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach(valueCounter => valueCounter.checked = false)
    targetedValueCounter.checked = true;

  }
}
