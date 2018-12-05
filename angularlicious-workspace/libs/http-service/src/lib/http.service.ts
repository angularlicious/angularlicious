import { Injectable } from '@angular/core';
import { HttpRequestMethod } from './http-request-methods.enum';
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpRequestOptions } from './http-request-options';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiResponse } from './api-response';
import { ErrorApiResponse } from './error-api-response';
import { ApiErrorMessage } from './api-error-message';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Use to create [options] for the API request.
   * @param method Use to indicate the HttpRequest verb to target.
   * @param headers Use to provide any [HttpHeaders] with the request.
   * @param url Use to indicate the target URL for the API request.
   * @param body Use to provide a JSON object with the payload for the request.
   * @param withCredentials Use to indicate if request will include credentials (cookies), default value is [true].
   */
  createOptions(
    method: HttpRequestMethod,
    headers: HttpHeaders,
    url: string,
    body: any,
    withCredentials: boolean = true
  ): HttpRequestOptions {
    let options: HttpRequestOptions;
    options = new HttpRequestOptions();
    options.requestMethod = method;
    options.headers = headers;
    options.requestUrl = url;
    options.body = body;
    options.withCredentials = withCredentials;
    return options;
  }

  /**
   * Use to create a new [HttpHeaders] object for the HTTP/API request.
   */
  createHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Use to execute an HTTP request using the specified options in the [HttpRequestOptions].
   * @param requestOptions
   */
  execute<T>(
    requestOptions: HttpRequestOptions
  ): Observable<HttpResponse<ApiResponse<T>>> {
    console.log(`Preparing to perform request to: ${requestOptions.requestUrl}`);
    return this.httpClient
      .request<T>(
        requestOptions.requestMethod.toString(),
        requestOptions.requestUrl,
        {
          body: requestOptions.body,
          headers: requestOptions.headers,
          reportProgress: requestOptions.reportProgress,
          observe: requestOptions.observe,
          params: requestOptions.params,
          responseType: requestOptions.responseType,
          withCredentials: requestOptions.withCredentials
        }
      )
      .pipe(
        retry(1),
        catchError((errorResponse: any) => {
          return this.handleError(errorResponse);
        })
      );
  }

  protected handleError(error: HttpErrorResponse): Observable<any> {
    const apiErrorResponse = new ErrorApiResponse();
    apiErrorResponse.IsSuccess = false;
    apiErrorResponse.Timestamp = new Date(Date.now());
    apiErrorResponse.Message = 'Unexpected HTTP error.';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // TODO: MIGHT WANT TO LOG THE INFORMATION FROM error.error;
      apiErrorResponse.Errors.push(new ApiErrorMessage(
        `A client-side or network error occurred. Handle it accordingly.`,
        true,
        null, null)
      );
      return throwError(apiErrorResponse);
    } else {
      // The API returned an unsuccessful response.
      if (error instanceof ErrorApiResponse) {
        // A known error response format from the API/Server; rethrow this response.
        return throwError(error);
      } else {
        // An unhandled error/exception - may not want to lead/display this information to an end-user.
        // TODO: MIGHT WANT TO LOG THE INFORMATION FROM error.error;
        apiErrorResponse.Errors.push(new ApiErrorMessage(
          `The API returned an unsuccessful response. ${error.status}: ${error.statusText}. ${error.message}`,
          false,
          null,
          error.status.toString())
        );
        return throwError(apiErrorResponse);
      }
    }
  }
}
