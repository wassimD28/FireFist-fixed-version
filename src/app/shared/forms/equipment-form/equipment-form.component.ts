import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { EquipmentService } from '../../../core/services/equipment/equipment.service';
import { AuthService } from '../../../core/services/auth/auth.service';
@Component({
  selector: 'app-equipment-form',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './equipment-form.component.html',
})
export class EquipmentFormComponent {
  // icons
  faFloppyDisk = faFloppyDisk;


  form: FormGroup;

  selectedImage: File | null = null;

  // to make refresh in the custom equipment list automatically when new equipment added
  @Output() refreshListChange : EventEmitter<void> = new EventEmitter<void>();
  // to close the create panel automatically after the new equipment added
  @Output() showCreatePanelChange : EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private equipmentService: EquipmentService,
    private authService: AuthService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      description: new FormControl('', [Validators.maxLength(300)]),

      image: new FormControl(null, Validators.required),
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      console.error('Form is invalid:', this.form.errors);
      return;
    }

    const formData = new FormData();
    const user_id = this.authService.getUserId();
    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    if (user_id){
      formData.append('user_id', user_id );
    }

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    const token = this.authService.getAccessToken();
    this.equipmentService
      .createEquipment(formData, token ?? undefined)
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          this.refreshListChange.emit();
          this.showCreatePanelChange.emit();
        },
        error: (error) => {
          console.error('Upload failed', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        },
      });
  }
}
