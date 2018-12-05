import { ApiResponse } from './api-response';
import { ApiErrorMessage } from './api-error-message';

/**
 * Use to provide error information from an API. You can also 
 * use this class to create a response with errors while doing
 * error handling.
 * 
 * Errors: is a list om [ApiErrorMessage] items that contain specific
 * errors for the specified request. 
 */
export class ErrorApiResponse<T> extends ApiResponse<T> {
  Errors: ApiErrorMessage[] = [];
}
