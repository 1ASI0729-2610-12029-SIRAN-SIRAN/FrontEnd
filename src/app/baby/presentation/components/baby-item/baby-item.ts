import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Baby} from '../../../domain/model/baby.entity';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-baby-item',
  imports: [
    DatePipe
  ],
  templateUrl: './baby-item.html',
  styleUrl: './baby-item.css',
})
export class BabyItem {
  @Input() baby!: Baby;
  @Output() edit = new EventEmitter<Baby>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.baby);
  }

  onDelete(): void {
    if (confirm(`Delete ${this.baby.name}?`)) {
      this.delete.emit(this.baby.id);
    }
  }
}
