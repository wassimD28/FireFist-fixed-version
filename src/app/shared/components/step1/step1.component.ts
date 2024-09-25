import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component {
  @Input() exercise! : Exercise;
}
