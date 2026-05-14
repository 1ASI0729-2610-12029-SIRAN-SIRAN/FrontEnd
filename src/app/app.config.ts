import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {BabyRepository} from './baby/domain/repository/baby.repository';
import {BabyApi} from './baby/infrastructure/baby-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      /**
       * This is only for the moment
       * I need find a better solution
       */
      provide: BabyRepository,
      useClass: BabyApi,
    },
    provideRouter(routes),
  ]
};
