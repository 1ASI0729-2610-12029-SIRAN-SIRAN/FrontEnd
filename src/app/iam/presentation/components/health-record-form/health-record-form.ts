

import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule }       from '@angular/forms';
import { MonitoringService } from '../../../domain/service/monitoring.service';
import { HealthRecordCreateRequest } from '../../../domain/model/health-record.model';

@Component({
  selector: 'app-health-record-form',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './health-record-form.html',
  styleUrl: './health-record-form.css'
})
export class HealthRecordFormComponent implements OnInit {

  // Prellenar idBaby e idDevice según el usuario autenticado
  // (en producción vendrían del store / AuthService)
  form: HealthRecordCreateRequest = {
    temperature:      0,
    weight:           0,
    oxygenSaturation: 0,
    heartRate:        undefined,
    respiratoryRate:  undefined,
    idBaby:           '',
    idDevice:         ''
  };

  isSubmitting = false;
  errorMsg     = '';

  constructor(
    private monitoringService: MonitoringService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO: obtener idBaby e idDevice desde el store de usuario autenticado
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMsg     = '';

    this.monitoringService.createRecord(this.form).subscribe({
      next:  () => this.router.navigate(['/monitoring/records']),
      error: (err) => {
        this.errorMsg     = err?.error?.message ?? 'Error al guardar el registro.';
        this.isSubmitting = false;
      }
    });
  }
}
