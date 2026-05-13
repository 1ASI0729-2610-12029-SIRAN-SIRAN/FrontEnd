// monitoring/domain/model/alert-range.model.ts

export interface AlertRange {
  idAlertRange: string;
  type:         string;   // 'temperature' | 'oxygenSaturation' | 'heartRate' | 'weight'
  maxValue:     number;
  minValue:     number;
  description:  string;
  idMedic:      string;
}
