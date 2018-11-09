import { ILoggingConfig } from "./i-logging-config";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggingConfig implements ILoggingConfig {
    applicationName: string;
    version: string;
    isProduction: boolean;
}