// monitoring/domain/service/monitoring.service.ts

import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import {MonitoringApiRepository} from '../../infrastructure/monitoring-api.repository';
import { HealthRecord, HealthRecordCreateRequest, VitalStatus } from '../model/health-record.model';
import { AlertRange }  from '../model/alert-range.model';

@Injectable({ providedIn: 'root' })
export class MonitoringService {

  constructor(private repo: MonitoringApiRepository) {}

  getRecordsByBaby(idBaby: string): Observable<HealthRecord[]> {
    return this.repo.getRecordsByBaby(idBaby);
  }

  createRecord(payload: HealthRecordCreateRequest): Observable<HealthRecord> {
    return this.repo.createRecord(payload);
  }

  deleteRecord(id: string): Observable<void> {
    return this.repo.deleteRecord(id);
  }

  getAlertRanges(): Observable<AlertRange[]> {
    return this.repo.getAlertRanges();
  }

  /**
   * Evalúa el estado de un valor según el AlertRange correspondiente.
   * Si no hay rango configurado, devuelve 'normal'.
   */
  evaluateStatus(value: number, ranges: AlertRange[], type: string): VitalStatus {
    const range = ranges.find(r => r.type === type);
    if (!range) return 'normal';
    if (value < range.minValue || value > range.maxValue) {
      const deviation = Math.abs(value - range.maxValue) / range.maxValue;
      return deviation > 0.1 ? 'danger' : 'warning';
    }
    return 'normal';
  }
}
