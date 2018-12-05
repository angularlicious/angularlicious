import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AngularliciousRulesEngineModule {
}
AngularliciousRulesEngineModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
RenderType[RenderType.ExitOnFirstFalseEvaluation] = 'ExitOnFirstFalseEvaluation';
RenderType[RenderType.ExitOnFirstTrueEvaluation] = 'ExitOnFirstTrueEvaluation';
RenderType[RenderType.EvaluateAllRules] = 'EvaluateAllRules';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
Severity[Severity.Exception] = 'Exception';
Severity[Severity.Warning] = 'Warning';
Severity[Severity.Information] = 'Information';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const compareResult = compare(this.target, this.comparison, true);
        if (compareResult === -1 /* Less */) {
            this.isValid = false; //must be equal to or greater than the comparison value;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const compareResult = compare(this.target, this.comparison, true);
        if (compareResult === 1 /* Greater */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
MessageType[MessageType.Information] = 'Information';
MessageType[MessageType.Warning] = 'Warning';
MessageType[MessageType.Error] = 'Error';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            /** @type {?} */
            const errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
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
            /** @type {?} */
            const errorMessages = this.Messages.filter(f => f.MessageType === MessageType.Error);
            if (errorMessages.length > 0) {
                return false;
            }
        }
        return true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.MessageType = (/** @type {?} */ (messageType));
        }
        if (source) {
            this.Source = (/** @type {?} */ (source));
        }
    }
    /**
     * Use this extension method to add the name of the message.
     * @template THIS
     * @this {THIS}
     * @param {?} name The name of the service message.
     * @return {THIS}
     */
    WithName(name) {
        (/** @type {?} */ (this)).Name = name;
        return (/** @type {?} */ (this));
    }
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} message The display text of the service message.
     * @return {THIS}
     */
    WithMessage(message) {
        (/** @type {?} */ (this)).Message = message;
        return (/** @type {?} */ (this));
    }
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} messageType
     * @return {THIS}
     */
    WithMessageType(messageType) {
        (/** @type {?} */ (this)).MessageType = messageType;
        return (/** @type {?} */ (this));
    }
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    WithSource(source) {
        (/** @type {?} */ (this)).Source = source;
        return (/** @type {?} */ (this));
    }
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @template THIS
     * @this {THIS}
     * @param {?} displayToUser
     * @return {THIS}
     */
    WithDisplayToUser(displayToUser) {
        (/** @type {?} */ (this)).DisplayToUser = displayToUser;
        return (/** @type {?} */ (this));
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
ValidationContextState[ValidationContextState.NotEvaluated] = 'NotEvaluated';
ValidationContextState[ValidationContextState.Success] = 'Success';
ValidationContextState[ValidationContextState.Failure] = 'Failure';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @template THIS
     * @this {THIS}
     * @param {?} rule
     * @return {THIS}
     */
    addRule(rule) {
        if ((/** @type {?} */ (this)).source) {
            rule.source = (/** @type {?} */ (this)).source;
        }
        (/** @type {?} */ (this)).rules.push(rule);
        return (/** @type {?} */ (this));
    }
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    withSource(source) {
        (/** @type {?} */ (this)).source = source;
        return (/** @type {?} */ (this));
    }
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    renderRules() {
        (/** @type {?} */ (this)).results = new Array();
        if ((/** @type {?} */ (this)).rules && (/** @type {?} */ (this)).rules.length < 1) {
            return (/** @type {?} */ (this));
        }
        (/** @type {?} */ (this)).rules
            .sort(r => r.priority)
            .forEach(r => (/** @type {?} */ (this)).results.push(r.execute()));
        return (/** @type {?} */ (this));
    }
    /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    hasRuleViolations() {
        /** @type {?} */
        let hasViolations = false;
        if (this.rules) {
            /** @type {?} */
            const ruleViolationsCount = this.rules && this.rules.filter(r => r.isValid === false).length;
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
        /** @type {?} */
        let isRuleValid = true;
        if (this.rules) {
            /** @type {?} */
            const invalidRulesCount = this.rules.filter(r => r.isValid === false)
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularliciousRulesEngineModule, RuleResult, RulePolicy, RenderType, CompositeRule, SimpleRule, IsNullOrUndefined, IsNotNullOrUndefined, IsTrue, IsFalse, Min, Max, Range, AreEqual, AreNotEqual, StringIsNotNullEmptyRange, Severity, ServiceContext, ServiceMessage, MessageType, ValidationContext, ValidationContextState };

//# sourceMappingURL=angularlicious-rules-engine.js.map