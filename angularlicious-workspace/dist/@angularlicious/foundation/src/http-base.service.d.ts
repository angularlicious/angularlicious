import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestOptions } from './models/http-request-options';
import { HttpRequestMethod } from './models/http-request-methods.enum';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { ErrorResponse } from './models/error-response.model';
import { ServiceResponse } from './models/service-response.model';
/**
 * Use to create and execute HTTP service requests.
 * 1. Create Headers
 * 2. Create RequestOptions
 * 3. Execute Request
 */
export declare class HttpBaseService {
    http: HttpClient;
    loggingService: AngularliciousLoggingService;
    serviceName: string;
    accessToken: string;
    constructor(http: HttpClient, loggingService: AngularliciousLoggingService);
    /**
     * Use to create a [Header] for [multipart/form-data].
     */
    createMultipartFormDataHeader(requiresAuthToken: boolean): Headers;
    /**
     * Use to create a [Header] for Content-Type [application/x-www-form-urlencoded].
     */
    createFormUrlencodedHeader(): Headers;
    /**
     * Use to create a [Header] for the HTTP request. If the [requiresAuthToken] indicator
     * is true, the request will use the current Authorization security token.
     * @param isSecure
     */
    createHeader(requiresAuthToken: boolean): HttpHeaders;
    /**
     * Use this method to create a new HttpRequestOptions item for a request.
     * @param headers Use to supply header information in the request.
     * @param url Use to indicate the URL of the web api.
     * @param body Use to provide a data payload for the request.
     */
    createRequestOptions(method: HttpRequestMethod, headers: HttpHeaders, url: string, body: any): HttpRequestOptions;
    /**
     * Use to execute an HTTP request using the specified header and URL.
     */
    executeRequest(requestOptions: HttpRequestOptions): Observable<ServiceResponse>;
    /**
     * Use to execute an HTTP [get] request using the specified url and options.
     */
    get<ServiceResponse>(requestOptions: HttpRequestOptions): Observable<ServiceResponse>;
    /**
     * Use to execute an HTTP [post] request using the specified url and options.
     * @param requestOptions use to define the options for the specified request.
     */
    post<ServiceResponse>(requestOptions: HttpRequestOptions): Observable<ServiceResponse>;
    /**
     * Use to handle HTTP errors when calling web api(s).
     */
    handleHttpError(error: any, requestOptions: HttpRequestOptions): Observable<Response>;
    handleUnexpectedError(error?: Error): Observable<any>;
    createErrorResponse(error?: Error): ErrorResponse;
}
