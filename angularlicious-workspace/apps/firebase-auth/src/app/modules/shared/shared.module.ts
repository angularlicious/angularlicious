import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule, AuthService } from '@angularlicious/firebase';
import { AngularliciousLoggingService, AngularliciousLoggingModule } from '@angularlicious/logging';
import { ConfigurationService, ConfigurationModule } from '@angularlicious/configuration';
import { environment } from 'apps/firebase-auth/src/environments/environment';

export function initializeConfiguration(configService: ConfigurationService) {
  console.log(`Initializing firebase configuration from [AppModule]`);
  configService.loadConfiguration();
  return () => {
    return configService;
  }
}

@NgModule({
  imports: [
    CommonModule,
    AngularliciousLoggingModule,
    ConfigurationModule.forRoot({filePath: `assets/config/configuration.${environment.name}.json`}),
    FirebaseModule
  ],
  declarations: [],
  providers: [
    AngularliciousLoggingService,
    ConfigurationService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfiguration,
      deps: [ConfigurationService],
      multi: true
    }
  ]
})
export class SharedModule {
  constructor() {
  }
}
