import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MonitoringApiRepository } from '../../infrastructure/monitoring-api.repository';
import { HealthRecord, HealthRecordCreateRequest } from '../model/health-record.entity';

@Injectable({ providedIn: 'root' })
export class MonitoringService {
  private repo = inject(MonitoringApiRepository);

  createRecord(payload: HealthRecordCreateRequest): Observable<HealthRecord> {

    const randomId = Math.floor(Math.random() * 900) + 100;

    const newRecord: HealthRecord = {
      ...payload,
      id: `HR${randomId}`,
      createdAt: new Date().toISOString(),
      idBaby: payload.idBaby || "B001",
      idDevice: payload.idDevice || "D001"
    };

    return this.repo.create(newRecord);
  }

  getRecords(): Observable<HealthRecord[]> {
    return this.repo.getAll();
  }
}
