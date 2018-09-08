import { ServiceError } from './service-error.model';

export class ServiceResponse {
  IsSuccess: boolean;
  Message: string;
  Data: any;
  Errors: Array<ServiceError> = new Array<ServiceError>();
}
