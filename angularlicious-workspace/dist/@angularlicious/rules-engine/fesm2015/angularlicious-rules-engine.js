import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AngularliciousRulesEngineModule {
}
AngularliciousRulesEngineModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class defines the result of a single rule evaluation.
 */
class RuleResult {
    /**
     * Constructor for the RuleResult class.
     * @param {?} rulePolicy Use to specify the rule.
     * @param {?=} target Use to specify the target to be evaluated by the rule.
     */
    constructor(rulePolicy, target) {
        /**
         * Use to indicate if the rule result is valid or not.
         */
        this.isValid = false;
        if (rulePolicy != null) {
            this.rulePolicy = rulePolicy;
            this.isValid = rulePolicy.isValid;
            this.message = rulePolicy.message;
        }
        this.target = target;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const RenderType = {
    /**
       * Use to indicate the rule rendering stops when a rule's evaluation is false - rule contains violations.
       */
    ExitOnFirstFalseEvaluation: 0,
    /**
       * Use to indicate the rule rendering stops when a rule's evalution is true (no rule violations).
       */
    ExitOnFirstTrueEvaluation: 1,
    /**
       * Use to indicate that all rules of the rule set are rendered - returns all rule results.
       */
    EvaluateAllRules: 2,
};
RenderType[RenderType.ExitOnFirstFalseEvaluation] = "ExitOnFirstFalseEvaluation";
RenderType[RenderType.ExitOnFirstTrueEvaluation] = "ExitOnFirstTrueEvaluation";
RenderType[RenderType.EvaluateAllRules] = "EvaluateAllRules";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const Severity = {
    /**
       * Indicates the rule violation is an [Exception].
       */
    Exception: 0,
    /**
       * Indicates the rule violation is an [Warning].
       */
    Warning: 1,
    /**
       * Indicates the rule violation is an [Information].
       */
    Information: 2,
};
Severity[Severity.Exception] = "Exception";
Severity[Severity.Warning] = "Warning";
Severity[Severity.Information] = "Information";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
class RulePolicy {
    /**
     * Overloaded constructor for the [RulePolicy] class.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?=} isDisplayable
     * @param {?=} severity (Optional) Use to indicate the rule violation severity. Default is [Exception].
     * @param {?=} priority (Optional) Use to indciate the rule's evaluation priority. Higher numeric values are priority. 0 is default and lowest priority.
     */
    constructor(name, message, isDisplayable = false, severity = Severity.Exception, priority = 0) {
        /**
         * Use to indicate the status of the rule. Value is false when the rule contains violations.
         */
        this.isValid = true;
        /**
         * Use to determine how the rule is evaluated.
         */
        this.renderType = RenderType.EvaluateAllRules;
        /**
         * Use to indicate the severity for a rule violation. The default severity is [Exception].
         */
        this.severity = Severity.Exception;
        this.name = name;
        this.message = message;
        this.isDisplayable = isDisplayable;
        this.priority = priority;
        this.severity = severity;
    }
    /**
     * Use to execute the rule. This is the [template] method of the [template method] design
     * pattern. It will coordindate the execution of any required methods in the processing
     * pipeline.
     * @return {?}
     */
    execute() {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    }
    /**
     * Each rule must implement this function and return a valid [RuleResult].
     * @return {?}
     */
    render() {
        throw new Error('Each concrete rule must implement this function and return a valid Result.');
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
class CompositeRule extends RulePolicy {
    /**
     *
     * @param {?} name The name of the rule.
     * @param {?} message The message to display if the rule is violated.
     * @param {?} isDisplayable Indicates if the rule is displayable.
     */
    constructor(name, message, isDisplayable) {
        super(name, message, isDisplayable);
        /**
         * Indicates if the rule has any rule violations.
         */
        this.hasErrors = false;
        /**
         * A list of results for evaluated rules. Rules must be rendered/executed before
         * any results are available.
         */
        this.results = new Array();
        /**
         * A list of rules for the specified composite rule.
         */
        this.rules = new Array();
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        this.rules
            .sort(s => s.priority)
            .forEach(r => this.results.push(r.execute()));
        return this.processResults();
    }
    /**
     * Use to determine if the composite rule has child-rules that are
     * members of the specified rule.
     * @return {?}
     */
    hasRules() {
        if (this.rules && this.rules.length > 0) {
            return true;
        }
        return false;
    }
    /**
     * Use to process the results of the specified rule result collection. Composite
     * rules will have one or more rule results for all child-rules.
     *
     * This method will return result with the evaluation summary and rule information.
     * @return {?}
     */
    processResults() {
        if (this.results.filter(r => r.isValid === false).length > 0) {
            this.isValid = false;
            this.hasErrors = true;
        }
        return new RuleResult(this);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
class SimpleRule extends RulePolicy {
    /**
     * The constructor for the simple rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display if the rule is violated.
     * @param {?} isDisplayable
     */
    constructor(name, message, isDisplayable) {
        super(name, message, isDisplayable);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is [null] or [undefined].
 */
class IsNullOrUndefined extends SimpleRule {
    /**
     * The constructor for the [IsNullOrUndefined] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        if (this.target == null ||
            typeof this.target === undefined ||
            typeof this.target === 'undefined') {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is NOT [null] or [undefined].
 */
class IsNotNullOrUndefined extends SimpleRule {
    /**
     * The constructor for the [IsNotNullOrUndefined] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        if (this.target == null ||
            this.target === null ||
            typeof this.target === 'undefined') {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is truthy.
 */
class IsTrue extends SimpleRule {
    /**
     * The constructor for the [IsTrue] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, isDisplayable = true) {
        super(name, message, isDisplayable);
        this.target = target;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        this.isValid = true;
        if (this.target === false) {
            //if(not true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to indicate if the value is falsy.
 */
class IsFalse extends SimpleRule {
    /**
     * The constructor for the [IsFalse] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        if (this.target) {
            //if(true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [Min] rule to determine if the target value is equal to or greater than the minimum
 * allowed value [comparison].
 */
class Min extends SimpleRule {
    /**
     * The constructor for the [Min] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?} comparison The comparison target the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, comparison, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.comparison = comparison;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        const /** @type {?} */ compareResult = compare(this.target, this.comparison, true);
        if (compareResult === -1 /* Less */) {
            this.isValid = false; //must be equal to or greater than the comparison value;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [Max] rule to determine if the target value is equal to or less than
 * the comparison value.
 */
class Max extends SimpleRule {
    /**
     * The constructor for the [Max] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?} comparison The comparison target the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, comparison, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.comparison = comparison;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        const /** @type {?} */ compareResult = compare(this.target, this.comparison, true);
        if (compareResult === 1 /* Greater */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
class Range extends CompositeRule {
    /**
     * Constructor for the [Range] rule.
     * @param {?} name The name of the rule.
     * @param {?} message
     * @param {?} target The target object that the rules will be applied to.
     * @param {?} start The start range value - the lowest allowed boundary value.
     * @param {?} end The end range value - the highest allowed boundary value.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, start, end, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.start = start;
        this.end = end;
        this.isDisplayable = isDisplayable;
        this.rules.push(new IsNotNullOrUndefined('TargetIsNotNull', 'The target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Min('MinValue', 'The value must be equal to or greater than the start range value.', this.target, this.start));
            this.rules.push(new Max('MaxValue', 'The value must be equal to or less than the end range value.', this.target, this.end));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is equal to the comparison target.
 */
class AreEqual extends SimpleRule {
    /**
     * The constructor for the [AreEqualRule] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?} comparison The comparison target the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, comparison, isDisplayable = true) {
        super(name, message, isDisplayable);
        this.target = target;
        this.comparison = comparison;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        if (compare(this.target, this.comparison, true) !== 0 /* Equal */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is not equal to the comparison target.
 */
class AreNotEqual extends SimpleRule {
    /**
     * The constructor for the [AreNotEqualRule] rule.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rules are evaluated against.
     * @param {?} comparison The comparison target the rules are evaluated against.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, comparison, isDisplayable = true) {
        super(name, message, isDisplayable);
        this.target = target;
        this.comparison = comparison;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    render() {
        if (compare(this.target, this.comparison, true) === 0 /* Equal */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
class StringIsNotNullEmptyRange extends CompositeRule {
    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rule(s) will be evaluated against.
     * @param {?} minLength The minimum allowed length of the target value.
     * @param {?} maxLength The maximum allowed length of the target value.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, minLength, maxLength, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.configureRules();
    }
    /**
     * A helper method to configure/add rules to the validation context.
     * @return {?}
     */
    configureRules() {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Range('TargetLengthIsWithinRange', 'The string value is not within the specified range.', this.target.toString().length, this.minLength, this.maxLength));
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const MessageType = {
    /**
       * Use to indicate the message type is informational.
       */
    Information: 1,
    /**
       * Use to indicate the message type is warning.
       */
    Warning: 2,
    /**
       * Use to indicate the message type is error.
       */
    Error: 3,
};
MessageType[MessageType.Information] = "Information";
MessageType[MessageType.Warning] = "Warning";
MessageType[MessageType.Error] = "Error";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
class ServiceContext {
    constructor() {
        /**
         * A list of service messages added by the application during the processing of the
         * specified service request.
         */
        this.Messages = new Array();
    }
    /**
     * Use this method to add a new message to the [ServiceContext].
     * @param {?} message
     * @return {?}
     */
    addMessage(message) {
        this.Messages.push(message);
    }
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     * @return {?}
     */
    hasErrors() {
        if (this.Messages && this.Messages.length > 0) {
            const /** @type {?} */ errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
            if (errorMessages.length > 0) {
                return true;
            }
        }
        return false;
    }
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     * @return {?}
     */
    isGood() {
        if (this.Messages && this.Messages.length > 0) {
            const /** @type {?} */ errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
            if (errorMessages.length > 0) {
                return false;
            }
        }
        return true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to create a message for the current [ServiceContext].
 */
class ServiceMessage {
    /**
     *
     * @param {?} name The name of the message.
     * @param {?} message The display text of the message.
     * @param {?=} messageType
     * @param {?=} source
     * @param {?=} displayToUser Use to indicate if the specified message should be displayed to the user.
     */
    constructor(name, message, messageType, source, displayToUser = false) {
        this.Name = name;
        this.Message = message;
        if (message) {
            this.MessageType = /** @type {?} */ (messageType);
        }
        if (source) {
            this.Source = /** @type {?} */ (source);
        }
    }
    /**
     * Use this extension method to add the name of the message.
     * @param {?} name The name of the service message.
     * @return {?}
     */
    WithName(name) {
        this.Name = name;
        return this;
    }
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    WithMessage(message) {
        this.Message = message;
        return this;
    }
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    WithMessageType(messageType) {
        this.MessageType = messageType;
        return this;
    }
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    WithSource(source) {
        this.Source = source;
        return this;
    }
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    WithDisplayToUser(displayToUser) {
        this.DisplayToUser = displayToUser;
        return this;
    }
    /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    toString() {
        return `Name: ${this.Name}; Message: ${this.Message}; MessageType: ${this.MessageType.toString()}; Source: ${this.Source}; DisplayToUser: ${this.DisplayToUser}`;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const ValidationContextState = {
    /**
       * Indicates that no rules have been evaluated by the validation context.
       */
    NotEvaluated: 0,
    /** Use to indicate that all rules evaluated without any violations. */
    Success: 1,
    /** Use to indicate that one or more evaluated rules contain violations. */
    Failure: 2,
};
ValidationContextState[ValidationContextState.NotEvaluated] = "NotEvaluated";
ValidationContextState[ValidationContextState.Success] = "Success";
ValidationContextState[ValidationContextState.Failure] = "Failure";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
class ValidationContext {
    /**
     * The constructor for the base validation context.
     */
    constructor() {
        /**
         * Use to indicate the state of the validation context.
         */
        this.state = ValidationContextState.NotEvaluated;
        /**
         * A list of results for all evaluated rules that belong to the validation context.
         */
        this.results = new Array();
        /**
         * A list of rules for rendering.
         */
        this.rules = new Array();
        console.log('The [ValidationContext] is ready for action(s). All things are good until broken...');
    }
    /**
     * Use this method to add a new rule to the ValidationContext.
     * @param {?} rule
     * @return {?}
     */
    addRule(rule) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    }
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    withSource(source) {
        this.source = source;
        return this;
    }
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    renderRules() {
        this.results = new Array();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules
            .sort(r => r.priority)
            .forEach(r => this.results.push(r.execute()));
        return this;
    }
    /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    hasRuleViolations() {
        let /** @type {?} */ hasViolations = false;
        if (this.rules) {
            const /** @type {?} */ ruleViolationsCount = this.rules && this.rules.filter(r => r.isValid === false).length;
            if (ruleViolationsCount > 0) {
                hasViolations = true;
            }
        }
        return hasViolations;
    }
    /**
     * *Use to indicate if the validation context is valid - no rule violations.
     * @return {?}
     */
    get isValid() {
        let /** @type {?} */ isRuleValid = true;
        if (this.rules) {
            const /** @type {?} */ invalidRulesCount = this.rules.filter(r => r.isValid === false)
                .length;
            if (invalidRulesCount > 0) {
                isRuleValid = false;
            }
        }
        return isRuleValid;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousRulesEngineModule, RuleResult, RulePolicy, RenderType, CompositeRule, SimpleRule, IsNullOrUndefined, IsNotNullOrUndefined, IsTrue, IsFalse, Min, Max, Range, AreEqual, AreNotEqual, StringIsNotNullEmptyRange, Severity, ServiceContext, ServiceMessage, MessageType, ValidationContext, ValidationContextState };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy1lbmdpbmUubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUmVzdWx0LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUG9saWN5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgcmVzdWx0IG9mIGEgc2luZ2xlIHJ1bGUgZXZhbHVhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUmVzdWx0IHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cclxuICAgKi9cclxuICBpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZC5cclxuICAgKi9cclxuICBydWxlUG9saWN5OiBSdWxlUG9saWN5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcnVsZSBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoZSBldmFsdWF0aW9uIFtpc1ZhbGlkXSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxyXG4gICAqL1xyXG4gIHRhcmdldDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBVc2UgdG8gc3BlY2lmeSB0aGUgdGFyZ2V0IHRvIGJlIGV2YWx1YXRlZCBieSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IENvbXBvc2l0ZVJ1bGUpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldD86IGFueSkge1xyXG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJ1bGVQb2xpY3kgPSBydWxlUG9saWN5O1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBydWxlUG9saWN5LmlzVmFsaWQ7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcclxuICAgIH1cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJUnVsZUNvbXBvbmVudCB9IGZyb20gJy4vSVJ1bGVDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUmVuZGVyVHlwZSB9IGZyb20gJy4vUmVuZGVyVHlwZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnLi9TZXZlcml0eSc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIHJ1bGVzLiBBbGwgcnVsZXMgd2lsbCBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLiBOZXcgcnVsZXNcclxuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUG9saWN5IGltcGxlbWVudHMgSVJ1bGVDb21wb25lbnQge1xyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xyXG4gIGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xyXG4gIHJlc3VsdDogUnVsZVJlc3VsdDtcclxuXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cclxuICByZW5kZXJUeXBlOiBSZW5kZXJUeXBlID0gUmVuZGVyVHlwZS5FdmFsdWF0ZUFsbFJ1bGVzO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5ID0gU2V2ZXJpdHkuRXhjZXB0aW9uO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS5cclxuICAgKi9cclxuICBleGVjdXRlKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWFjaCBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFtSdWxlUmVzdWx0XS5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtDb21wb3NpdGVSdWxlXSBhcyBhIGJhc2UgY2xhc3MgZm9yIGEgY29tcGxleCBydWxlIC0gYSBydWxlIHRoYXQgY29udGFpbnNcclxuICogb3RoZXIgcnVsZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlUnVsZSBleHRlbmRzIFJ1bGVQb2xpY3kge1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyBpZiB0aGUgcnVsZSBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGV2YWx1YXRlZCBydWxlcy4gUnVsZXMgbXVzdCBiZSByZW5kZXJlZC9leGVjdXRlZCBiZWZvcmVcclxuICAgKiBhbnkgcmVzdWx0cyBhcmUgYXZhaWxhYmxlLlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgdGhlIHNwZWNpZmllZCBjb21wb3NpdGUgcnVsZS5cclxuICAgKi9cclxuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlIEluZGljYXRlcyBpZiB0aGUgcnVsZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIHRoaXMucnVsZXNcclxuICAgICAgLnNvcnQocyA9PiBzLnByaW9yaXR5KVxyXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzUmVzdWx0cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY29tcG9zaXRlIHJ1bGUgaGFzIGNoaWxkLXJ1bGVzIHRoYXQgYXJlXHJcbiAgICogbWVtYmVycyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgcHVibGljIGhhc1J1bGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb2Nlc3MgdGhlIHJlc3VsdHMgb2YgdGhlIHNwZWNpZmllZCBydWxlIHJlc3VsdCBjb2xsZWN0aW9uLiBDb21wb3NpdGVcclxuICAgKiBydWxlcyB3aWxsIGhhdmUgb25lIG9yIG1vcmUgcnVsZSByZXN1bHRzIGZvciBhbGwgY2hpbGQtcnVsZXMuXHJcbiAgICpcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiByZXN1bHQgd2l0aCB0aGUgZXZhbHVhdGlvbiBzdW1tYXJ5IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHByb2Nlc3NSZXN1bHRzKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKHRoaXMucmVzdWx0cy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIGFzIGEgYmFzZSBbZXh0ZW5kc10gY2xhc3MgZm9yIHNpbXBsZSBydWxlcy4gQSBzaW1wbGUgY29udGFpbnNcclxuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxyXG4gKlxyXG4gKiBJZiB5b3UgcmVxdWlyZSBhIHJ1bGUgdGhhdCB3aWxsIGNvbnRhaW4gbW9yZSB0aGFuIG9uZSBydWxlLCB5b3Ugc2hvdWxkXHJcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc2ltcGxlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBOT1QgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTm90TnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOb3ROdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxyXG4gICAgICB0aGlzLnRhcmdldCA9PT0gbnVsbCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIHRydXRoeS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc1RydWUgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc1RydWVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZmFsc2UpIHtcclxuICAgICAgLy9pZihub3QgdHJ1ZSktLT5mYWxzZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWx1ZSBpcyBmYWxzeS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc0ZhbHNlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSB0YXJnZXQgdmFsdWUgdG8gZXZhbHVhdGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNGYWxzZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAvL2lmKHRydWUpLS0+ZmFsc2U7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW01pbl0gcnVsZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCB2YWx1ZSBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1pbmltdW1cclxuICogYWxsb3dlZCB2YWx1ZSBbY29tcGFyaXNvbl0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWluIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNaW5dIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcclxuICAgIGlmIChjb21wYXJlUmVzdWx0ID09PSBDb21wYXJlUmVzdWx0Lkxlc3MpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7IC8vbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIGNvbXBhcmlzb24gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbTWF4XSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGxlc3MgdGhhblxyXG4gKiB0aGUgY29tcGFyaXNvbiB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXggZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW01heF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xyXG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuR3JlYXRlcikge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5pbXBvcnQgeyBJc05vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vSXNOb3ROdWxsT3JVbmRlZmluZWQnO1xyXG5pbXBvcnQgeyBNaW4gfSBmcm9tICcuL01pbic7XHJcbmltcG9ydCB7IE1heCB9IGZyb20gJy4vTWF4JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHRhcmdldCBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSAoc3RhcnQgYW5kIGVuZCkgdmFsdWVzLlxyXG4gKlxyXG4gKiBUaGUgcmFuZ2UgdmFsdWVzIGFyZSBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEV4OiAxIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMiBpcyB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyB2YWxpZC5cclxuICogRXg6IDAgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICogRXg6IDQgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZW5kIHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBlbmQ6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXJ0IHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBzdGFydDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgW3ByaW1pdGl2ZV0gdmFsdWUgdGhhdCB3aWxsIGJlIGV2YWx1YXRlZC4gVGhlIHZhbHVlXHJcbiAgICogbXVzdCBiZSB3aXRoaW4gdGhlIFtzdGFydF0gYW5kIHRoZSBbZW5kXSB2YWx1ZSB0byBiZSB2YWxpZC5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBbUmFuZ2VdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2U6IEEgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgcnVsZXMgd2lsbCBiZSBhcHBsaWVkIHRvLlxyXG4gICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgcmFuZ2UgdmFsdWUgLSB0aGUgbG93ZXN0IGFsbG93ZWQgYm91bmRhcnkgdmFsdWUuXHJcbiAgICogQHBhcmFtIGVuZCBUaGUgZW5kIHJhbmdlIHZhbHVlIC0gdGhlIGhpZ2hlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIG1heSBiZSBkaXNwbGF5ZWQgb3IgdmlzaWJsZSB0byB0aGUgY2FsbGVyIG9yIGNsaWVudC4gRGVmYXVsdCBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBzdGFydDogbnVtYmVyLFxyXG4gICAgZW5kOiBudW1iZXIsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XHJcblxyXG4gICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgJ1RhcmdldElzTm90TnVsbCcsXHJcbiAgICAgICAgJ1RoZSB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWluKFxyXG4gICAgICAgICAgJ01pblZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIHN0YXJ0IHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuc3RhcnRcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWF4KFxyXG4gICAgICAgICAgJ01heFZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBsZXNzIHRoYW4gdGhlIGVuZCByYW5nZSB2YWx1ZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICB0aGlzLmVuZFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBlcXVhbCB0byB0aGUgY29tcGFyaXNvbiB0YXJnZXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXJlRXF1YWwgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0FyZUVxdWFsUnVsZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSAhPT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgbm90IGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcmVOb3RFcXVhbCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbQXJlTm90RXF1YWxSdWxlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSkgPT09IENvbXBhcmVSZXN1bHQuRXF1YWwpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcclxuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcclxuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuL1JhbmdlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIHZhbGlkYXRlIGEgc3RyaW5nIHRhcmdldC4gQSB2YWxpZCBzdHJpbmcgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkOyBhbmQgaXRcclxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UgZXh0ZW5kcyBDb21wb3NpdGVSdWxlIHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvdmlkZSB0aGUgdGFyZ2V0IFtQcmltaXRpdmVdIHRvIGV2YWx1YXRlIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlUnVsZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlKHMpIHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIG1pbkxlbmd0aCBUaGUgbWluaW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xyXG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGNvbmZpZ3VyZS9hZGQgcnVsZXMgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuXHJcbiAgY29uZmlndXJlUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnU3RyaW5nSXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHN0cmluZyB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBSYW5nZShcclxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcclxuICAgICAgICAgICdUaGUgc3RyaW5nIHZhbHVlIGlzIG5vdCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQudG9TdHJpbmcoKS5sZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcclxuICAgICAgICAgIHRoaXMubWF4TGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJy4vU2VydmljZU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIG1hbmFnZSB0aGUgY29udGV4dCBvZiBhIHNpbmdsZSBzZXJ2aWNlIGNhbGwuIFRoaXNcclxuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcclxuICogb2YgYSBzZXJ2aWNlIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgdGhlXHJcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cclxuICAgKi9cclxuICBNZXNzYWdlczogQXJyYXk8U2VydmljZU1lc3NhZ2U+ID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IG1lc3NhZ2UgdG8gdGhlIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICovXHJcbiAgYWRkTWVzc2FnZShtZXNzYWdlOiBTZXJ2aWNlTWVzc2FnZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cclxuICAgKi9cclxuICBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxyXG4gICAqL1xyXG4gIGlzR29vZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlIHtcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuICovXHJcbiAgTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG1lc3NhZ2UuICovXHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIHNwZWNpZml5ICAqL1xyXG4gIE1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIFNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLiAqL1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBJbmRpY2F0ZXMgaWYgdGhlIG1lc3NhZ2UgaXMgZGlzcGxheWFibGUuXHJcbiAgICovXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZT86IHN0cmluZyxcclxuICAgIG1lc3NhZ2VUeXBlPzogTWVzc2FnZVR5cGUsXHJcbiAgICBzb3VyY2U/OiBzdHJpbmdcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXIgVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZyxcclxuICAgIGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgdGhpcy5OYW1lID0gbmFtZTtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XHJcbiAgICB9XHJcbiAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aE5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIGFkZCB0aGUgbWVzc2FnZSB0ZXh0IHRvIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbTWVzc2FnZVR5cGVdIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXHJcbiAgICovXHJcbiAgV2l0aE1lc3NhZ2VUeXBlKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbRGlzcGxheVRvVXNlcl0gaW5kaWNhdG9yIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgV2l0aERpc3BsYXlUb1VzZXIoZGlzcGxheVRvVXNlcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBOYW1lOiAke3RoaXMuTmFtZX07IE1lc3NhZ2U6ICR7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVxyXG4gICAgfTsgTWVzc2FnZVR5cGU6ICR7dGhpcy5NZXNzYWdlVHlwZS50b1N0cmluZygpfTsgU291cmNlOiAke1xyXG4gICAgICB0aGlzLlNvdXJjZVxyXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnLi9JVmFsaWRhdGlvbkNvbnRleHQnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dFN0YXRlIH0gZnJvbSAnLi9WYWxpZGF0aW9uQ29udGV4dFN0YXRlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4uL3J1bGVzL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IFZhbGlkYXRpb24gQ29udGV4dCBmb3IgeW91ciBhcHBsaWNhdGlvbi4gV2l0aCB0aGlzXHJcbiAqIGNvbnRleHQsIHlvdSBjYW4gYWRkIHJ1bGVzIGFuZCBldmFsdWF0ZSB0aGUgcnVsZXMuXHJcbiAqXHJcbiAqIEFmdGVyIHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkLCB5b3UgY2FuIHVzZSB0aGUgVmFsaWRhdGlvbiBDb250ZXh0IHRvIGRldGVybWluZSBpZiB0aGVyZSBhcmVcclxuICogYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29udGV4dCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBzdGF0ZSBvZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIHN0YXRlOiBWYWxpZGF0aW9uQ29udGV4dFN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5Ob3RFdmFsdWF0ZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBhbGwgZXZhbHVhdGVkIHJ1bGVzIHRoYXQgYmVsb25nIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciByZW5kZXJpbmcuXHJcbiAgICovXHJcbiAgcnVsZXM6IEFycmF5PFJ1bGVQb2xpY3k+ID0gbmV3IEFycmF5PFJ1bGVQb2xpY3k+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCB2YWxpZGF0aW9uIGNvbnRleHQgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGJhc2UgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICdUaGUgW1ZhbGlkYXRpb25Db250ZXh0XSBpcyByZWFkeSBmb3IgYWN0aW9uKHMpLiBBbGwgdGhpbmdzIGFyZSBnb29kIHVudGlsIGJyb2tlbi4uLidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IHJ1bGUgdG8gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxyXG4gICAqL1xyXG4gIGFkZFJ1bGUocnVsZTogUnVsZVBvbGljeSkge1xyXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHJ1bGUuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBmb3IgdGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqIEBwYXJhbSBzb3VyY2VcclxuICAgKi9cclxuICB3aXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdLlxyXG4gICAqL1xyXG4gIHJlbmRlclJ1bGVzKCkge1xyXG4gICAgdGhpcy5yZXN1bHRzID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzXHJcbiAgICAgIC5zb3J0KHIgPT4gci5wcmlvcml0eSlcclxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzUnVsZVZpb2xhdGlvbnMoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaGFzVmlvbGF0aW9ucyA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMucnVsZXMpIHtcclxuICAgICAgY29uc3QgcnVsZVZpb2xhdGlvbnNDb3VudCA9XHJcbiAgICAgICAgdGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aDtcclxuICAgICAgaWYgKHJ1bGVWaW9sYXRpb25zQ291bnQgPiAwKSB7XHJcbiAgICAgICAgaGFzVmlvbGF0aW9ucyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoYXNWaW9sYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogKlVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGlzIHZhbGlkIC0gbm8gcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzUnVsZVZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IGludmFsaWRSdWxlc0NvdW50ID0gdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKVxyXG4gICAgICAgIC5sZW5ndGg7XHJcbiAgICAgIGlmIChpbnZhbGlkUnVsZXNDb3VudCA+IDApIHtcclxuICAgICAgICBpc1J1bGVWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNSdWxlVmFsaWQ7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7WUFHQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQ3hCOzs7Ozs7Ozs7O0FDQ0Q7Ozs7OztJQXFDRSxZQUFZLFVBQXNCLEVBQUUsTUFBWTs7Ozt1QkFqQ3RDLEtBQUs7UUFrQ2IsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakREOzs7O0FBT0E7Ozs7Ozs7OztJQTRDRSxZQUNFLElBQVksRUFDWixPQUFlLEVB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