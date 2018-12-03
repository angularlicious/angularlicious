import { IErrorHandingConfig } from "./i-error-handling-config";

export class ErrorHandlingConfig implements IErrorHandingConfig {
    name: string;    
    includeDefaultErrorHandling: boolean;

    constructor(name?: string, includeDefaultErrorHandling?: boolean)
    constructor(name: string, includeDefaultErrorHandling : boolean = true) {
        this.name = name;
        this.includeDefaultErrorHandling = includeDefaultErrorHandling;
    }
}