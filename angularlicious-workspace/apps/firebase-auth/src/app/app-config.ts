import { IConfiguration, ILogglyConfig, IFirebaseConfig, IContentfulConfig, IErrorHandingConfig } from "@angularlicious/configuration";
import { ILoggingConfig } from "dist/@angularlicious/configuration";
import { IErrorHandling } from "libs/configuration/src/lib/configs/i-error-handling-config";

export class AppConfig implements IConfiguration {
    errorHandling: IErrorHandingConfig;
    logging: ILoggingConfig;
    loggly: ILogglyConfig;
    firebase: IFirebaseConfig;
    contentful: IContentfulConfig;
}