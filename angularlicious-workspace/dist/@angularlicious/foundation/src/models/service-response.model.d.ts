import { ServiceError } from './service-error.model';
export declare class ServiceResponse {
    IsSuccess: boolean;
    Message: string;
    Data: any;
    Errors: Array<ServiceError>;
}
