import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

/**
 * Import Analytic Constants;
 */
import { Analytics } from './models/analytics.model';
import { AnalyticCategories } from './models/analytics-categories.model';
import { AnalyticActions } from './models/analytics-actions.model';
import { AnalyticLabels } from './models/analytics-labels.model';

import { AppRouteConstants } from './modules/app-routing/app-route.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends ComponentBase implements OnInit {
  title = 'app';

  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('AppComponent', loggingService, router);
  }

  ngOnInit() {}

  /**
   * Use to create a new analytic event for the specified item.
   */
  GetTheGuide() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Clicked for guide.`
    );
    const category = AnalyticCategories.Cards;
    const action = AnalyticActions.Click;
    const label = AnalyticLabels.AngularModulesGuide;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);

    this.routeTo(AppRouteConstants.CustomAngularModules);
  }

  /**
   * Use to track podcast click events from home page;
   */
  goToPodcastPlaylist() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Clicked for podcast from home page.`
    );
    const category = AnalyticCategories.Cards;
    const action = AnalyticActions.Click;
    const label = AnalyticLabels.Podcast;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);

    this.routeTo(AppRouteConstants.Podcast);
  }

  /**
   * Use to track angular rules engine click events from home page.
   */
  goToAngularRulesEngine() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Clicked for rules engine from home page.`
    );
    const category = AnalyticCategories.Cards;
    const action = AnalyticActions.Click;
    const label = AnalyticLabels.AngularRulesEngine;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);

    this.routeTo(AppRouteConstants.AngularRulesEngine);
  }

  goToPodcastSetup() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Clicked for podcast setup from home page.`
    );
    const category = AnalyticCategories.Cards;
    const action = AnalyticActions.Click;
    const label = AnalyticLabels.PodcastSetup;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);

    this.routeTo(AppRouteConstants.PodcastSetup);
  }
}
