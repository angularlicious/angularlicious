import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { IFirebaseConfig } from '@angularlicious/configuration';
import { IConfiguration } from 'dist/@angularlicious/configuration';

// fetch(environment.appConfig).then(resp => resp.json()).then(config => {
//   const settings: IConfiguration = <IConfiguration>config;
//   console.log(`Settings: ${JSON.stringify(settings)}`)
//   window['config'] = settings;
//   window['firebase-config'] = settings.firebase;
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
