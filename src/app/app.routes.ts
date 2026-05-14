import { Routes } from '@angular/router';
import { LoginForm } from './iam/presentation/components/login-form/login-form';
import { RegisterForm } from './iam/presentation/components/register-form/register-form';
import { ProfileForm } from './profile/presentation/view/profile-form/profile-form';
import { BabyManagement } from './baby/presentation/view/baby-management/baby-management';
import { HealthRecordListComponent } from './healthrecord/presentation/components/health-record-list/health-record-list';
import { HealthRecordFormComponent } from './healthrecord/presentation/components/health-record-form/health-record-form';
import {Home} from './shared/presentation/components/home/home';
import { MONITORING_ROUTES } from './healthrecord/application/monitoring.routes';

export const routes: Routes = [
  { path: 'login',    component: LoginForm                      },
  { path: 'register', component: RegisterForm                   },
  { path: 'profile',  component: ProfileForm                    },
  { path: 'baby',     component: BabyManagement                 },
  { path: '',         redirectTo: 'login',    pathMatch: 'full' },
  { path: 'home', component: Home},
  { path: 'monitoring', children: MONITORING_ROUTES },
];
