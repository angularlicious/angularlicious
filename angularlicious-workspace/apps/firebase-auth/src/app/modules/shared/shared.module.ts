import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule, AuthService } from '@angularlicious/firebase';
import { AngularliciousLoggingService, AngularliciousLoggingModule, LogglyWriter } from '@angularlicious/logging';
import { ConfigurationService, ConfigurationModule } from '@angularlicious/configuration';
import { environment } from 'apps/firebase-auth/src/environments/environment';
import { ConsoleWriter } from 'libs/logging/src/lib/log-writers/console-writer';
import { ErrorHandlingModule, ErrorHandliciousService } from '@angularlicious/error-handling';

/**
 * The factory function to initialize the configuration service for the application.
 * @param configService 
 */
export function initializeConfiguration(configService: ConfigurationService) {
  console.log(`Initializing firebase configuration from [AppModule]`);
  configService.loadConfiguration();
  return () => {
    return configService;
  }
}

/**
 * The factory function to initialize the logging service and writer for the
 * application. 
 * 
 * @param loggingService 
 * @param consoleWriter 
 */
export function initializeLogWriter(loggingService: AngularliciousLoggingService, consoleWriter: ConsoleWriter) {
  console.log(`Initializing [Console Writer] from [AppModule]`);
  return () => {
    return consoleWriter;
  }
}

@NgModule({
  imports: [
    CommonModule,
    ErrorHandlingModule,
    AngularliciousLoggingModule,
    ConfigurationModule.forRoot({filePath: `assets/config/configuration.${environment.name}.json`}),
    FirebaseModule
  ],
  declarations: [],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlingModule
    },
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
   ConsoleWriter,
   LogglyWriter,
   {
     provide: ErrorHandler,
     useClass: ErrorHandliciousService,
     deps: [ConfigurationService, AngularliciousLoggingService]
   }
  ]
})
export class SharedModule {
  constructor() {
  }
}
