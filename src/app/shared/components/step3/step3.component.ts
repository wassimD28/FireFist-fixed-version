import { AuthService } from './../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';
import { ValueCounter } from '../../../core/models/interfaces/valueCounter.interface';
import { ValueCounterService } from '../../../core/services/valueCounter/value-counter.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.css'
})
export class Step3Component implements OnInit {
  @Input() exercise!: Exercise;

  // variables
  valueCounters: ValueCounter[] = [];

  // injection
  private authService = inject(AuthService)
  private valueCounterService = inject(ValueCounterService)


  ngOnInit(): void {
    const token = this.authService.getAccessToken() ?? "";
    this.fetchValueCounters(token)
  }


  checkBoxesStats = [
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ]
  isFormValid(): boolean {
    let checkedBoxesCounter = 0;
    this.checkBoxesStats.forEach((checkbox) =>{
      if (checkbox.checked) {
        checkedBoxesCounter++;
      }
    })
    if (checkedBoxesCounter === 1){
      return true;
    }
    return false;
  }



  toggleCheckbox(index: number): void {
    const targetedValueCounter = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach(valueCounter => valueCounter.checked = false)
    targetedValueCounter.checked = true;

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
}
