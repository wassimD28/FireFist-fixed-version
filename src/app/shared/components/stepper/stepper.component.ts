import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Step } from '../../../core/models/interfaces/common.interface';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  @Input() steps!: Step[];

  goToStep(index : number){
    // loop on all steps and to set the 'isCurrent' to false
    this.steps.forEach((step : Step) =>{
      step.isCurrent = false;
    })
    // loop forwards to set the 'completed' property to false
    for(let i = index; i < this.steps.length; i++){
      this.steps[i].completed = false;
    }
    // loop backwards to set the 'completed' property to true
    for(let i = index-1; i >= 0; i--){
      this.steps[i].completed = true;
    }
    // set the pressed step to be the current step
    this.steps[index].isCurrent = true;
  }
}
