import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Baby} from '../../../domain/model/baby.entity';
import {Observable} from 'rxjs';
import {BabiesStore} from '../../../application/babies.store';
import {BabyItem} from '../baby-item/baby-item';

@Component({
  selector: 'app-baby-list',
  imports: [CommonModule],
  templateUrl: './baby-list.html',
  styleUrl: './baby-list.css',
})
export class BabyList {
  @Input() userId!: string;
  @Output() addBaby = new EventEmitter<void>();
  @Output() editBaby = new EventEmitter<Baby>();
  @Output() deleteBaby = new EventEmitter<string>();

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
    this.addBaby.emit();
  }
  onEditBaby(baby: Baby): void {
    this.editBaby.emit(baby);
  }
  onDeleteBaby(id: string): void {
    if (confirm('Delete this Baby?')) {
      this.deleteBaby.emit(id);
    }
  }
}
