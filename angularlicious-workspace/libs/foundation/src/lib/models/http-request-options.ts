import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpRequestMethod } from './http-request-methods.enum';

export class HttpRequestOptions {
  requestMethod: HttpRequestMethod;
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  // responseType: 'arraybuffer';
  withCredentials?: boolean;
  requestUrl: string;
}
