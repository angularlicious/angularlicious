import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandliciousService implements ErrorHandler {
 

  constructor() { }

  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }
}
