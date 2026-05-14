import { Routes } from '@angular/router';
import { LoginForm } from './iam/presentation/components/login-form/login-form';
import {RegisterForm} from './iam/presentation/components/register-form/register-form';
import { HealthRecordListComponent } from './healthrecord/presentation/components/health-record-list/health-record-list';
import { HealthRecordFormComponent } from './healthrecord/presentation/components/health-record-form/health-record-form';
import {Home} from './shared/presentation/components/home/home';
import { MONITORING_ROUTES } from './healthrecord/application/monitoring.routes';

export const routes: Routes = [
  { path: 'login',    component: LoginForm                      },
  { path: 'register', component: RegisterForm                   },
  { path: '',         redirectTo: 'login',    pathMatch: 'full' },
  { path: 'home', component: Home},
  { path: 'monitoring', children: MONITORING_ROUTES },


];
