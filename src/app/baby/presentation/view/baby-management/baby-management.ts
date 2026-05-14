import { Component } from '@angular/core';
import {Baby} from '../../../domain/model/baby.entity';
import {AppStore} from '../../../../iam/application/iam.store';
import {BabiesStore} from '../../../application/babies.store';
import {BabyForm} from '../../components/baby-form/baby-form';
import {BabyList} from '../../components/baby-list/baby-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-baby-management',
  imports: [
    CommonModule,
    BabyForm,
    BabyList
  ],
  templateUrl: './baby-management.html',
  styleUrl: './baby-management.css',
})
export class BabyManagement {
  currentUserId: string;
  creating = false;
  editingBaby: Baby | null = null;

  constructor(private babyStore: BabiesStore, private appStore: AppStore) {
    this.currentUserId = appStore.currentUserValue?.id || '';
  }

  startCreate(): void {
    this.creating = true;
    this.editingBaby = null;
  }

  startEdit(baby: Baby): void {
    this.editingBaby = baby;
    this.creating = false;
  }

  saveBaby(baby: Baby): void {
    if (baby.id) {
      this.babyStore.updateBaby(baby).subscribe(() => this.cancelForm());
    } else {
      this.babyStore.addBaby(baby).subscribe(() => this.cancelForm());
    }
  }

  cancelForm(): void {
    this.creating = false;
    this.editingBaby = null;
  }
}
