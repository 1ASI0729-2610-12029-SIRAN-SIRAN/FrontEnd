import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppStore} from '../../../application/iam.store';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

/**
 * Provides user interface and logic for account login
 */
@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder,
              private appStore: AppStore,
              private router: Router){}

  /**
   * Initializes reactive form with default values and validations rules
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  /**
   * Handles form submission to validate credentials of user
   * And redirect to home
   */
  onSubmit(): void {
    if (this.loginForm.invalid){
      console.log(`${this.loginForm.value.email} is invalid`);
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = null;
    const { email, password } = this.loginForm.value;

    this.appStore.login(email, password).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/home']);
        } else {
          /**
           * TODO: TRANSLATE LATER
           */
          this.errorMessage = 'Address or Password is incorrect';
        }
      },
      error: (e) => {
        this.loading = false;
        this.errorMessage = `Error occurred: ${e}`;
        console.error(e);
      }
    });
  }

  /**
   * Getters
   */
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
}
