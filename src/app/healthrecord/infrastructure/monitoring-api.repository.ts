import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HealthRecord } from '../domain/model/health-record.entity';

@Injectable({ providedIn: 'root' })
export class MonitoringApiRepository {
  private readonly http = inject(HttpClient);


  private readonly baseUrl: string = environment.fakeDatabaseProviderApiBaseUrl;
  private readonly path: string = '/healthRecords';

  getAll(): Observable<HealthRecord[]> {
    return this.http.get<HealthRecord[]>(`${this.baseUrl}${this.path}`);
  }


  create(record: any): Observable<HealthRecord> {
    return this.http.post<HealthRecord>(`${this.baseUrl}${this.path}`, record);
  }
}
