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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy1lbmdpbmUubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUmVzdWx0LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUG9saWN5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSByZXN1bHQgb2YgYSBzaW5nbGUgcnVsZSBldmFsdWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUnVsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cbiAgICovXG4gIGlzVmFsaWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkLlxuICAgKi9cbiAgcnVsZVBvbGljeTogUnVsZVBvbGljeTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGUgZXZhbHVhdGlvbiBbaXNWYWxpZF0gaXMgW2ZhbHNlXS5cbiAgICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxuICAgKi9cbiAgdGFyZ2V0OiBhbnk7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogQ29tcG9zaXRlUnVsZSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0PzogYW55KSB7XG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlUG9saWN5ID0gcnVsZVBvbGljeTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHJ1bGVQb2xpY3kuaXNWYWxpZDtcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFJlbmRlclR5cGUgfSBmcm9tICcuL1JlbmRlclR5cGUnO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xuICBpc1ZhbGlkID0gdHJ1ZTtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XG5cbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXG4gIGlzRGlzcGxheWFibGU6IGJvb2xlYW47XG5cbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cbiAgcmVuZGVyVHlwZTogUmVuZGVyVHlwZSA9IFJlbmRlclR5cGUuRXZhbHVhdGVBbGxSdWxlcztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xuICBzb3VyY2U6IHN0cmluZztcblxuICAvKipcbiAgICogT3ZlcmxvYWRlZCBjb25zdHJ1Y3RvciBmb3IgdGhlIFtSdWxlUG9saWN5XSBjbGFzcy5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcbiAgLyoqXG4gICAqIE92ZXJsb2FkZWQgY29uc3RydWN0b3IgZm9yIHRoZSBbUnVsZVBvbGljeV0gY2xhc3MuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxuICAgKiBAcGFyYW0gc2V2ZXJpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kaWNhdGUgdGhlIHJ1bGUgdmlvbGF0aW9uIHNldmVyaXR5LiBEZWZhdWx0IGlzIFtFeGNlcHRpb25dLlxuICAgKiBAcGFyYW0gcHJpb3JpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kY2lhdGUgdGhlIHJ1bGUncyBldmFsdWF0aW9uIHByaW9yaXR5LiBIaWdoZXIgbnVtZXJpYyB2YWx1ZXMgYXJlIHByaW9yaXR5LiAwIGlzIGRlZmF1bHQgYW5kIGxvd2VzdCBwcmlvcml0eS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbixcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBleGVjdXRlIHRoZSBydWxlLiBUaGlzIGlzIHRoZSBbdGVtcGxhdGVdIG1ldGhvZCBvZiB0aGUgW3RlbXBsYXRlIG1ldGhvZF0gZGVzaWduXG4gICAqIHBhdHRlcm4uIEl0IHdpbGwgY29vcmRpbmRhdGUgdGhlIGV4ZWN1dGlvbiBvZiBhbnkgcmVxdWlyZWQgbWV0aG9kcyBpbiB0aGUgcHJvY2Vzc2luZ1xuICAgKiBwaXBlbGluZS5cbiAgICovXG4gIGV4ZWN1dGUoKTogUnVsZVJlc3VsdCB7XG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFYWNoIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgW1J1bGVSZXN1bHRdLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi9SdWxlUG9saWN5JztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGFzIGEgYmFzZSBjbGFzcyBmb3IgYSBjb21wbGV4IHJ1bGUgLSBhIHJ1bGUgdGhhdCBjb250YWluc1xuICogb3RoZXIgcnVsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXG4gICAqL1xuICBoYXNFcnJvcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGV2YWx1YXRlZCBydWxlcy4gUnVsZXMgbXVzdCBiZSByZW5kZXJlZC9leGVjdXRlZCBiZWZvcmVcbiAgICogYW55IHJlc3VsdHMgYXJlIGF2YWlsYWJsZS5cbiAgICovXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgdGhlIHNwZWNpZmllZCBjb21wb3NpdGUgcnVsZS5cbiAgICovXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGUgSW5kaWNhdGVzIGlmIHRoZSBydWxlIGlzIGRpc3BsYXlhYmxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGlzRGlzcGxheWFibGU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICB0aGlzLnJ1bGVzXG4gICAgICAuc29ydChzID0+IHMucHJpb3JpdHkpXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21wb3NpdGUgcnVsZSBoYXMgY2hpbGQtcnVsZXMgdGhhdCBhcmVcbiAgICogbWVtYmVycyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuXG4gICAqL1xuICBwdWJsaWMgaGFzUnVsZXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBwcm9jZXNzIHRoZSByZXN1bHRzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZSByZXN1bHQgY29sbGVjdGlvbi4gQ29tcG9zaXRlXG4gICAqIHJ1bGVzIHdpbGwgaGF2ZSBvbmUgb3IgbW9yZSBydWxlIHJlc3VsdHMgZm9yIGFsbCBjaGlsZC1ydWxlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcmVzdWx0IHdpdGggdGhlIGV2YWx1YXRpb24gc3VtbWFyeSBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHByb2Nlc3NSZXN1bHRzKCk6IFJ1bGVSZXN1bHQge1xuICAgIGlmICh0aGlzLnJlc3VsdHMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgYXMgYSBiYXNlIFtleHRlbmRzXSBjbGFzcyBmb3Igc2ltcGxlIHJ1bGVzLiBBIHNpbXBsZSBjb250YWluc1xuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxuICpcbiAqIElmIHlvdSByZXF1aXJlIGEgcnVsZSB0aGF0IHdpbGwgY29udGFpbiBtb3JlIHRoYW4gb25lIHJ1bGUsIHlvdSBzaG91bGRcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIHNpbXBsZSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIFtudWxsXSBvciBbdW5kZWZpbmVkXS5cbiAqL1xuZXhwb3J0IGNsYXNzIElzTnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cbiAgICovXG4gIHRhcmdldDtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzTnVsbE9yVW5kZWZpbmVkXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogYW55LFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIE5PVCBbbnVsbF0gb3IgW3VuZGVmaW5lZF0uXG4gKi9cbmV4cG9ydCBjbGFzcyBJc05vdE51bGxPclVuZGVmaW5lZCBleHRlbmRzIFNpbXBsZVJ1bGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXG4gICAqL1xuICB0YXJnZXQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc05vdE51bGxPclVuZGVmaW5lZF0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxuICAgICAgdGhpcy50YXJnZXQgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyB0cnV0aHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJc1RydWUgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxuICAgKi9cbiAgdGFyZ2V0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNUcnVlXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBib29sZWFuLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMudGFyZ2V0ID09PSBmYWxzZSkge1xuICAgICAgLy9pZihub3QgdHJ1ZSktLT5mYWxzZTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsdWUgaXMgZmFsc3kuXG4gKi9cbmV4cG9ydCBjbGFzcyBJc0ZhbHNlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHRhcmdldCB2YWx1ZSB0byBldmFsdWF0ZS5cbiAgICovXG4gIHRhcmdldDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzRmFsc2VdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBib29sZWFuLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgIC8vaWYodHJ1ZSktLT5mYWxzZTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuLyoqXG4gKiBVc2UgdGhlIFtNaW5dIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgdmFsdWUgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHRoZSBtaW5pbXVtXG4gKiBhbGxvd2VkIHZhbHVlIFtjb21wYXJpc29uXS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbiBleHRlbmRzIFNpbXBsZVJ1bGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICB0YXJnZXQ6IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxuICAgKi9cbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbTWluXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgY29uc3QgY29tcGFyZVJlc3VsdCA9IGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSk7XG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuTGVzcykge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7IC8vbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIGNvbXBhcmlzb24gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG4vKipcbiAqIFVzZSB0aGUgW01heF0gcnVsZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCB2YWx1ZSBpcyBlcXVhbCB0byBvciBsZXNzIHRoYW5cbiAqIHRoZSBjb21wYXJpc29uIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgTWF4IGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNYXhdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcbiAgICBpZiAoY29tcGFyZVJlc3VsdCA9PT0gQ29tcGFyZVJlc3VsdC5HcmVhdGVyKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4vTWluJztcbmltcG9ydCB7IE1heCB9IGZyb20gJy4vTWF4JztcblxuLyoqXG4gKiBVc2UgdGhpcyBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHRhcmdldCBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSAoc3RhcnQgYW5kIGVuZCkgdmFsdWVzLlxuICpcbiAqIFRoZSByYW5nZSB2YWx1ZXMgYXJlIGluY2x1c2l2ZS5cbiAqXG4gKiBFeDogMSBpcyB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyB2YWxpZC5cbiAqIEV4OiAyIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxuICogRXg6IDAgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cbiAqIEV4OiA0IGlzIG5vdCB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyBub3QgdmFsaWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xuICAvKipcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBlbmQgdmFsdWUgb2YgdGhlIHJhbmdlLlxuICAgKi9cbiAgZW5kOiBudW1iZXI7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXJ0IHZhbHVlIG9mIHRoZSByYW5nZS5cbiAgICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIFtwcmltaXRpdmVdIHZhbHVlIHRoYXQgd2lsbCBiZSBldmFsdWF0ZWQuIFRoZSB2YWx1ZVxuICAgKiBtdXN0IGJlIHdpdGhpbiB0aGUgW3N0YXJ0XSBhbmQgdGhlIFtlbmRdIHZhbHVlIHRvIGJlIHZhbGlkLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgW1JhbmdlXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2U6IEEgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHJ1bGVzIHdpbGwgYmUgYXBwbGllZCB0by5cbiAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCByYW5nZSB2YWx1ZSAtIHRoZSBsb3dlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cbiAgICogQHBhcmFtIGVuZCBUaGUgZW5kIHJhbmdlIHZhbHVlIC0gdGhlIGhpZ2hlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IChPcHRpb25hbCkgSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBtYXkgYmUgZGlzcGxheWVkIG9yIHZpc2libGUgdG8gdGhlIGNhbGxlciBvciBjbGllbnQuIERlZmF1bHQgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgc3RhcnQ6IG51bWJlcixcbiAgICBlbmQ6IG51bWJlcixcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XG5cbiAgICB0aGlzLnJ1bGVzLnB1c2goXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXG4gICAgICAgICdUYXJnZXRJc05vdE51bGwnLFxuICAgICAgICAnVGhlIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxuICAgICAgICB0aGlzLnRhcmdldFxuICAgICAgKVxuICAgICk7XG5cbiAgICBpZiAodGhpcy50YXJnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxuICAgICAgICBuZXcgTWluKFxuICAgICAgICAgICdNaW5WYWx1ZScsXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc3RhcnQgcmFuZ2UgdmFsdWUuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldCxcbiAgICAgICAgICB0aGlzLnN0YXJ0XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICB0aGlzLnJ1bGVzLnB1c2goXG4gICAgICAgIG5ldyBNYXgoXG4gICAgICAgICAgJ01heFZhbHVlJyxcbiAgICAgICAgICAnVGhlIHZhbHVlIG11c3QgYmUgZXF1YWwgdG8gb3IgbGVzcyB0aGFuIHRoZSBlbmQgcmFuZ2UgdmFsdWUuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldCxcbiAgICAgICAgICB0aGlzLmVuZFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFyZUVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVFcXVhbFJ1bGVdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgaWYgKGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSkgIT09IENvbXBhcmVSZXN1bHQuRXF1YWwpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuLyoqXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgbm90IGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFyZU5vdEVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVOb3RFcXVhbFJ1bGVdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgaXMgW3RydWVdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSA9PT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJy4vUmFuZ2UnO1xuXG4vKipcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gdmFsaWRhdGUgYSBzdHJpbmcgdGFyZ2V0LiBBIHZhbGlkIHN0cmluZyBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQ7IGFuZCBpdFxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xuICAvKipcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxuICAgKi9cbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxuICAgKi9cbiAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFVzZSB0byBwcm92aWRlIHRoZSB0YXJnZXQgW1ByaW1pdGl2ZV0gdG8gZXZhbHVhdGUgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZVJ1bGVdLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZShzKSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gbWluTGVuZ3RoIFRoZSBtaW5pbXVtIGFsbG93ZWQgbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXG4gICAgbWF4TGVuZ3RoOiBudW1iZXIsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgaGVscGVyIG1ldGhvZCB0byBjb25maWd1cmUvYWRkIHJ1bGVzIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqL1xuXG4gIGNvbmZpZ3VyZVJ1bGVzKCkge1xuICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcbiAgICAgICAgJ1N0cmluZ0lzTm90TnVsbCcsXG4gICAgICAgICdUaGUgc3RyaW5nIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxuICAgICAgICB0aGlzLnRhcmdldFxuICAgICAgKVxuICAgICk7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgICAgbmV3IFJhbmdlKFxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcbiAgICAgICAgICAnVGhlIHN0cmluZyB2YWx1ZSBpcyBub3Qgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldC50b1N0cmluZygpLmxlbmd0aCxcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcbiAgICAgICAgICB0aGlzLm1heExlbmd0aFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICcuL1NlcnZpY2VNZXNzYWdlJztcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gbWFuYWdlIHRoZSBjb250ZXh0IG9mIGEgc2luZ2xlIHNlcnZpY2UgY2FsbC4gVGhpc1xuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcbiAqIG9mIGEgc2VydmljZSByZXF1ZXN0LlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xuICAvKipcbiAgICogQSBsaXN0IG9mIHNlcnZpY2UgbWVzc2FnZXMgYWRkZWQgYnkgdGhlIGFwcGxpY2F0aW9uIGR1cmluZyB0aGUgcHJvY2Vzc2luZyBvZiB0aGVcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cbiAgICovXG4gIE1lc3NhZ2VzOiBBcnJheTxTZXJ2aWNlTWVzc2FnZT4gPSBuZXcgQXJyYXk8U2VydmljZU1lc3NhZ2U+KCk7XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhZGQgYSBuZXcgbWVzc2FnZSB0byB0aGUgW1NlcnZpY2VDb250ZXh0XS5cbiAgICovXG4gIGFkZE1lc3NhZ2UobWVzc2FnZTogU2VydmljZU1lc3NhZ2UpIHtcbiAgICB0aGlzLk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cbiAgICovXG4gIGhhc0Vycm9ycygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZXMgPSB0aGlzLk1lc3NhZ2VzLmZpbHRlcihcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxuICAgICAgKTtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxuICAgKi9cbiAgaXNHb29kKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXG4gICAgICApO1xuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xuXG4vKipcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIGNyZWF0ZSBhIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZSB7XG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZS4gKi9cbiAgTmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbWVzc2FnZS4gKi9cbiAgTWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gc3BlY2lmaXkgICovXG4gIE1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuICovXG4gIFNvdXJjZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuICovXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXI6IEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5YWJsZS5cbiAgICovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcbiAgICBzb3VyY2U/OiBzdHJpbmdcbiAgKTtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcbiAgICBzb3VyY2U/OiBzdHJpbmdcbiAgKTtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXIgVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxuICAgIHNvdXJjZT86IHN0cmluZyxcbiAgICBkaXNwbGF5VG9Vc2VyOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5OYW1lID0gbmFtZTtcbiAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XG4gICAgfVxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXG4gICAqL1xuICBXaXRoTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBtZXNzYWdlIHRleHQgdG8gdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cbiAgICovXG4gIFdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtNZXNzYWdlVHlwZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXG4gICAqL1xuICBXaXRoTWVzc2FnZVR5cGUobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXG4gICAqL1xuICBXaXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtEaXNwbGF5VG9Vc2VyXSBpbmRpY2F0b3Igb2YgdGhlIFNlcnZpY2VNZXNzYWdlLlxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXG4gICAqL1xuICBXaXRoRGlzcGxheVRvVXNlcihkaXNwbGF5VG9Vc2VyOiBib29sZWFuKSB7XG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgU2VydmljZU1lc3NhZ2UuXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYE5hbWU6ICR7dGhpcy5OYW1lfTsgTWVzc2FnZTogJHtcbiAgICAgIHRoaXMuTWVzc2FnZVxuICAgIH07IE1lc3NhZ2VUeXBlOiAke3RoaXMuTWVzc2FnZVR5cGUudG9TdHJpbmcoKX07IFNvdXJjZTogJHtcbiAgICAgIHRoaXMuU291cmNlXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnLi9JVmFsaWRhdGlvbkNvbnRleHQnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJy4vVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVBvbGljeSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IFZhbGlkYXRpb24gQ29udGV4dCBmb3IgeW91ciBhcHBsaWNhdGlvbi4gV2l0aCB0aGlzXG4gKiBjb250ZXh0LCB5b3UgY2FuIGFkZCBydWxlcyBhbmQgZXZhbHVhdGUgdGhlIHJ1bGVzLlxuICpcbiAqIEFmdGVyIHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkLCB5b3UgY2FuIHVzZSB0aGUgVmFsaWRhdGlvbiBDb250ZXh0IHRvIGRldGVybWluZSBpZiB0aGVyZSBhcmVcbiAqIGFueSBydWxlIHZpb2xhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29udGV4dCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29udGV4dCB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXRlIG9mIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqL1xuICBzdGF0ZTogVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuTm90RXZhbHVhdGVkO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgYWxsIGV2YWx1YXRlZCBydWxlcyB0aGF0IGJlbG9uZyB0byB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxuICAgKi9cbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciByZW5kZXJpbmcuXG4gICAqL1xuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcblxuICAvKipcbiAgICogVGhlIHNvdXJjZSBvZiB0aGUgc3BlY2lmaWVkIHZhbGlkYXRpb24gY29udGV4dCBpbnN0YW5jZS5cbiAgICovXG4gIHNvdXJjZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBiYXNlIHZhbGlkYXRpb24gY29udGV4dC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ1RoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGlzIHJlYWR5IGZvciBhY3Rpb24ocykuIEFsbCB0aGluZ3MgYXJlIGdvb2QgdW50aWwgYnJva2VuLi4uJ1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBydWxlIHRvIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cbiAgICovXG4gIGFkZFJ1bGUocnVsZTogUnVsZVBvbGljeSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgcnVsZS5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICB9XG4gICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBmb3IgdGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBjb250ZXh0LlxuICAgKiBAcGFyYW0gc291cmNlXG4gICAqL1xuICB3aXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdLlxuICAgKi9cbiAgcmVuZGVyUnVsZXMoKSB7XG4gICAgdGhpcy5yZXN1bHRzID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhpcy5ydWxlc1xuICAgICAgLnNvcnQociA9PiByLnByaW9yaXR5KVxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cbiAgICovXG4gIGhhc1J1bGVWaW9sYXRpb25zKCk6IGJvb2xlYW4ge1xuICAgIGxldCBoYXNWaW9sYXRpb25zID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucnVsZXMpIHtcbiAgICAgIGNvbnN0IHJ1bGVWaW9sYXRpb25zQ291bnQgPVxuICAgICAgICB0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoO1xuICAgICAgaWYgKHJ1bGVWaW9sYXRpb25zQ291bnQgPiAwKSB7XG4gICAgICAgIGhhc1Zpb2xhdGlvbnMgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGFzVmlvbGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiAqVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaXMgdmFsaWQgLSBubyBydWxlIHZpb2xhdGlvbnMuXG4gICAqL1xuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICBsZXQgaXNSdWxlVmFsaWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnJ1bGVzKSB7XG4gICAgICBjb25zdCBpbnZhbGlkUnVsZXNDb3VudCA9IHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSlcbiAgICAgICAgLmxlbmd0aDtcbiAgICAgIGlmIChpbnZhbGlkUnVsZXNDb3VudCA+IDApIHtcbiAgICAgICAgaXNSdWxlVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzUnVsZVZhbGlkO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7O1lBR0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQzthQUN4Qjs7Ozs7Ozs7OztBQ0NEOzs7Ozs7SUFxQ0UsWUFBWSxVQUFzQixFQUFFLE1BQVk7Ozs7dUJBakN0QyxLQUFLO1FBa0NiLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pERDs7OztBQU9BOzs7Ozs7Ozs7SUE0Q0UsWUFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLGdCQUF5QixLQUFLLEVBQzlCLFdBQXFCLFFBQVEsQ0FBQyxTQUFTLEVBQ3ZDLFdBQW1CLENBQUM7Ozs7dUJBL0NaLElBQUk7Ozs7MEJBa0JXLFVBQVUsQ0FBQyxnQkFBZ0I7Ozs7d0JBRy9CLFFBQVEsQ0FBQyxTQUFTO1FBNEJyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUMxQjs7Ozs7OztJQU9ELE9BQU87UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFLRCxNQUFNO1FBQ0osTUFBTSxJQUFJLEtBQUssQ0FDYiw0RUFBNEUsQ0FDN0UsQ0FBQztLQUNIO0NBQ0Y7Ozs7OztBQ3JGRDs7OztBQU9BLG1CQUEyQixTQUFRLFVBQVU7Ozs7Ozs7SUF1QjNDLFlBQVksSUFBWSxFQUFFLE9BQWUsRUFBRSxhQUFzQjtRQUMvRCxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozt5QkFwQjFCLEtBQUs7Ozs7O3VCQU1ZLElBQUksS0FBSyxFQUFjOzs7O3FCQUt6QixJQUFJLEtBQUssRUFBYztLQVVqRDs7Ozs7O0lBTUQsTUFBTTtRQUNKLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7O0lBTU0sUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDOzs7Ozs7Ozs7SUFTZixjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtDQUNGOzs7Ozs7QUNyRUQ7Ozs7Ozs7QUFTQSxnQkFBd0IsU0FBUSxVQUFVOzs7Ozs7O0lBTXhDLFlBQVksSUFBWSxFQUFFLE9BQWUsRUFBRSxhQUFzQjtRQUMvRCxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztLQUNyQztDQUNGOzs7Ozs7QUNsQkQ7OztBQU1BLHVCQUErQixTQUFRLFVBQVU7Ozs7Ozs7O0lBYS9DLFlBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFXLEVBQ1gsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7Ozs7OztJQU1ELE1BQU07UUFDSixJQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssV0FDekIsRUFBRTtZQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztDQUNGOzs7Ozs7QUM3Q0Q7OztBQU1BLDBCQUFrQyxTQUFRLFVBQVU7Ozs7Ozs7O0lBYWxELFlBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFXLEVBQ1gsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7Ozs7OztJQU1ELE1BQU07UUFDSixJQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNuQixJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7WUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQ3pCLEVBQUU7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztDQUNGOzs7Ozs7QUMzQ0Q7OztBQU1BLFlBQW9CLFNBQVEsVUFBVTs7Ozs7Ozs7SUFhcEMsWUFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLE1BQWUsRUFDZixnQkFBeUIsSUFBSTtRQUU3QixLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7O0lBTUQsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7O1lBRXpCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO0NBQ0Y7Ozs7OztBQ3pDRDs7O0FBTUEsYUFBcUIsU0FBUSxVQUFVOzs7Ozs7OztJQWFyQyxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBZSxFQUNmLGdCQUF5QixLQUFLO1FBRTlCLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCOzs7Ozs7SUFNRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztZQUVmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO0NBQ0Y7Ozs7OztBQ3ZDRDs7OztBQVVBLFNBQWlCLFNBQVEsVUFBVTs7Ozs7Ozs7O0lBbUJqQyxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBaUIsRUFDakIsVUFBcUIsRUFDckIsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7OztJQU1ELE1BQU07UUFDSix1QkFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLGFBQWEsb0JBQXlCO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO0NBQ0Y7Ozs7OztBQ3BERDs7OztBQVVBLFNBQWlCLFNBQVEsVUFBVTs7Ozs7Ozs7O0lBbUJqQyxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBaUIsRUFDakIsVUFBcUIsRUFDckIsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7OztJQU1ELE1BQU07UUFDSix1QkFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLGFBQWEsc0JBQTRCO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO0NBQ0Y7Ozs7OztBQzlDRDs7Ozs7Ozs7OztBQWVBLFdBQW1CLFNBQVEsYUFBYTs7Ozs7Ozs7OztJQXdCdEMsWUFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLE1BQWlCLEVBQ2pCLEtBQWEsRUFDYixHQUFXLEVBQ1gsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLG9CQUFvQixDQUN0QixpQkFBaUIsRUFDakIsa0NBQWtDLEVBQ2xDLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FDRixDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLEdBQUcsQ0FDTCxVQUFVLEVBQ1YsbUVBQW1FLEVBQ25FLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEtBQUssQ0FDWCxDQUNGLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLEdBQUcsQ0FDTCxVQUFVLEVBQ1YsOERBQThELEVBQzlELElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FDVCxDQUNGLENBQUM7U0FDSDtLQUNGO0NBQ0Y7Ozs7OztBQ3RGRDs7O0FBU0EsY0FBc0IsU0FBUSxVQUFVOzs7Ozs7Ozs7SUFtQnRDLFlBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFpQixFQUNqQixVQUFxQixFQUNyQixnQkFBeUIsSUFBSTtRQUU3QixLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7Ozs7O0lBTUQsTUFBTTtRQUNKLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsb0JBQTBCO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO0NBQ0Y7Ozs7OztBQ2xERDs7O0FBU0EsaUJBQXlCLFNBQVEsVUFBVTs7Ozs7Ozs7O0lBbUJ6QyxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBaUIsRUFDakIsVUFBcUIsRUFDckIsZ0JBQXlCLElBQUk7UUFFN0IsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7OztJQU1ELE1BQU07UUFDSixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLG9CQUEwQjtZQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQztDQUNGOzs7Ozs7QUM1Q0Q7Ozs7QUFRQSwrQkFBdUMsU0FBUSxhQUFhOzs7Ozs7Ozs7O0lBd0IxRCxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBaUIsRUFDakIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsZ0JBQXlCLEtBQUs7UUFFOUIsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ3ZCOzs7OztJQU1ELGNBQWM7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLG9CQUFvQixDQUN0QixpQkFBaUIsRUFDakIseUNBQXlDLEVBQ3pDLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FDRixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLEtBQUssQ0FDUCwyQkFBMkIsRUFDM0IscURBQXFELEVBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUM3QixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FDRixDQUFDO1NBQ0g7S0FDRjtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFRDs7Ozs7QUFPQTs7Ozs7O3dCQUtvQyxJQUFJLEtBQUssRUFBa0I7Ozs7Ozs7SUFLN0QsVUFBVSxDQUFDLE9BQXVCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdCOzs7OztJQUtELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLHVCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDeEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLEtBQUssQ0FDekMsQ0FBQztZQUNGLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7O0lBS0QsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0MsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUN4QyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsS0FBSyxDQUN6QyxDQUFDO1lBQ0YsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjtDQUNGOzs7Ozs7Ozs7QUM5Q0Q7Ozs7Ozs7OztJQW9ERSxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsV0FBeUIsRUFDekIsTUFBZSxFQUNmLGdCQUF5QixLQUFLO1FBRTlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFdBQVcscUJBQUcsV0FBMEIsQ0FBQSxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsTUFBTSxxQkFBRyxNQUFnQixDQUFBLENBQUM7U0FDaEM7S0FDRjs7Ozs7O0lBTUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsV0FBVyxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsZUFBZSxDQUFDLFdBQXdCO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQU1ELFVBQVUsQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQU1ELGlCQUFpQixDQUFDLGFBQXNCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBS0QsUUFBUTtRQUNOLE9BQU8sU0FBUyxJQUFJLENBQUMsSUFBSSxjQUN2QixJQUFJLENBQUMsT0FDUCxrQkFBa0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFDM0MsSUFBSSxDQUFDLE1BQ1Asb0JBQW9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUMxQztDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaElEOzs7Ozs7O0FBV0E7Ozs7SUF3QkU7Ozs7cUJBcEJnQyxzQkFBc0IsQ0FBQyxZQUFZOzs7O3VCQUt0QyxJQUFJLEtBQUssRUFBYzs7OztxQkFLekIsSUFBSSxLQUFLLEVBQWM7UUFXaEQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxxRkFBcUYsQ0FDdEYsQ0FBQztLQUNIOzs7Ozs7SUFLRCxPQUFPLENBQUMsSUFBZ0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsVUFBVSxDQUFDLE1BQWM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFLRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztJQUtELGlCQUFpQjtRQUNmLHFCQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsdUJBQU0sbUJBQW1CLEdBQ3ZCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ25FLElBQUksbUJBQW1CLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1NBQ0Y7UUFDRCxPQUFPLGFBQWEsQ0FBQztLQUN0Qjs7Ozs7SUFLRCxJQUFJLE9BQU87UUFDVCxxQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLHVCQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQztpQkFDbEUsTUFBTSxDQUFDO1lBQ1YsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDckI7U0FDRjtRQUNELE9BQU8sV0FBVyxDQUFDO0tBQ3BCO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7OyJ9