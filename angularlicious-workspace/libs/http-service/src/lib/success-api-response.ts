import { ApiResponse } from './api-response';

/**
 * Use to define a successful API response. A successful response will
 * most likely include a payload of data (i.e., use the Data property). 
 */
export class SuccessApiResponse<T> extends ApiResponse<T> {
  Data: T;
}
