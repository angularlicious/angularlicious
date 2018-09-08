import { ServiceError } from './service-error.model';

export class ErrorResponse {
  IsSuccess = false; // default for ErrorResponse
  Message: string;
  Errors: Array<ServiceError> = new Array<ServiceError>();
  Exception: Error;
}
