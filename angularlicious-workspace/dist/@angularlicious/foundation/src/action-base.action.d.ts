import { Observable } from 'rxjs';
import { Action } from '@angularlicious/actions';
import { ValidationContext } from '@angularlicious/rules-engine';
import { ServiceContext } from '@angularlicious/rules-engine';
import { ActionResult } from '@angularlicious/actions';
import { RuleResult } from '@angularlicious/rules-engine';
import { AngularliciousLoggingService } from '@angularlicious/logging';
import { HttpBaseService } from './http-base.service';
/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */
export declare class ActionBase extends Action {
    serviceContext: ServiceContext;
    response: Observable<any>;
    httpBase: HttpBaseService;
    loggingService: AngularliciousLoggingService;
    actionName: string;
    /**
     * This is a required implementation if you want to render/execute the rules that
     * are associated to the specified action.
     */
    validateAction(): ValidationContext;
    postValidateAction(): void;
    postExecuteAction(): void;
    /**
     * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
     */
    validateActionResult(): ActionResult;
    /**
     * Use to process rule results for composite rules. Note, that this function is recursive
     * and will process all composite rules in the rule set contained in the ValidationContext.
     * @param ruleResult The result of a rendered rule.
     */
    retrieveRuleDetails(ruleResult: RuleResult): void;
    /**
     * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
     * @param ruleResult
     */
    publishRuleResult(ruleResult: RuleResult): void;
}
