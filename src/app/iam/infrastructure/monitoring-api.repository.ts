

import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Observable }  from 'rxjs';
import { environment } from '../../../environments/environment';
import { HealthRecord, HealthRecordCreateRequest } from '../domain/model/health-record.model';
import { AlertRange }  from '../domain/model/alert-range.model';

@Injectable({ providedIn: 'root' })
export class MonitoringApiRepository {

  private readonly base = environment.fakeDatabaseProviderApiBaseUrl;
  private readonly userPath = environment.fakeDatabaseProviderUserEndpointPath;

  constructor(private http: HttpClient) {}

  // ---------- HealthRecord ----------

  getRecordsByBaby(idBaby: string): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(`${this.base}/health-records`, {
      params: { idBaby }
    });
  }

  getRecordById(id: string): Observable<HealthRecord> {
    return this.http.get<HealthRecord>(`${this.base}/health-records/${id}`);
  }

  createRecord(payload: HealthRecordCreateRequest): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(`${this.base}/health-records`, payload);
  }

  deleteRecord(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/health-records/${id}`);
  }

  // ---------- AlertRange ----------

  getAlertRanges(): Observable<AlertRange[]> {
    return this.http.get<AlertRange[]>(`${this.base}/alert-ranges`);
  }

  getAlertRangeById(id: string): Observable<AlertRange> {
    return this.http.get<AlertRange>(`${this.base}/alert-ranges/${id}`);
  }
}
