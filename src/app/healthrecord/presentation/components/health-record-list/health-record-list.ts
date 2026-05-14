import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MonitoringService } from '../../../domain/service/monitoring.service';
import { HealthRecord } from '../../../domain/model/health-record.entity';

@Component({
  selector: 'app-health-record-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './health-record-list.html',
  styleUrl: './health-record-list.css'
})
export class HealthRecordListComponent implements OnInit {
  private monitoringService = inject(MonitoringService);
  private router = inject(Router);

  // Variable para mostrar el registro actual
  latestRecord: HealthRecord | null = null;

  ngOnInit(): void {

    this.monitoringService.getRecords().subscribe({
      next: (data: HealthRecord[]) => {
        if (data && data.length > 0) {

          this.latestRecord = data[data.length - 1];
        }
      },
      error: (err: any) => console.error('Error cargando db.json', err)
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
