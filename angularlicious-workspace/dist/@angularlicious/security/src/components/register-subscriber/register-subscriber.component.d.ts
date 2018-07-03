import { OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { Subscriber } from './../../models/subscriber.model';
import { AngularliciousSecurityService } from './../../security.service';
import { ServiceResponse } from '@angularlicious/foundation';
export declare class RegisterSubscriberComponent extends ComponentBase implements OnInit {
    private securityService;
    formBuilder: FormBuilder;
    subscribe: EventEmitter<ServiceResponse>;
    _form: FormGroup;
    subscriber: Subscriber;
    constructor(securityService: AngularliciousSecurityService, loggingService: AngularliciousLoggingService, formBuilder: FormBuilder, router: Router);
    ngOnInit(): void;
    buildForm(): void;
    submitForm(): void;
    subscribeUser(subscriber: Subscriber): void;
    handleSubscribeUser(response: ServiceResponse): void;
}
