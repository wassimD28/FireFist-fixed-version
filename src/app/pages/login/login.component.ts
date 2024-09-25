import { LoginResponse, User } from '../../core/models/interfaces/common.interface';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService,]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const user: User = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.router.navigate(['/secure/exercises']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error logging in', error);
        if (error.error && error.error.errors) {
          console.error('Backend error details:', error.error.errors);
        }
      }
    );
  }

}
