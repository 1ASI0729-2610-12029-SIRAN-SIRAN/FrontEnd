// src/app/healthrecord/infrastructure/monitoring-api.repository.ts

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthRecord } from '../domain/model/health-record.model';

@Injectable({ providedIn: 'root' })
export class MonitoringApiRepository {
  private baseUrl = 'http://localhost:8080/healthRecords';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(this.baseUrl);
  }

  // Método que recibe el objeto y lo guarda en db.json
  create(record: any): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(this.baseUrl, record);
  }
}
