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
  form!: FormGroup;
  @Input() formData!: FormData;
  selectedImage: File | null = null;
  //! Dependency injection
  private formBuilder = inject(FormBuilder);
  //! Lifecycle hooks
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [ Validators.maxLength(500)]],
      image: [null, [Validators.required]]
    })
  }
  //! Functions
  // from validation
  isFormValid(): boolean {
    if (this.form.valid) {
      return true;
    }else {
      return false;
    }
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  // collect formData
  collectFormData() {
    if (!this.isFormValid()){
      console.error('Form is invalid:', this.form.errors);
      return;
    }
    this.formData.append('name', this.form.get('name')?.value);
    this.formData.append('description', this.form.get('description')?.value);
    // Append file
    if (this.selectedImage) {
      this.formData.append('image', this.selectedImage, this.selectedImage.name);
    }
  }
  // reset formData when go back to the previous step
  resetFormData() {
    this.formData.delete('name');
    this.formData.delete('description');
    this.formData.delete('image');
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
