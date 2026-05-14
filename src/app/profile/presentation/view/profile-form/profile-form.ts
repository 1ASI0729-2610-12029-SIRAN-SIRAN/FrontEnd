import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AppStore } from '../../../../iam/application/iam.store';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import {Role} from '../../../../shared/domain/model/role.enum';
import {User} from '../../../../iam/domain/model/user.entity';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-profile-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {
  profileForm!: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  currentUser: User | null = null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private appStore: AppStore) {
    this.currentUser = appStore.currentUserValue;
  }

  /**
   * Initializes reactive form with default values and validations rules
   */
  ngOnInit() {
    if (!this.currentUser){
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm = this.fb.group({
      name: [this.currentUser?.name, Validators.required],
      phoneNumber: [this.currentUser?.phoneNumber, Validators.required],
      medicalLicense: [{ value: this.currentUser?.medicalLicense, disabled: this.currentUser?.role !== Role.MEDIC }],
      specialty: [{ value: this.currentUser?.specialty, disabled: this.currentUser?.role !== Role.MEDIC }],
    });

    if (this.currentUser?.role === Role.MEDIC) {
      this.profileForm.get('medicalLicense')?.setValidators(Validators.required);
      this.profileForm.get('specialty')?.setValidators(Validators.required);
    }
  }

  /**
   * Handles form submission to updated credentials of user
   */
  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.successMessage = null;

    const formValue = this.profileForm.getRawValue();
    const updateData: any = {
      name: formValue.name,
      phoneNumber: formValue.phoneNumber,
    };
    if (this.currentUser?.role === Role.MEDIC) {
      updateData.medicalLicense = formValue.medicalLicense;
      updateData.specialty = formValue.specialty;
    }
    this.appStore.updateUser(updateData)
      .pipe(finalize(()=>this.loading = false)).subscribe({
      next: (updatedData) => {
        this.loading = false;
        this.successMessage = `Profile updated successfully.`;
        this.profileForm.patchValue({
          name: updatedData.name,
          phoneNumber: updatedData.phoneNumber,
          medicalLicense: updatedData.medicalLicense,
          specialty: updatedData.specialty,
        });
      },
      error: err => {
        this.loading = false;
        this.errorMessage = 'Error updating profile form';
        console.error(err);
      }
    });
  }

  /**
   * Getters
   */
  get name() { return this.profileForm.get('name'); }
  get phoneNumber() { return this.profileForm.get('phoneNumber'); }
  get medicalLicense() { return this.profileForm.get('medicalLicense'); }
  get specialty() { return this.profileForm.get('specialty'); }
}
