import { Component, OnInit } from '@angular/core';
// import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

/**
 * Import Analytic Constants;
 */
import { AnalyticCategories } from './../../../models/analytics-categories.model';
import { AnalyticActions } from './../../../models/analytics-actions.model';
import { AnalyticLabels } from './../../../models/analytics-labels.model';

import { AmazonItem } from './amazon-item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent extends ComponentBase implements OnInit {
  hasProducts: boolean;
  products: Array<AmazonItem> = new Array<AmazonItem>();

  constructor(
    loggingService: AngularliciousLoggingService,
    router: Router,
    private http: HttpClient
  ) {
    super('SetupComponent', loggingService, router);
  }

  ngOnInit() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    const productsJsonUrl = 'assets/data/amazon-item-list.json';
    this.http
      .get(productsJsonUrl)
      .subscribe(
        response => this.handleRetrieveProducts(response),
        error => this.handleServiceErrors(error),
        () =>
          this.finishRequest(`Finished processing request for Amazon products.`)
      );
  }

  handleRetrieveProducts(response) {
    // this.products = response.json();
    this.products = response;
    if (this.products && this.products.length > 0) {
      this.loggingService.log(this.componentName, Severity.Information, ``);
      this.hasProducts = true;
    } else {
      this.loggingService.log(
        this.componentName,
        Severity.Warning,
        `Failed to retrieve Amazon product list.`
      );
    }
  }

  getTheProduct(product: AmazonItem) {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Preparing to create analytic event. Clicked for podcast setup from home page.`
    );
    const category = AnalyticCategories.Cards;
    const action = AnalyticActions.Click;
    const label = product.name;
    const value = 1;
    this.googleAnalyticsSendEvent(category, action, label, value);

    window.open(product.textUrl, '_blank');
  }
}
