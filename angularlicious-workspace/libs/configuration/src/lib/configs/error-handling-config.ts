import { IErrorHandling } from './i-error-handling-config';

export class ErrorHandlingConfig implements IErrorHandling {
  name: string;
  includeDefaultErrorHandling: boolean;
}
