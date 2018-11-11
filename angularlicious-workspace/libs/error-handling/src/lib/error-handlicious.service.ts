import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandliciousService extends ErrorHandler {
 

  constructor() {
    super()
   }

  handleError(error: Error | HttpErrorResponse):any {

    // use the [super] call to keep default error handling functionality --> console;
    super.handleError(error);

    // A. HANDLE ERRORS FROM HTTP
    if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A.1: A client-side or network error occurred. Handle it accordingly.
        } else {
            // A.2: The API returned an unsuccessful response (i.e., 400, 401, 403, etc.).
        }
    } else {
    // B. HANDLE A GENERALIZED ERROR FROM THE APPLICATION/CLIENT;
    }
}
}
