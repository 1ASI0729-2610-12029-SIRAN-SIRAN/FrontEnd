import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MonitoringService} from '../../../domain/service/monitoring.service';
import {HealthRecordCreateRequest} from '../../../domain/model/health-record.entity';

@Component({
  selector: 'app-health-record-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './health-record-form.html',
  styleUrl: './health-record-form.css'
})
export class HealthRecordFormComponent {
  private monitoringService = inject(MonitoringService);
  private router = inject(Router);

  form: HealthRecordCreateRequest = {
    temperature: 0,
    weight: 0,
    oxygenSaturation: 0,
    idBaby: 'B001',
    idDevice: 'D001'
  };

  isSubmitting = false;
  errorMsg = '';

  onSubmit() {
    this.isSubmitting = true;

    // Ahora 'this.form' tiene el tipo correcto y no dará error TS2345
    this.monitoringService.createRecord(this.form).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/home/monitoring']);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.errorMsg = 'Error al intentar conectar con el servidor.';
        console.error(err);
      }
    });
  }
  goBack() {
    this.router.navigate(['/home']);
  }
}






