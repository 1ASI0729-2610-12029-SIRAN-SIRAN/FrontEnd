// Entidad principal que representa un registro completo en la DB
export class HealthRecord {
  id: string = '';
  temperature: number = 0;
  weight: number = 0;
  oxygenSaturation: number = 0;
  createdAt: string = '';
  idBaby: string = '';
  idDevice: string = '';
}

// Interfaz para la creación (normalmente no incluye id ni createdAt porque los genera el servidor)
export interface HealthRecordCreateRequest {
  temperature: number;
  weight: number;
  oxygenSaturation: number;
  idBaby: string;
  idDevice: string;
}

/** Determina el estado de un signo vital según el AlertRange */
export type VitalStatus = 'normal' | 'warning' | 'danger';

export interface VitalSummary {
  label:  string;
  value:  string;
  status: VitalStatus;
}
