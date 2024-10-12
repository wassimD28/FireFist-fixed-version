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
  styleUrl: './step3.component.css',
})
export class Step3Component implements OnInit {
  //! variables
  @Input() formData!: FormData;

  valueCounters: ValueCounter[] = [];
  checkBoxesStats = [
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
    { checked: false },
  ];
  //! Dependency injection
  private authService = inject(AuthService);
  private valueCounterService = inject(ValueCounterService);

  //! Lifecycle hooks
  ngOnInit(): void {
    const token = this.authService.getAccessToken() ?? '';
    this.fetchValueCounters(token);
  }

  //! Function

  // collect formData
  collectFormData() {
    if (!this.isFormValid()) {
      console.error('Form is invalid');
      return;
    }
    const selectedIndex = this.checkBoxesStats.findIndex(
      (checkBox) => checkBox.checked,
    );
    const selectedValueCounterId = this.valueCounters[selectedIndex].id;
    this.formData.append('valueCounter_id', selectedValueCounterId.toString());
  }
  // reset formData when go back to the previous step
  resetFormData() {
    this.formData.delete('valueCounter_id');
  }
  isFormValid(): boolean {
    let checkedBoxesCounter = 0;
    this.checkBoxesStats.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedBoxesCounter++;
      }
    });
    if (checkedBoxesCounter === 1) {
      return true;
    }
    return false;
  }

  toggleCheckbox(index: number): void {
    const targetedValueCounter = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach(
      (valueCounter) => (valueCounter.checked = false),
    );
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
