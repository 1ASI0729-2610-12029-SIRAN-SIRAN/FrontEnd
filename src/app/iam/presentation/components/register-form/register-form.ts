import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Role} from '../../../../shared/domain/model/role.enum';
import {Router, RouterLink} from '@angular/router';
import {AppStore} from '../../../application/iam.store';
import {IamApiRepository} from '../../../infrastructure/iam-api.repository';
import {catchError, of, switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  roles = Object.values(Role);

  constructor(private fb: FormBuilder,
              private appStore: AppStore,
              private authRepository: IamApiRepository,
              private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      role: [Role.PARENT, Validators.required],
      medicalLicense: [{ value: '', disabled: true }],
      specialty: [{ value: '', disabled: true }],
    });

    this.registerForm.get('role')?.valueChanges?.subscribe(role=>{
      const medicalLicenseControl = this.registerForm.get('medicalLicense');
      const specialtyControl = this.registerForm.get('specialty');
      if (role === Role.MEDIC) {
        medicalLicenseControl?.enable();
        specialtyControl?.enable();
        medicalLicenseControl?.setValidators(Validators.required);
        specialtyControl?.setValidators([Validators.required]);
      } else {
        medicalLicenseControl?.disable();
        specialtyControl?.disable();
        medicalLicenseControl?.clearValidators();
        specialtyControl?.clearValidators();
        medicalLicenseControl?.setValue(null);
        specialtyControl?.setValue(null);
      }
      medicalLicenseControl?.updateValueAndValidity();
      specialtyControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const formValue = this.registerForm.getRawValue();
    const email = formValue.email;

    this.authRepository.getByEmail(email).pipe(
      switchMap(existingUser=> {
        if (existingUser) {
          throw new Error('This email already exists');
        }
        const userData: any = {
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
          phoneNumber: formValue.phoneNumber,
          role: formValue.role,
          medicalLicense: formValue.role === Role.MEDIC ? formValue.medicalLicense : null,
          specialty: formValue.role === Role.MEDIC ? formValue.specialty : null
        };
        return this.appStore.register(userData);
      }),
      catchError(err => {
        this.errorMessage = err.message || 'Register Error. Try again later'
        this.loading = false;
        return of(null);
      })
    ).subscribe({
      next: (result) => {
        if (result) {
          this.router.navigate(['/login']);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });


  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get phoneNumber() { return this.registerForm.get('phoneNumber'); }
  get role() { return this.registerForm.get('role'); }
  get medicalLicense() { return this.registerForm.get('medicalLicense'); }
  get specialty() { return this.registerForm.get('specialty'); }
}
