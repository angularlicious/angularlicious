import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfiguration } from './i-configuration';
import { ConfigurationContext } from './configuration-context';
import { Subject, ReplaySubject, config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  settings$: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  config: IConfiguration;
  private filePath: string;

  constructor(
    @Optional() context: ConfigurationContext,
    private http: HttpClient
  ) {
    if (context) {
      this.filePath = context.filePath;
    }
  }

  loadConfiguration() {
    return this.http
      .get(this.filePath)
    .toPromise()
    .then(jsonConfig => {
      this.settings = <IConfiguration>jsonConfig;
    });
    // this.settings = <IConfiguration>window['config'];
  }

  set settings(value) {
    this.config = value;
    this.settings$.next(this.config);
  }

  get settings(): IConfiguration {
    return this.config;
  }
}
