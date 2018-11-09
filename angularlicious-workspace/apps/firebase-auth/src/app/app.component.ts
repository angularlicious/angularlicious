import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'libs/configuration/src/lib/configuration.service';
import { IConfiguration } from '@angularlicious/configuration';
import { AuthService } from '@angularlicious/firebase';
import { User } from 'libs/firebase/src/lib/models/user.model';
import { Subscription } from 'rxjs';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { ComponentBase } from 'dist/@angularlicious/foundation';
import { Router } from '@angular/router';
import { environment } from 'apps/component-event/src/environments/environment';

@Component({
  selector: 'angularlicious-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularlicious';
  config: IConfiguration;
  user: User;
  user$: Subscription;

  constructor(
    private configService: ConfigurationService,
    private authService: AuthService,
    private logger: AngularliciousLoggingService,
    router: Router
    ) {
  }

  ngOnInit(): void {
    this.logger.log('AppComponent', Severity.Information, `Preparing to subscribe to configuration settings.`)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.configService.settings$.subscribe(config =>  this.handleConfig(config));

    this.user$ = this.authService.user$.subscribe(
      user => this.user = user
    )
  }

  handleConfig(config: IConfiguration) {
   this.config = config;

   this.logger.log('AppComponent', Severity.Warning, `Preparing to show my key...`, [`${this.config.logging.applicationName},"AppComponent"`]);
  //  this.title = this.config.firebase.apiKey;
  this.title = this.configService.settings.firebase.apiKey;
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }
}
