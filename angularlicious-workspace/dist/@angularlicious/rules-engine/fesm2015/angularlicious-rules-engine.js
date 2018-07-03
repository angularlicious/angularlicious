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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy1lbmdpbmUubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9SdWxlUmVzdWx0LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9SdWxlUG9saWN5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgcmVzdWx0IG9mIGEgc2luZ2xlIHJ1bGUgZXZhbHVhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUmVzdWx0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBydWxlIHJlc3VsdCBpcyB2YWxpZCBvciBub3QuIFxyXG4gICAqL1xyXG4gIGlzVmFsaWQgPSBmYWxzZTtcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgcnVsZSB0aGF0IHdhcyBldmFsdWF0ZWQuXHJcbiAgICovXHJcbiAgcnVsZVBvbGljeTogUnVsZVBvbGljeTtcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgcnVsZSBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoZSBldmFsdWF0aW9uIFtpc1ZhbGlkXSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGl0ZW0gdGhhdCB3YXMgZXZhbHVhdGVkIGJ5IHRoZSBzcGVjaWZpZWQgcnVsZSBwb2xpY3kuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldDogYW55KTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogQ29tcG9zaXRlUnVsZSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0PzogYW55KSB7XHJcbiAgICBpZiAocnVsZVBvbGljeSAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZVBvbGljeSA9IHJ1bGVQb2xpY3k7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHJ1bGVQb2xpY3kuaXNWYWxpZDtcclxuICAgICAgdGhpcy5tZXNzYWdlID0gcnVsZVBvbGljeS5tZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSZW5kZXJUeXBlIH0gZnJvbSAnLi9SZW5kZXJUeXBlJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xyXG4gKiBzaG91bGQgZXh0ZW5kIFtTaW1wbGVSdWxlXSBvciBbQ29tcG9zaXRlUnVsZV0gLSB0aGVzZSBydWxlIGFic3RyYWN0aW9ucyBleHRlbmQgW1J1bGVQb2xpY3ldLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhdHVzIG9mIHRoZSBydWxlLiBWYWx1ZSBpcyBmYWxzZSB3aGVuIHRoZSBydWxlIGNvbnRhaW5zIHZpb2xhdGlvbnMuICovXHJcbiAgaXNWYWxpZCA9IHRydWU7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZGlzcGxheSBtZXNzYWdlIGZvciBhIHJ1bGUgdmlvbGF0aW9uLiAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgcHJpb3JpdHkgdmFsdWUgb2YgdGhlIHJ1bGUuIEhpZ2hlciBwcmlvcml0eSB2YWx1ZXMgYXJlIGV2YWx1YXRlZCBmaXJzdC4gKi9cclxuICBwcmlvcml0eTogbnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBUaGUgc3BlY2lmaWVkIHJ1bGVzIHJlc3VsdC4gKi9cclxuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuICBcclxuICAvKiogVXNlIHRvIGRldGVybWluZSBob3cgdGhlIHJ1bGUgaXMgZXZhbHVhdGVkLiAqL1xyXG4gIHJlbmRlclR5cGU6IFJlbmRlclR5cGUgPSBSZW5kZXJUeXBlLkV2YWx1YXRlQWxsUnVsZXM7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc2V2ZXJpdHkgZm9yIGEgcnVsZSB2aW9sYXRpb24uIFRoZSBkZWZhdWx0IHNldmVyaXR5IGlzIFtFeGNlcHRpb25dLiAqL1xyXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS4gXHJcbiAgICovXHJcbiAgZXhlY3V0ZSgpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnNvbGUubG9nKCdCZWdpbiBleGVjdXRpb24gb2YgUnVsZVBvbGljeTogJyArIHRoaXMubmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVhY2ggcnVsZSBtdXN0IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIGFuZCByZXR1cm4gYSB2YWxpZCBbUnVsZVJlc3VsdF0uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnRWFjaCBjb25jcmV0ZSBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFJlc3VsdC4nXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi9SdWxlUG9saWN5JztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbQ29tcG9zaXRlUnVsZV0gYXMgYSBiYXNlIGNsYXNzIGZvciBhIGNvbXBsZXggcnVsZSAtIGEgcnVsZSB0aGF0IGNvbnRhaW5zXHJcbiAqIG90aGVyIHJ1bGVzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBydWxlIGhhcyBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgZXZhbHVhdGVkIHJ1bGVzLiBSdWxlcyBtdXN0IGJlIHJlbmRlcmVkL2V4ZWN1dGVkIGJlZm9yZSBcclxuICAgKiBhbnkgcmVzdWx0cyBhcmUgYXZhaWxhYmxlLlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgdGhlIHNwZWNpZmllZCBjb21wb3NpdGUgcnVsZS5cclxuICAgKi9cclxuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlIEluZGljYXRlcyBpZiB0aGUgcnVsZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgdGhpcy5ydWxlc1xyXG4gICAgICAuc29ydChzID0+IHMucHJpb3JpdHkpXHJcbiAgICAgIC5mb3JFYWNoKHIgPT4gdGhpcy5yZXN1bHRzLnB1c2goci5leGVjdXRlKCkpKTtcclxuICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXN1bHRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21wb3NpdGUgcnVsZSBoYXMgY2hpbGQtcnVsZXMgdGhhdCBhcmVcclxuICAgKiBtZW1iZXJzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS5cclxuICAgKi9cclxuICBwdWJsaWMgaGFzUnVsZXMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvY2VzcyB0aGUgcmVzdWx0cyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUgcmVzdWx0IGNvbGxlY3Rpb24uIENvbXBvc2l0ZVxyXG4gICAqIHJ1bGVzIHdpbGwgaGF2ZSBvbmUgb3IgbW9yZSBydWxlIHJlc3VsdHMgZm9yIGFsbCBjaGlsZC1ydWxlcy5cclxuICAgKiBcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiByZXN1bHQgd2l0aCB0aGUgZXZhbHVhdGlvbiBzdW1tYXJ5IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHByb2Nlc3NSZXN1bHRzKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKHRoaXMucmVzdWx0cy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIGFzIGEgYmFzZSBbZXh0ZW5kc10gY2xhc3MgZm9yIHNpbXBsZSBydWxlcy4gQSBzaW1wbGUgY29udGFpbnNcclxuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxyXG4gKlxyXG4gKiBJZiB5b3UgcmVxdWlyZSBhIHJ1bGUgdGhhdCB3aWxsIGNvbnRhaW4gbW9yZSB0aGFuIG9uZSBydWxlLCB5b3Ugc2hvdWxkXHJcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc2ltcGxlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcblxyXG4gICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc051bGxPclVuZGVmaW5lZF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGFueSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudGFyZ2V0ID09IG51bGwgfHxcclxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSAndW5kZWZpbmVkJ1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgTk9UIFtudWxsXSBvciBbdW5kZWZpbmVkXS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc05vdE51bGxPclVuZGVmaW5lZCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOb3ROdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XHJcbiAgICAgIHRoaXMudGFyZ2V0ID09PSBudWxsIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgdHJ1dGh5LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzVHJ1ZSBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc1RydWVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy50YXJnZXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIC8vaWYobm90IHRydWUpLS0+ZmFsc2U7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsdWUgaXMgZmFsc3kuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSXNGYWxzZSBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHRhcmdldCB2YWx1ZSB0byBldmFsdWF0ZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc0ZhbHNlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogYm9vbGVhbixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgIC8vaWYodHJ1ZSktLT5mYWxzZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbTWluXSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgbWluaW11bVxyXG4gKiBhbGxvd2VkIHZhbHVlIFtjb21wYXJpc29uXS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNaW4gZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuIFxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbTWluXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcclxuICAgIGlmIChjb21wYXJlUmVzdWx0ID09PSBDb21wYXJlUmVzdWx0Lkxlc3MpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7IC8vbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIGNvbXBhcmlzb24gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbTWF4XSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGxlc3MgdGhhblxyXG4gKiB0aGUgY29tcGFyaXNvbiB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXggZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNYXhdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xyXG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuR3JlYXRlcikge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5pbXBvcnQgeyBJc05vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vSXNOb3ROdWxsT3JVbmRlZmluZWQnO1xyXG5pbXBvcnQgeyBNaW4gfSBmcm9tICcuL01pbic7XHJcbmltcG9ydCB7IE1heCB9IGZyb20gJy4vTWF4JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHRhcmdldCBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSAoc3RhcnQgYW5kIGVuZCkgdmFsdWVzLlxyXG4gKlxyXG4gKiBUaGUgcmFuZ2UgdmFsdWVzIGFyZSBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEV4OiAxIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMiBpcyB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyB2YWxpZC5cclxuICogRXg6IDAgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICogRXg6IDQgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZW5kIHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBlbmQ6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXJ0IHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBzdGFydDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgW3ByaW1pdGl2ZV0gdmFsdWUgdGhhdCB3aWxsIGJlIGV2YWx1YXRlZC4gVGhlIHZhbHVlXHJcbiAgICogbXVzdCBiZSB3aXRoaW4gdGhlIFtzdGFydF0gYW5kIHRoZSBbZW5kXSB2YWx1ZSB0byBiZSB2YWxpZC5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBbUmFuZ2VdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2U6IEEgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgcnVsZXMgd2lsbCBiZSBhcHBsaWVkIHRvLlxyXG4gICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgcmFuZ2UgdmFsdWUgLSB0aGUgbG93ZXN0IGFsbG93ZWQgYm91bmRhcnkgdmFsdWUuXHJcbiAgICogQHBhcmFtIGVuZCBUaGUgZW5kIHJhbmdlIHZhbHVlIC0gdGhlIGhpZ2hlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIG1heSBiZSBkaXNwbGF5ZWQgb3IgdmlzaWJsZSB0byB0aGUgY2FsbGVyIG9yIGNsaWVudC4gRGVmYXVsdCBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBzdGFydDogbnVtYmVyLFxyXG4gICAgZW5kOiBudW1iZXIsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XHJcblxyXG4gICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgJ1RhcmdldElzTm90TnVsbCcsXHJcbiAgICAgICAgJ1RoZSB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWluKFxyXG4gICAgICAgICAgJ01pblZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIHN0YXJ0IHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuc3RhcnRcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWF4KFxyXG4gICAgICAgICAgJ01heFZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBsZXNzIHRoYW4gdGhlIGVuZCByYW5nZSB2YWx1ZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICB0aGlzLmVuZFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBlcXVhbCB0byB0aGUgY29tcGFyaXNvbiB0YXJnZXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXJlRXF1YWwgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuIFxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbQXJlRXF1YWxSdWxlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW3RydWVdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSAhPT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgbm90IGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcmVOb3RFcXVhbCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVOb3RFcXVhbFJ1bGVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IChPcHRpb25hbCkgSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIGlmIChjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpID09PSBDb21wYXJlUmVzdWx0LkVxdWFsKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XHJcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9SYW5nZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgcnVsZSB0byB2YWxpZGF0ZSBhIHN0cmluZyB0YXJnZXQuIEEgdmFsaWQgc3RyaW5nIGlzIG5vdCBudWxsIG9yIHVuZGVmaW5lZDsgYW5kIGl0XHJcbiAqIGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG1pbmltdW0gYW5kIG1heGl1bXVtIGxlbmd0aC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1heExlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1pbmltdW0gbGVudGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBtaW5MZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb3ZpZGUgdGhlIHRhcmdldCBbUHJpbWl0aXZlXSB0byBldmFsdWF0ZSBmb3IgdGhlIHNwZWNpZmllZCBydWxlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZVJ1bGVdLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZShzKSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBtaW5MZW5ndGggVGhlIG1pbmltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKiBAcGFyYW0gbWF4TGVuZ3RoIFRoZSBtYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gICAgbWF4TGVuZ3RoOiBudW1iZXIsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLm1pbkxlbmd0aCA9IG1pbkxlbmd0aDtcclxuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlUnVsZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaGVscGVyIG1ldGhvZCB0byBjb25maWd1cmUvYWRkIHJ1bGVzIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcblxyXG4gIGNvbmZpZ3VyZVJ1bGVzKCkge1xyXG4gICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgJ1N0cmluZ0lzTm90TnVsbCcsXHJcbiAgICAgICAgJ1RoZSBzdHJpbmcgdGFyZ2V0IGlzIG51bGwgb3IgdW5kZWZpbmVkLicsXHJcbiAgICAgICAgdGhpcy50YXJnZXRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgUmFuZ2UoXHJcbiAgICAgICAgICAnVGFyZ2V0TGVuZ3RoSXNXaXRoaW5SYW5nZScsXHJcbiAgICAgICAgICAnVGhlIHN0cmluZyB2YWx1ZSBpcyBub3Qgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuJyxcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LnRvU3RyaW5nKCkubGVuZ3RoLFxyXG4gICAgICAgICAgdGhpcy5taW5MZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1heExlbmd0aFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICcuL1NlcnZpY2VNZXNzYWdlJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBtYW5hZ2UgdGhlIGNvbnRleHQgb2YgYSBzaW5nbGUgc2VydmljZSBjYWxsLiBUaGlzXHJcbiAqIGNsYXNzIHdpbGwgY29udGFpbiBhIGxpc3Qgb2YgYW55IHNlcnZpY2UgbWVzc2FnZXMgYWRkZWQgZHVyaW5nIHRoZSBwcm9jZXNzaW5nXHJcbiAqIG9mIGEgc2VydmljZSByZXF1ZXN0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VDb250ZXh0IHtcclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2Ygc2VydmljZSBtZXNzYWdlcyBhZGRlZCBieSB0aGUgYXBwbGljYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIHRoZVxyXG4gICAqIHNwZWNpZmllZCBzZXJ2aWNlIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgTWVzc2FnZXM6IEFycmF5PFNlcnZpY2VNZXNzYWdlPiA9IG5ldyBBcnJheTxTZXJ2aWNlTWVzc2FnZT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBtZXNzYWdlIHRvIHRoZSBbU2VydmljZUNvbnRleHRdLlxyXG4gICAqL1xyXG4gIGFkZE1lc3NhZ2UobWVzc2FnZTogU2VydmljZU1lc3NhZ2UpIHtcclxuICAgIHRoaXMuTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBjb250YWlucyBhbnkgbWVzc2FnZXMgd2l0aCB0eXBlIG9mIFtFcnJvcl0uXHJcbiAgICovXHJcbiAgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuTWVzc2FnZXMgJiYgdGhpcy5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZXMgPSB0aGlzLk1lc3NhZ2VzLmZpbHRlcihcclxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGRvZXMgbm90IGNvbnRhaW4gYW55IGVycm9ycy5cclxuICAgKi9cclxuICBpc0dvb2QoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbWVzc2FnZSBmb3IgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZSB7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBzcGVjaWZ5IHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIE5hbWU6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG1lc3NhZ2UuICovXHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmaXkgICovXHJcbiAgTWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS4gKi9cclxuICBTb3VyY2U6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLiAqL1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBJbmRpY2F0ZXMgaWYgdGhlIG1lc3NhZ2UgaXMgZGlzcGxheWFibGUuXHJcbiAgICovXHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZywgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSwgc291cmNlPzogc3RyaW5nKTtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU2VydmljZU1lc3NhZ2VdLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIG1lc3NhZ2VUeXBlPzogTWVzc2FnZVR5cGUsXHJcbiAgICBzb3VyY2U/OiBzdHJpbmdcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlciBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuIFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZyxcclxuICAgIGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgdGhpcy5OYW1lID0gbmFtZTtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XHJcbiAgICB9XHJcbiAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aE5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIGFkZCB0aGUgbWVzc2FnZSB0ZXh0IHRvIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbTWVzc2FnZVR5cGVdIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXHJcbiAgICovXHJcbiAgV2l0aE1lc3NhZ2VUeXBlKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbRGlzcGxheVRvVXNlcl0gaW5kaWNhdG9yIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgV2l0aERpc3BsYXlUb1VzZXIoZGlzcGxheVRvVXNlcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBOYW1lOiAke3RoaXMuTmFtZX07IE1lc3NhZ2U6ICR7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVxyXG4gICAgfTsgTWVzc2FnZVR5cGU6ICR7dGhpcy5NZXNzYWdlVHlwZS50b1N0cmluZygpfTsgU291cmNlOiAke1xyXG4gICAgICB0aGlzLlNvdXJjZVxyXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnLi9JVmFsaWRhdGlvbkNvbnRleHQnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dFN0YXRlIH0gZnJvbSAnLi9WYWxpZGF0aW9uQ29udGV4dFN0YXRlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4uL3J1bGVzL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IFZhbGlkYXRpb24gQ29udGV4dCBmb3IgeW91ciBhcHBsaWNhdGlvbi4gV2l0aCB0aGlzXHJcbiAqIGNvbnRleHQsIHlvdSBjYW4gYWRkIHJ1bGVzIGFuZCBldmFsdWF0ZSB0aGUgcnVsZXMuXHJcbiAqXHJcbiAqIEFmdGVyIHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkLCB5b3UgY2FuIHVzZSB0aGUgVmFsaWRhdGlvbiBDb250ZXh0IHRvIGRldGVybWluZSBpZiB0aGVyZSBhcmVcclxuICogYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29udGV4dCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29udGV4dCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhdGUgb2YgdGhlIHZhbGlkYXRpb24gY29udGV4dC4gXHJcbiAgICovXHJcbiAgc3RhdGU6IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLk5vdEV2YWx1YXRlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGFsbCBldmFsdWF0ZWQgcnVsZXMgdGhhdCBiZWxvbmcgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuICByZXN1bHRzOiBBcnJheTxSdWxlUmVzdWx0PiA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcnVsZXMgZm9yIHJlbmRlcmluZy5cclxuICAgKi9cclxuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNvdXJjZSBvZiB0aGUgc3BlY2lmaWVkIHZhbGlkYXRpb24gY29udGV4dCBpbnN0YW5jZS5cclxuICAgKi9cclxuICBzb3VyY2U6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgYmFzZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgJ1RoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGlzIHJlYWR5IGZvciBhY3Rpb24ocykuIEFsbCB0aGluZ3MgYXJlIGdvb2QgdW50aWwgYnJva2VuLi4uJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhZGQgYSBuZXcgcnVsZSB0byB0aGUgVmFsaWRhdGlvbkNvbnRleHQuXHJcbiAgICovXHJcbiAgYWRkUnVsZShydWxlOiBSdWxlUG9saWN5KSB7XHJcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcclxuICAgICAgcnVsZS5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgIH1cclxuICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtTb3VyY2VdIGZvciB0aGUgY3VycmVudCB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICogQHBhcmFtIHNvdXJjZVxyXG4gICAqL1xyXG4gIHdpdGhTb3VyY2Uoc291cmNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0uXHJcbiAgICovXHJcbiAgcmVuZGVyUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJlc3VsdHMgPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuICAgIGlmICh0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRoaXMucnVsZXNcclxuICAgICAgLnNvcnQociA9PiByLnByaW9yaXR5KVxyXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBoYXNSdWxlVmlvbGF0aW9ucygpOiBib29sZWFuIHtcclxuICAgIGxldCBoYXNWaW9sYXRpb25zID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5ydWxlcykge1xyXG4gICAgICBjb25zdCBydWxlVmlvbGF0aW9uc0NvdW50ID1cclxuICAgICAgICB0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoO1xyXG4gICAgICBpZiAocnVsZVZpb2xhdGlvbnNDb3VudCA+IDApIHtcclxuICAgICAgICBoYXNWaW9sYXRpb25zID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc1Zpb2xhdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAqVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaXMgdmFsaWQgLSBubyBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNSdWxlVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMucnVsZXMpIHtcclxuICAgICAgY29uc3QgaW52YWxpZFJ1bGVzQ291bnQgPSB0aGlzLnJ1bGVzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpXHJcbiAgICAgICAgLmxlbmd0aDtcclxuICAgICAgaWYgKGludmFsaWRSdWxlc0NvdW50ID4gMCkge1xyXG4gICAgICAgIGlzUnVsZVZhbGlkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBpc1J1bGVWYWxpZDtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7OztZQUdDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDeEI7Ozs7Ozs7Ozs7QUNDRDs7Ozs7O0lBc0NFLFlBQVksVUFBc0IsRUFBRSxNQUFZOzs7O3VCQWpDdEMsS0FBSztRQWtDYixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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