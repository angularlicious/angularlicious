import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'libs/configuration/src/lib/configuration.service';
import { IConfiguration } from '@angularlicious/configuration';
import { AuthService } from '@angularlicious/firebase';
import { User } from 'libs/firebase/src/lib/models/user.model';
import { Subscription } from 'rxjs';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { ComponentBase } from 'dist/@angularlicious/foundation';
import { Router } from '@angular/router';

@Component({
  selector: 'angularlicious-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends ComponentBase implements OnInit {
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
      super(`AppComponent`, logger, router);
  }

  ngOnInit(): void {
    this.logger.log(this.componentName, Severity.Information, `Preparing to subscribe to configuration settings.`)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.configService.settings$.subscribe(config =>  this.handleConfig(config));

    this.user$ = this.authService.user$.subscribe(
      user => this.user = user
    )
  }

  handleConfig(config: IConfiguration) {
   this.config = config;

  //  this.title = this.config.firebase.apiKey;
  this.title = this.configService.settings.firebase.apiKey;
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }
}
