import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Difficulty } from '../../../core/models/interfaces/difficulty.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DifficultyService } from '../../../core/services/difficultyLevel/difficulty-level.service';

@Component({
  selector: 'app-difficulty-level-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './difficulty-level-step.component.html',
  styleUrl: './difficulty-level-step.component.css'
})
export class DifficultyLevelStepComponent implements OnInit{
  //! Variables
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
  const token = this.AuthService.getAccessToken() ?? "";
  this.fetchDifficulties(token);
}
  //! Functions
  toggleCheckbox(index: number): void {
    const targetedCategory = this.checkBoxesStats[index];
    this.checkBoxesStats.forEach((category) => (category.checked = false));
    targetedCategory.checked = true;
  }

  fetchDifficulties(token: string){
    this.DifficultyService.getAllDifficulties(token).subscribe({
      next: (Response) => {
        this.difficulties = Response;
      },
      error: (error) => {
        console.error('Error fetching difficulties', error);
      },
    })
  }
}
