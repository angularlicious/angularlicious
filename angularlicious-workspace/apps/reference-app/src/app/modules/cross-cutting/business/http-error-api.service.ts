import { Injectable } from '@angular/core';
import { ApiResponse, HttpRequestMethod, ErrorApiResponse } from '@angularlicious/http-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpService } from '@angularlicious/http-service';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorApiService extends HttpService {
 

  constructor(
    http: HttpClient,
    private httpService: HttpService,
    private loggingService: AngularliciousLoggingService
  ) {
    super(http);
  }

  createHttpError(errorName: string): Observable<HttpResponse<ApiResponse<string>>> {
    const requestUrl = 'api/monkey/are/cool/create-http-error';
    const message = `HttpService preparing to call: ${requestUrl}`;
    this.loggingService.log(`HttpErrorApiService`, Severity.Information, message);

    const body = JSON.stringify(errorName);
    const options = this.httpService.createOptions(
      HttpRequestMethod.post,
      this.httpService.createHeader(),
      requestUrl,
      body
    );
    return this.httpService.execute(options);
  }

  createHttpApiError(errorName: string): Observable<HttpResponse<ApiResponse<boolean>>> {
    const requestUrl = 'api/monkey/are/cool/create-http-error';
    const message = `HttpService preparing to call: ${requestUrl}`;
    this.loggingService.log(`HttpErrorApiService`, Severity.Information, message);

    const response = new ErrorApiResponse();
    response.IsSuccess = true;
    response.Message = `Fake message from ${this}`;
    response.Errors.push()
    const subject: BehaviorSubject<any> = new BehaviorSubject(response);
    return subject.asObservable();
  }
}