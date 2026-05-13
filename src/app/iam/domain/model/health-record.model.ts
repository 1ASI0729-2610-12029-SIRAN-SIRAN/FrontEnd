// monitoring/domain/model/health-record.model.ts

export interface HealthRecord {
  idHealthRecord: string;
  temperature:      number;   // °C
  weight:           number;   // kg
  oxygenSaturation: number;   // %
  heartRate?:       number;   // lpm  (campo extra en frontend)
  respiratoryRate?: number;   // rpm
  createdAt:        string;   // ISO date string
  idBaby:           string;
  idDevice:         string;
}

export interface HealthRecordCreateRequest {
  temperature:      number;
  weight:           number;
  oxygenSaturation: number;
  heartRate?:       number;
  respiratoryRate?: number;
  idBaby:           string;
  idDevice:         string;
}

/** Determina el estado de un signo vital según el AlertRange */
export type VitalStatus = 'normal' | 'warning' | 'danger';

export interface VitalSummary {
  label:  string;
  value:  string;
  status: VitalStatus;
}
