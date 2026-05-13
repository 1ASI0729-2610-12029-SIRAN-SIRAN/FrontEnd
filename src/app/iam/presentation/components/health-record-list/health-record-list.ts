

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterLink }               from '@angular/router';
import { MonitoringService }        from '../../../domain/service/monitoring.service';
import { HealthRecord, VitalStatus } from '../../../domain/model/health-record.model';
import { AlertRange }               from '../../../domain/model/alert-range.model';

@Component({
  selector: 'app-health-record-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './health-record-list.html',
  styleUrl: './health-record-list.css'
})
export class HealthRecordListComponent implements OnInit {

  @Input() idBaby: string = '';

  records:     HealthRecord[] = [];
  alertRanges: AlertRange[]   = [];
  isLoading = true;

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit(): void {
    if (!this.idBaby) return;

    this.monitoringService.getAlertRanges().subscribe(ranges => {
      this.alertRanges = ranges;
    });

    this.monitoringService.getRecordsByBaby(this.idBaby).subscribe({
      next:  records => { this.records = records; this.isLoading = false; },
      error: ()      => { this.isLoading = false; }
    });
  }

  statusOf(value: number, type: string): VitalStatus {
    return this.monitoringService.evaluateStatus(value, this.alertRanges, type);
  }

  deleteRecord(id: string): void {
    this.monitoringService.deleteRecord(id).subscribe(() => {
      this.records = this.records.filter(r => r.idHealthRecord !== id);
    });
  }

  trackById(_: number, record: HealthRecord): string {
    return record.idHealthRecord;
  }
}
