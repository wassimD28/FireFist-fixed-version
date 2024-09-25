import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PasswordValidation } from '../../shared/validations/password.validation';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/interfaces/common.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  // fontAwesome icons
  faCheck = faCheck;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        PasswordValidation.passwordLowerCase(2),
        PasswordValidation.passwordUpperCase(2),
        PasswordValidation.passwordSpecialChar(2),
        PasswordValidation.passwordDigit(2)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    }, { validators: PasswordValidation.passwordsMatch });
  }


  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formData = this.registerForm.value;
    const user: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    console.log(user);
    this.authService.register(user).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error registering', error);
        if (error.error && error.error.errors) {
          console.error('Backend error details:', error.error.errors);
        }
      }
    );
  }
}
