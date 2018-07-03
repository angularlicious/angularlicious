import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { ServiceResponse } from '@angularlicious/foundation';
import { Subscriber } from './../../models/subscriber.model';
import { SecurityActionBase } from './security-action-base.action';
export declare class RegisterSubscriberAction extends SecurityActionBase {
    private subscriber;
    response: Observable<ServiceResponse>;
    constructor(subscriber: Subscriber);
    /**
     * Override this method from the base [Action] class to allow for rules to be added to the
     * action's [ValidationContext]. Any rules added to the [ValidationContext] here will be executed when
     * the action's [ValidateAction] method is called - this method is just one of many pipeline methods
     * of the [Action] framework.
     */
    preValidateAction(): void;
    /**
     * Use this method to provide business logic implementation - this method is allowed to execute only if the current action
     * does not contain any rule violations.
     */
    performAction(): void;
}
