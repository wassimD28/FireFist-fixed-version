import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Difficulty } from '../../../core/models/interfaces/difficulty.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DifficultyService } from '../../../core/services/difficultyLevel/difficulty-level.service';

@Component({
  selector: 'app-difficulty-level-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './difficulty-level-step.component.html',
  styleUrl: './difficulty-level-step.component.css',
})
export class DifficultyLevelStepComponent implements OnInit {
  //! Variables
  @Input() formData!: FormData;
  difficulties: Difficulty[] = [];
  checkBoxesStats = [
    { checked: false },
    { checked: false },
    { checked: false },
  ];
  //! Dependency Injection
  private AuthService = inject(AuthService);
  private DifficultyService = inject(DifficultyService);
  //! Lifecycle hooks
  ngOnInit(): void {
    const token = this.AuthService.getAccessToken() ?? '';
    this.fetchDifficulties(token);
  }
  //! Functions
  collectFormData() {
    if (!this.isFormValid()) {
      console.error('Form is invalid');
      return;
    }
    const selectedIndex = this.checkBoxesStats.findIndex(
      (checkBox) => checkBox.checked,
    );
    console.log('difficulty selected index : ' + selectedIndex)
    console.log('difficulty selected id : ' + this.difficulties[selectedIndex].id)
    console.log('difficulty selected index name : ' + this.difficulties[selectedIndex].name)
    const selectedDifficultyId = this.difficulties[selectedIndex].id;
    this.formData.append('difficulty_id', selectedDifficultyId.toString());
  }

  // reset formData when go back to the previous step
  resetFormData() {
    this.formData.delete('difficulty_id');
  }
  toggleCheckbox(index: number): void {
    const targetedCategory = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach((category) => (category.checked = false));
    targetedCategory.checked = true;
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

  fetchDifficulties(token: string) {
    this.DifficultyService.getAllDifficulties(token).subscribe({
      next: (Response) => {
        this.difficulties = Response;
      },
      error: (error) => {
        console.error('Error fetching difficulties', error);
      },
    });
  }
}
