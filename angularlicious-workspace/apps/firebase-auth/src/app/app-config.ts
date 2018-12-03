import { IConfiguration, ILogglyConfig, IFirebaseConfig, IContentfulConfig, IErrorHandingConfig } from "@angularlicious/configuration";
import { ILoggingConfig } from "dist/@angularlicious/configuration";

export class AppConfig implements IConfiguration {
    errorHandling: IErrorHandingConfig;
    logging: ILoggingConfig;
    loggly: ILogglyConfig;
    firebase: IFirebaseConfig;
    contentful: IContentfulConfig;
}