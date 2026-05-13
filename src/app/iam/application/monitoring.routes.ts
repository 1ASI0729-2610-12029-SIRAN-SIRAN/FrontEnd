// monitoring/monitoring.routes.ts
// Agregar estas rutas en app.routes.ts dentro del path 'monitoring'

import { Routes } from '@angular/router';

export const MONITORING_ROUTES: Routes = [
  {
    path: 'records',
    loadComponent: () =>
      import('../presentation/components/health-record-list/health-record-list')
        .then(m => m.HealthRecordListComponent)
  },
  {
    path: 'records/new',
    loadComponent: () =>
      import('../presentation/components/health-record-form/health-record-form')
        .then(m => m.HealthRecordFormComponent)
  },
  {
    path: '',
    redirectTo: 'records',
    pathMatch: 'full'
  }
];


