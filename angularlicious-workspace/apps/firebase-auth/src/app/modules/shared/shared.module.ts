import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule, AuthService } from '@angularlicious/firebase';
import { AngularliciousLoggingService, AngularliciousLoggingModule, LogglyWriter } from '@angularlicious/logging';
import { ConfigurationService, ConfigurationModule } from '@angularlicious/configuration';
import { environment } from 'apps/firebase-auth/src/environments/environment';
import { ConsoleWriter } from 'libs/logging/src/lib/log-writers/console-writer';

export function initializeConfiguration(configService: ConfigurationService) {
  console.log(`Initializing firebase configuration from [AppModule]`);
  configService.loadConfiguration();
  return () => {
    return configService;
  }
}

export function initializeLogWriter(loggingService: AngularliciousLoggingService, consoleWriter: ConsoleWriter) {
  console.log(`Initializing [Console Writer] from [AppModule]`);
  return () => {
    return consoleWriter;
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
    ConfigurationService,
    AngularliciousLoggingService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfiguration,
      deps: [ConfigurationService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLogWriter,
      deps: [AngularliciousLoggingService, ConsoleWriter, LogglyWriter],
      multi: true
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeLogglyWriter,
    //   deps: [ConfigurationService, AngularliciousLoggingService, LogglyWriter],
    //   multi: true
    // },
   ConsoleWriter,
   LogglyWriter
  ]
})
export class SharedModule {
  constructor() {
  }
}
