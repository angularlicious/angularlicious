import { IFirebaseConfig } from "./i-firebase-config";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "../configuration.service";
import { Subscription } from "rxjs";

@Injectable()
export class FirebaseConfig implements IFirebaseConfig {

    configService$: Subscription;

    apiKey: string = '';
    authDomain: string = '';
    databaseURL: string = '';
    projectId: string = '';
    storageBucket: string = '';
    messagingSenderId: string = '';

    /**
     * Constructor for the Firebase configuration. 
     * @param configService Subscribes to the [settings$] subscription to 
     * handle changes to settings - when they are available. 
     */
    constructor(private configService: ConfigurationService) {
        this.configService$ = this.configService.settings$.subscribe(
            settings => this.handleSettingsChange(settings)
        );
    }

    /**
     * Use to set the [Firebase] configuration settings using the 
     * settings from the ConfigurationService.
     * @param settings 
     */
    handleSettingsChange(settings) {
        this.apiKey = settings.firebase.apiKey;
        this.authDomain = settings.firebase.authDomain;
        this.databaseURL = settings.firebase.databaseURL;
        this.projectId = settings.firebase.projectId;
        this.storageBucket = settings.firebase.storageBucket;
        this.messagingSenderId = settings.firebase.messagingSenderId;
    }
}