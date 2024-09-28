import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Exercise } from '../../../core/models/interfaces/exercise.interface';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})
export class Step1Component implements OnInit{
  //! Variables
  @Input() exercise! : Exercise;
  form!: FormGroup;
  //! Dependency injection
  private formBuilder = inject(FormBuilder);
  //! Lifecycle hooks
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [ Validators.maxLength(500)]],
      image: [null, []]
    })
  }
  //! Functions
  // handle image upload
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
    }
  }
  // from validation
  isFormValid(): boolean {
    if (this.form.valid) {
      return true;
    }else {
      return false;
    }
  }

  // handle form submission
  onSubmit() {
    if (this.form.invalid){
      console.error('Form is invalid:', this.form.errors);
      return;
    }
    console.log('form submission', this.form);
  }
}
