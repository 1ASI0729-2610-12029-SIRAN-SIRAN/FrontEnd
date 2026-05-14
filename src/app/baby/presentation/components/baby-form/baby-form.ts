import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Baby} from '../../../domain/model/baby.entity';

@Component({
  selector: 'app-baby-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './baby-form.html',
  styleUrl: './baby-form.css',
})
export class BabyForm {
  @Input() baby?: Baby | null;
  @Input() userId!: string;
  @Output() save = new EventEmitter<Baby>();
  @Output() cancel = new EventEmitter<void>();

  babyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.babyForm = this.fb.group({
      name: [this.baby?.name || '', Validators.required],
      birthday: [this.baby?.birthday?.substring(0, 10) || '', Validators.required],
      gender: [this.baby?.gender || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.babyForm.invalid) return;
    const formValue = this.babyForm.value;
    const babyData: Baby = {
      id: this.baby?.id || '',
      name: formValue.name,
      birthday: formValue.birthday,
      gender: formValue.gender,
      idUser: this.userId
    };
    this.save.emit(babyData);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
