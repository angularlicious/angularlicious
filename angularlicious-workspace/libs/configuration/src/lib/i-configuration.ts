import { ILogglyConfig } from "./configs/i-loggly-config";
import { IFirebaseConfig } from "./configs/i-firebase-config";
import { IContentfulConfig } from "./configs/i-contentful-config";
import { ILoggingConfig } from "./configs/i-logging-config";
import { IErrorHandling } from "./configs/i-error-handling-config";

export interface IConfiguration {
    errorHandling: IErrorHandling;
    logging: ILoggingConfig;
    loggly: ILogglyConfig;
    firebase: IFirebaseConfig
    contentful: IContentfulConfig;
  }
  