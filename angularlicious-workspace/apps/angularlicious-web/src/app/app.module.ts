import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

/**
 * Application Modules;
 */
import { CustomAngularModulesModule } from './modules/custom-angular-modules/custom-angular-modules.module';
import { PodcastModule } from './modules/podcast/podcast.module';
import { AngularRulesEngineModule } from './modules/angular-rules-engine/angular-rules-engine.module';
import { SubscriberModule } from './modules/subscriber/subscriber.module';
import { EventsModule } from './modules/events/events.module';

/**
 * Need to import/reference the [AppRoutingModule] for usage in the @NgModule declaration. This
 * contains the routing configuration.
 */
import { CoreModule } from './modules/core/core.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { BootstrapComponent } from './bootstrap/bootstrap.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [AppComponent, BootstrapComponent],
  imports: [
    AngularRulesEngineModule,
    AppRoutingModule, // defines available app routes;
    BrowserModule,
    CoreModule,
    CustomAngularModulesModule,
    EventsModule,
    PodcastModule,
    RouterModule, // REQUIRED TO ENABLE ROUTES AND ROUTER OUTLET;
    SubscriberModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
