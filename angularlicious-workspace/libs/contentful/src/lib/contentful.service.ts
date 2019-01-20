import { Injectable, Optional } from '@angular/core';

import * as contentful from 'contentful';
import * as marked from 'marked';
import { from, ReplaySubject, Subject } from 'rxjs';
import { ConfigurationService, IConfiguration, IContentfulConfig } from '@angularlicious/configuration';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService extends ServiceBase {

  private client: contentful.ContentfulClientApi;
  private contentfulConfig: IContentfulConfig;
  entries$: Subject<any> = new ReplaySubject<any>(1);
  private entries: [];

  constructor(
    @Optional() public config: ConfigurationService,
    loggingService: AngularliciousLoggingService
  ) {
    super(loggingService);
    this.serviceName = 'ContentfulService';
    if(config) {
      this.config.settings$.subscribe(
        settings => this.setupConfiguration(settings)
      );
    }
  }

  /**
   * Use to setup the configuration settings for the Contentful API service.
   * @param settings 
   */
  setupConfiguration(settings: IConfiguration) {
    if(settings.contentful) {
      this.contentfulConfig = settings.contentful;
      this.setupContentfulClient();
      this.retrieveEntries();
    }
  }

  /**
   * Use to setup the Contentful API client using the configuration settings. 
   */
  private setupContentfulClient(): void {
    this.client = contentful.createClient({
      space: this.contentfulConfig.spaceId,
      accessToken: this.contentfulConfig.token
    });
  }

  /**
   * Use to retrieve all [entries] from the Contentful content service.
   */
  retrieveEntries() {
    from(this.client.getEntries()).subscribe(
      response => this.handleGetEntriesResponse(response),
      error => this.handleError(error),
      () => this.finishRequest(`Finished request to retrieve entries from Contentful.`)
    );
  }

  handleGetEntriesResponse(response) {
    if(response && response.items) {
      this.entries = response.items;
      this.entries$.next(response.items)
    }
  }

  markdownToHtml(md: string) {
    return marked(md);
  }
}
