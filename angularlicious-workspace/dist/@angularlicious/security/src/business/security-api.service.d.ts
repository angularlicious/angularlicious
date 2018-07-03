import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { HttpBaseService, ServiceResponse } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { Subscriber } from './../models/subscriber.model';
export declare class SecurityApiService extends HttpBaseService {
    httpService: HttpBaseService;
    constructor(http: HttpClient, httpService: HttpBaseService, loggingService: AngularliciousLoggingService);
    registerSubscriber(subscriber: Subscriber): Observable<ServiceResponse>;
}
