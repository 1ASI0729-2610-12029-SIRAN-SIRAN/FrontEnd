import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Baby} from '../../../domain/model/baby.entity';
import {Observable} from 'rxjs';
import {BabiesStore} from '../../../application/babies.store';
import {BabyItem} from '../baby-item/baby-item';

@Component({
  selector: 'app-baby-list',
  imports: [CommonModule, BabyItem],
  templateUrl: './baby-list.html',
  styleUrl: './baby-list.css',
})
export class BabyList {
  @Input() userId!: string;
  babies$: Observable<Baby[]>;

  constructor(private babyStore: BabiesStore) {
    this.babies$ = this.babyStore.babies$;
  }
  ngOnInit(): void {
    if (this.userId) {
      this.babyStore.loadByUser(this.userId).subscribe();
    }
  }

  onAddBaby(): void {
    console.log('Create New Baby Run');
  }

  onEditBaby(baby: Baby): void {
    console.log('Edit:', baby);
  }

  onDeleteBaby(id: string): void {
    this.babyStore.deleteBaby(id).subscribe();
  }
}
