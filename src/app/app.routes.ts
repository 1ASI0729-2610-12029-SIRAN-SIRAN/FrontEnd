import { Routes } from '@angular/router';
import { LoginForm } from './iam/presentation/components/login-form/login-form';
import {RegisterForm} from './iam/presentation/components/register-form/register-form';

import {Home} from './shared/presentation/components/home/home';

export const routes: Routes = [
  { path: 'login',    component: LoginForm                      },
  { path: 'register', component: RegisterForm                   },
  { path: '',         redirectTo: 'login',    pathMatch: 'full' },
  { path: 'home', component: Home}
];
