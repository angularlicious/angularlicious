import { ServiceError } from './service-error.model';
export declare class ErrorResponse {
    IsSuccess: boolean;
    Message: string;
    Errors: Array<ServiceError>;
    Exception: Error;
}
