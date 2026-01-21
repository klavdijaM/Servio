import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// starts Angular and treats App as the root component
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
