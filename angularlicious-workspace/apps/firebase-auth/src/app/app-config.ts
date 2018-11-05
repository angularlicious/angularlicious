import { IConfiguration, ILogglyConfig, IFirebaseConfig, IContentfulConfig } from "@angularlicious/configuration";
import { ILoggingConfig } from "dist/@angularlicious/configuration";

export class AppConfig implements IConfiguration {
    logging: ILoggingConfig;
    loggly: ILogglyConfig;
    firebase: IFirebaseConfig;
    contentful: IContentfulConfig;
}