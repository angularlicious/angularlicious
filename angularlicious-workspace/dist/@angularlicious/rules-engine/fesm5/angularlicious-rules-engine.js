import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { __extends } from 'tslib';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularliciousRulesEngineModule = /** @class */ (function () {
    function AngularliciousRulesEngineModule() {
    }
    AngularliciousRulesEngineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule]
                },] },
    ];
    return AngularliciousRulesEngineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This class defines the result of a single rule evaluation.
 */
var  /**
 * This class defines the result of a single rule evaluation.
 */
RuleResult = /** @class */ (function () {
    /**
     * Constructor for the RuleResult class.
     * @param rulePolicy Use to specify the rule.
     * @param target Use to specify the target to be evaluated by the rule.
     */
    function RuleResult(rulePolicy, target) {
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
    return RuleResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var RenderType = {
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
var Severity = {
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
var  /**
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
RulePolicy = /** @class */ (function () {
    /**
     * Overloaded constructor for the [RulePolicy] class.
     * @param name The name of the rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param isDisplayable: Indicates if the rule violation is displayble.
     * @param severity (Optional) Use to indicate the rule violation severity. Default is [Exception].
     * @param priority (Optional) Use to indciate the rule's evaluation priority. Higher numeric values are priority. 0 is default and lowest priority.
     */
    function RulePolicy(name, message, isDisplayable, severity, priority) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        if (severity === void 0) { severity = Severity.Exception; }
        if (priority === void 0) { priority = 0; }
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
     */
    /**
     * Use to execute the rule. This is the [template] method of the [template method] design
     * pattern. It will coordindate the execution of any required methods in the processing
     * pipeline.
     * @return {?}
     */
    RulePolicy.prototype.execute = /**
     * Use to execute the rule. This is the [template] method of the [template method] design
     * pattern. It will coordindate the execution of any required methods in the processing
     * pipeline.
     * @return {?}
     */
    function () {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    };
    /**
     * Each rule must implement this function and return a valid [RuleResult].
     */
    /**
     * Each rule must implement this function and return a valid [RuleResult].
     * @return {?}
     */
    RulePolicy.prototype.render = /**
     * Each rule must implement this function and return a valid [RuleResult].
     * @return {?}
     */
    function () {
        throw new Error('Each concrete rule must implement this function and return a valid Result.');
    };
    return RulePolicy;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
var  /**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
CompositeRule = /** @class */ (function (_super) {
    __extends(CompositeRule, _super);
    /**
     *
     * @param name The name of the rule.
     * @param message The message to display if the rule is violated.
     * @param isDisplayable Indicates if the rule is displayable.
     */
    function CompositeRule(name, message, isDisplayable) {
        var _this = _super.call(this, name, message, isDisplayable) || this;
        /**
         * Indicates if the rule has any rule violations.
         */
        _this.hasErrors = false;
        /**
         * A list of results for evaluated rules. Rules must be rendered/executed before
         * any results are available.
         */
        _this.results = new Array();
        /**
         * A list of rules for the specified composite rule.
         */
        _this.rules = new Array();
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    CompositeRule.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        var _this = this;
        this.rules
            .sort(function (s) { return s.priority; })
            .forEach(function (r) { return _this.results.push(r.execute()); });
        return this.processResults();
    };
    /**
     * Use to determine if the composite rule has child-rules that are
     * members of the specified rule.
     * @return {?}
     */
    CompositeRule.prototype.hasRules = /**
     * Use to determine if the composite rule has child-rules that are
     * members of the specified rule.
     * @return {?}
     */
    function () {
        if (this.rules && this.rules.length > 0) {
            return true;
        }
        return false;
    };
    /**
     * Use to process the results of the specified rule result collection. Composite
     * rules will have one or more rule results for all child-rules.
     *
     * This method will return result with the evaluation summary and rule information.
     */
    /**
     * Use to process the results of the specified rule result collection. Composite
     * rules will have one or more rule results for all child-rules.
     *
     * This method will return result with the evaluation summary and rule information.
     * @return {?}
     */
    CompositeRule.prototype.processResults = /**
     * Use to process the results of the specified rule result collection. Composite
     * rules will have one or more rule results for all child-rules.
     *
     * This method will return result with the evaluation summary and rule information.
     * @return {?}
     */
    function () {
        if (this.results.filter(function (r) { return r.isValid === false; }).length > 0) {
            this.isValid = false;
            this.hasErrors = true;
        }
        return new RuleResult(this);
    };
    return CompositeRule;
}(RulePolicy));

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
var  /**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
SimpleRule = /** @class */ (function (_super) {
    __extends(SimpleRule, _super);
    /**
     * The constructor for the simple rule.
     * @param name The name of the rule.
     * @param message The message to display if the rule is violated.
     */
    function SimpleRule(name, message, isDisplayable) {
        return _super.call(this, name, message, isDisplayable) || this;
    }
    return SimpleRule;
}(RulePolicy));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is [null] or [undefined].
 */
var  /**
 * Use to determine if the target is [null] or [undefined].
 */
IsNullOrUndefined = /** @class */ (function (_super) {
    __extends(IsNullOrUndefined, _super);
    /**
     * The constructor for the [IsNullOrUndefined] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function IsNullOrUndefined(name, message, target, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    IsNullOrUndefined.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        if (this.target == null ||
            typeof this.target === undefined ||
            typeof this.target === 'undefined') {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return IsNullOrUndefined;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is NOT [null] or [undefined].
 */
var  /**
 * Use to determine if the target is NOT [null] or [undefined].
 */
IsNotNullOrUndefined = /** @class */ (function (_super) {
    __extends(IsNotNullOrUndefined, _super);
    /**
     * The constructor for the [IsNotNullOrUndefined] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function IsNotNullOrUndefined(name, message, target, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    IsNotNullOrUndefined.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        if (this.target == null ||
            this.target === null ||
            typeof this.target === 'undefined') {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return IsNotNullOrUndefined;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is truthy.
 */
var  /**
 * Use to determine if the target is truthy.
 */
IsTrue = /** @class */ (function (_super) {
    __extends(IsTrue, _super);
    /**
     * The constructor for the [IsTrue] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [true].
     */
    function IsTrue(name, message, target, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = true; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    IsTrue.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        this.isValid = true;
        if (this.target === false) {
            //if(not true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return IsTrue;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to indicate if the value is falsy.
 */
var  /**
 * Use to indicate if the value is falsy.
 */
IsFalse = /** @class */ (function (_super) {
    __extends(IsFalse, _super);
    /**
     * The constructor for the [IsFalse] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function IsFalse(name, message, target, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    IsFalse.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        if (this.target) {
            //if(true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return IsFalse;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [Min] rule to determine if the target value is equal to or greater than the minimum
 * allowed value [comparison].
 */
var  /**
 * Use the [Min] rule to determine if the target value is equal to or greater than the minimum
 * allowed value [comparison].
 */
Min = /** @class */ (function (_super) {
    __extends(Min, _super);
    /**
     * The constructor for the [Min] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param comparison The comparison target the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function Min(name, message, target, comparison, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.comparison = comparison;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    Min.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        var /** @type {?} */ compareResult = compare(this.target, this.comparison, true);
        if (compareResult === -1 /* Less */) {
            this.isValid = false; //must be equal to or greater than the comparison value;
        }
        return new RuleResult(this, this.target);
    };
    return Min;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use the [Max] rule to determine if the target value is equal to or less than
 * the comparison value.
 */
var  /**
 * Use the [Max] rule to determine if the target value is equal to or less than
 * the comparison value.
 */
Max = /** @class */ (function (_super) {
    __extends(Max, _super);
    /**
     * The constructor for the [Max] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param comparison The comparison target the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function Max(name, message, target, comparison, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.comparison = comparison;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    Max.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        var /** @type {?} */ compareResult = compare(this.target, this.comparison, true);
        if (compareResult === 1 /* Greater */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return Max;
}(SimpleRule));

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
var  /**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    /**
     * Constructor for the [Range] rule.
     * @param name The name of the rule.
     * @param message: A message to display if the rule is violated.
     * @param target The target object that the rules will be applied to.
     * @param start The start range value - the lowest allowed boundary value.
     * @param end The end range value - the highest allowed boundary value.
     * @param isDisplayable: (Optional) Indicates if the rule violation may be displayed or visible to the caller or client. Default is [false].
     */
    function Range(name, message, target, start, end, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.start = start;
        _this.end = end;
        _this.isDisplayable = isDisplayable;
        _this.rules.push(new IsNotNullOrUndefined('TargetIsNotNull', 'The target is null or undefined.', _this.target));
        if (_this.target != null) {
            _this.rules.push(new Min('MinValue', 'The value must be equal to or greater than the start range value.', _this.target, _this.start));
            _this.rules.push(new Max('MaxValue', 'The value must be equal to or less than the end range value.', _this.target, _this.end));
        }
        return _this;
    }
    return Range;
}(CompositeRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is equal to the comparison target.
 */
var  /**
 * Use to determine if the target is equal to the comparison target.
 */
AreEqual = /** @class */ (function (_super) {
    __extends(AreEqual, _super);
    /**
     * The constructor for the [AreEqualRule] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param comparison The comparison target the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [true].
     */
    function AreEqual(name, message, target, comparison, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = true; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.comparison = comparison;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    AreEqual.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        if (compare(this.target, this.comparison, true) !== 0 /* Equal */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return AreEqual;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use to determine if the target is not equal to the comparison target.
 */
var  /**
 * Use to determine if the target is not equal to the comparison target.
 */
AreNotEqual = /** @class */ (function (_super) {
    __extends(AreNotEqual, _super);
    /**
     * The constructor for the [AreNotEqualRule] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param comparison The comparison target the rules are evaluated against.
     * @param isDisplayable: (Optional) Indicates if the rule violation is displayble. Default is [true].
     */
    function AreNotEqual(name, message, target, comparison, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = true; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.comparison = comparison;
        return _this;
    }
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     */
    /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    AreNotEqual.prototype.render = /**
     * Use to render the evaluated result for the specified rule. This method
     * returns a [RuleResult] with the evaluated result and rule information.
     * @return {?}
     */
    function () {
        if (compare(this.target, this.comparison, true) === 0 /* Equal */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return AreNotEqual;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
var  /**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
StringIsNotNullEmptyRange = /** @class */ (function (_super) {
    __extends(StringIsNotNullEmptyRange, _super);
    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rule(s) will be evaluated against.
     * @param minLength The minimum allowed length of the target value.
     * @param maxLength The maximum allowed length of the target value.
     */
    function StringIsNotNullEmptyRange(name, message, target, minLength, maxLength, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
        var _this = _super.call(this, name, message, isDisplayable) || this;
        _this.target = target;
        _this.minLength = minLength;
        _this.maxLength = maxLength;
        _this.configureRules();
        return _this;
    }
    /**
     * A helper method to configure/add rules to the validation context.
     */
    /**
     * A helper method to configure/add rules to the validation context.
     * @return {?}
     */
    StringIsNotNullEmptyRange.prototype.configureRules = /**
     * A helper method to configure/add rules to the validation context.
     * @return {?}
     */
    function () {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Range('TargetLengthIsWithinRange', 'The string value is not within the specified range.', this.target.toString().length, this.minLength, this.maxLength));
        }
    };
    return StringIsNotNullEmptyRange;
}(CompositeRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var MessageType = {
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
var  /**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
ServiceContext = /** @class */ (function () {
    function ServiceContext() {
        /**
         * A list of service messages added by the application during the processing of the
         * specified service request.
         */
        this.Messages = new Array();
    }
    /**
     * Use this method to add a new message to the [ServiceContext].
     */
    /**
     * Use this method to add a new message to the [ServiceContext].
     * @param {?} message
     * @return {?}
     */
    ServiceContext.prototype.addMessage = /**
     * Use this method to add a new message to the [ServiceContext].
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.Messages.push(message);
    };
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     */
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     * @return {?}
     */
    ServiceContext.prototype.hasErrors = /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     * @return {?}
     */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            var /** @type {?} */ errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
            if (errorMessages.length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     */
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     * @return {?}
     */
    ServiceContext.prototype.isGood = /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     * @return {?}
     */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            var /** @type {?} */ errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
            if (errorMessages.length > 0) {
                return false;
            }
        }
        return true;
    };
    return ServiceContext;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to create a message for the current [ServiceContext].
 */
var  /**
 * Use this class to create a message for the current [ServiceContext].
 */
ServiceMessage = /** @class */ (function () {
    /**
     *
     * @param name The name of the message.
     * @param message The display text of the message.
     * @param messageType: Indicates the type of message.
     * @param source: Indicates the source of the message.
     * @param displayToUser Use to indicate if the specified message should be displayed to the user.
     */
    function ServiceMessage(name, message, messageType, source, displayToUser) {
        if (displayToUser === void 0) { displayToUser = false; }
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
     * @param name The name of the service message.
     */
    /**
     * Use this extension method to add the name of the message.
     * @param {?} name The name of the service message.
     * @return {?}
     */
    ServiceMessage.prototype.WithName = /**
     * Use this extension method to add the name of the message.
     * @param {?} name The name of the service message.
     * @return {?}
     */
    function (name) {
        this.Name = name;
        return this;
    };
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param message The display text of the service message.
     */
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    ServiceMessage.prototype.WithMessage = /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    function (message) {
        this.Message = message;
        return this;
    };
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param messageType: Use to indicate the message type.
     */
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    ServiceMessage.prototype.WithMessageType = /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    function (messageType) {
        this.MessageType = messageType;
        return this;
    };
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param source: Use to indicate the source of the message.
     */
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    ServiceMessage.prototype.WithSource = /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.Source = source;
        return this;
    };
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
     */
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    ServiceMessage.prototype.WithDisplayToUser = /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    function (displayToUser) {
        this.DisplayToUser = displayToUser;
        return this;
    };
    /**
     * Use this method return a string representing the ServiceMessage.
     */
    /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    ServiceMessage.prototype.toString = /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    function () {
        return "Name: " + this.Name + "; Message: " + this.Message + "; MessageType: " + this.MessageType.toString() + "; Source: " + this.Source + "; DisplayToUser: " + this.DisplayToUser;
    };
    return ServiceMessage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var ValidationContextState = {
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
var  /**
 * Use this class to create a new Validation Context for your application. With this
 * context, you can add rules and evaluate the rules.
 *
 * After the rules are evaluated, you can use the Validation Context to determine if there are
 * any rule violations.
 */
ValidationContext = /** @class */ (function () {
    /**
     * The constructor for the base validation context.
     */
    function ValidationContext() {
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
     */
    /**
     * Use this method to add a new rule to the ValidationContext.
     * @param {?} rule
     * @return {?}
     */
    ValidationContext.prototype.addRule = /**
     * Use this method to add a new rule to the ValidationContext.
     * @param {?} rule
     * @return {?}
     */
    function (rule) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    };
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param source
     */
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    ValidationContext.prototype.withSource = /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.source = source;
        return this;
    };
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     */
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    ValidationContext.prototype.renderRules = /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @return {?}
     */
    function () {
        var _this = this;
        this.results = new Array();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules
            .sort(function (r) { return r.priority; })
            .forEach(function (r) { return _this.results.push(r.execute()); });
        return this;
    };
    /**
     * Use to determine if the validation context has any rule violations.
     */
    /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    ValidationContext.prototype.hasRuleViolations = /**
     * Use to determine if the validation context has any rule violations.
     * @return {?}
     */
    function () {
        var /** @type {?} */ hasViolations = false;
        if (this.rules) {
            var /** @type {?} */ ruleViolationsCount = this.rules && this.rules.filter(function (r) { return r.isValid === false; }).length;
            if (ruleViolationsCount > 0) {
                hasViolations = true;
            }
        }
        return hasViolations;
    };
    Object.defineProperty(ValidationContext.prototype, "isValid", {
        /**
         * *Use to indicate if the validation context is valid - no rule violations.
         */
        get: /**
         * *Use to indicate if the validation context is valid - no rule violations.
         * @return {?}
         */
        function () {
            var /** @type {?} */ isRuleValid = true;
            if (this.rules) {
                var /** @type {?} */ invalidRulesCount = this.rules.filter(function (r) { return r.isValid === false; })
                    .length;
                if (invalidRulesCount > 0) {
                    isRuleValid = false;
                }
            }
            return isRuleValid;
        },
        enumerable: true,
        configurable: true
    });
    return ValidationContext;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousRulesEngineModule, RuleResult, RulePolicy, RenderType, CompositeRule, SimpleRule, IsNullOrUndefined, IsNotNullOrUndefined, IsTrue, IsFalse, Min, Max, Range, AreEqual, AreNotEqual, StringIsNotNullEmptyRange, Severity, ServiceContext, ServiceMessage, MessageType, ValidationContext, ValidationContextState };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy1lbmdpbmUubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUmVzdWx0LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUG9saWN5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgcmVzdWx0IG9mIGEgc2luZ2xlIHJ1bGUgZXZhbHVhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUmVzdWx0IHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cclxuICAgKi9cclxuICBpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZC5cclxuICAgKi9cclxuICBydWxlUG9saWN5OiBSdWxlUG9saWN5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcnVsZSBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoZSBldmFsdWF0aW9uIFtpc1ZhbGlkXSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxyXG4gICAqL1xyXG4gIHRhcmdldDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBVc2UgdG8gc3BlY2lmeSB0aGUgdGFyZ2V0IHRvIGJlIGV2YWx1YXRlZCBieSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IENvbXBvc2l0ZVJ1bGUpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldD86IGFueSkge1xyXG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJ1bGVQb2xpY3kgPSBydWxlUG9saWN5O1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBydWxlUG9saWN5LmlzVmFsaWQ7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcclxuICAgIH1cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJUnVsZUNvbXBvbmVudCB9IGZyb20gJy4vSVJ1bGVDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUmVuZGVyVHlwZSB9IGZyb20gJy4vUmVuZGVyVHlwZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnLi9TZXZlcml0eSc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIHJ1bGVzLiBBbGwgcnVsZXMgd2lsbCBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLiBOZXcgcnVsZXNcclxuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUG9saWN5IGltcGxlbWVudHMgSVJ1bGVDb21wb25lbnQge1xyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xyXG4gIGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xyXG4gIHJlc3VsdDogUnVsZVJlc3VsdDtcclxuXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cclxuICByZW5kZXJUeXBlOiBSZW5kZXJUeXBlID0gUmVuZGVyVHlwZS5FdmFsdWF0ZUFsbFJ1bGVzO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5ID0gU2V2ZXJpdHkuRXhjZXB0aW9uO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS5cclxuICAgKi9cclxuICBleGVjdXRlKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWFjaCBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFtSdWxlUmVzdWx0XS5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtDb21wb3NpdGVSdWxlXSBhcyBhIGJhc2UgY2xhc3MgZm9yIGEgY29tcGxleCBydWxlIC0gYSBydWxlIHRoYXQgY29udGFpbnNcclxuICogb3RoZXIgcnVsZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlUnVsZSBleHRlbmRzIFJ1bGVQb2xpY3kge1xyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyBpZiB0aGUgcnVsZSBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGV2YWx1YXRlZCBydWxlcy4gUnVsZXMgbXVzdCBiZSByZW5kZXJlZC9leGVjdXRlZCBiZWZvcmVcclxuICAgKiBhbnkgcmVzdWx0cyBhcmUgYXZhaWxhYmxlLlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgdGhlIHNwZWNpZmllZCBjb21wb3NpdGUgcnVsZS5cclxuICAgKi9cclxuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlIEluZGljYXRlcyBpZiB0aGUgcnVsZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIHRoaXMucnVsZXNcclxuICAgICAgLnNvcnQocyA9PiBzLnByaW9yaXR5KVxyXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzUmVzdWx0cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY29tcG9zaXRlIHJ1bGUgaGFzIGNoaWxkLXJ1bGVzIHRoYXQgYXJlXHJcbiAgICogbWVtYmVycyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgcHVibGljIGhhc1J1bGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb2Nlc3MgdGhlIHJlc3VsdHMgb2YgdGhlIHNwZWNpZmllZCBydWxlIHJlc3VsdCBjb2xsZWN0aW9uLiBDb21wb3NpdGVcclxuICAgKiBydWxlcyB3aWxsIGhhdmUgb25lIG9yIG1vcmUgcnVsZSByZXN1bHRzIGZvciBhbGwgY2hpbGQtcnVsZXMuXHJcbiAgICpcclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiByZXN1bHQgd2l0aCB0aGUgZXZhbHVhdGlvbiBzdW1tYXJ5IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHByb2Nlc3NSZXN1bHRzKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKHRoaXMucmVzdWx0cy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIGFzIGEgYmFzZSBbZXh0ZW5kc10gY2xhc3MgZm9yIHNpbXBsZSBydWxlcy4gQSBzaW1wbGUgY29udGFpbnNcclxuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxyXG4gKlxyXG4gKiBJZiB5b3UgcmVxdWlyZSBhIHJ1bGUgdGhhdCB3aWxsIGNvbnRhaW4gbW9yZSB0aGFuIG9uZSBydWxlLCB5b3Ugc2hvdWxkXHJcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc2ltcGxlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBOT1QgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTm90TnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOb3ROdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxyXG4gICAgICB0aGlzLnRhcmdldCA9PT0gbnVsbCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIHRydXRoeS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc1RydWUgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc1RydWVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZmFsc2UpIHtcclxuICAgICAgLy9pZihub3QgdHJ1ZSktLT5mYWxzZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWx1ZSBpcyBmYWxzeS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc0ZhbHNlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSB0YXJnZXQgdmFsdWUgdG8gZXZhbHVhdGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNGYWxzZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAvL2lmKHRydWUpLS0+ZmFsc2U7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW01pbl0gcnVsZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCB2YWx1ZSBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1pbmltdW1cclxuICogYWxsb3dlZCB2YWx1ZSBbY29tcGFyaXNvbl0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWluIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNaW5dIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcclxuICAgIGlmIChjb21wYXJlUmVzdWx0ID09PSBDb21wYXJlUmVzdWx0Lkxlc3MpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7IC8vbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIGNvbXBhcmlzb24gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbTWF4XSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGxlc3MgdGhhblxyXG4gKiB0aGUgY29tcGFyaXNvbiB2YWx1ZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXggZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW01heF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xyXG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuR3JlYXRlcikge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5pbXBvcnQgeyBJc05vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vSXNOb3ROdWxsT3JVbmRlZmluZWQnO1xyXG5pbXBvcnQgeyBNaW4gfSBmcm9tICcuL01pbic7XHJcbmltcG9ydCB7IE1heCB9IGZyb20gJy4vTWF4JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHRhcmdldCBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSAoc3RhcnQgYW5kIGVuZCkgdmFsdWVzLlxyXG4gKlxyXG4gKiBUaGUgcmFuZ2UgdmFsdWVzIGFyZSBpbmNsdXNpdmUuXHJcbiAqXHJcbiAqIEV4OiAxIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMiBpcyB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyB2YWxpZC5cclxuICogRXg6IDAgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICogRXg6IDQgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZW5kIHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBlbmQ6IG51bWJlcjtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXJ0IHZhbHVlIG9mIHRoZSByYW5nZS5cclxuICAgKi9cclxuICBzdGFydDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgW3ByaW1pdGl2ZV0gdmFsdWUgdGhhdCB3aWxsIGJlIGV2YWx1YXRlZC4gVGhlIHZhbHVlXHJcbiAgICogbXVzdCBiZSB3aXRoaW4gdGhlIFtzdGFydF0gYW5kIHRoZSBbZW5kXSB2YWx1ZSB0byBiZSB2YWxpZC5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBbUmFuZ2VdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2U6IEEgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgcnVsZXMgd2lsbCBiZSBhcHBsaWVkIHRvLlxyXG4gICAqIEBwYXJhbSBzdGFydCBUaGUgc3RhcnQgcmFuZ2UgdmFsdWUgLSB0aGUgbG93ZXN0IGFsbG93ZWQgYm91bmRhcnkgdmFsdWUuXHJcbiAgICogQHBhcmFtIGVuZCBUaGUgZW5kIHJhbmdlIHZhbHVlIC0gdGhlIGhpZ2hlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIG1heSBiZSBkaXNwbGF5ZWQgb3IgdmlzaWJsZSB0byB0aGUgY2FsbGVyIG9yIGNsaWVudC4gRGVmYXVsdCBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBzdGFydDogbnVtYmVyLFxyXG4gICAgZW5kOiBudW1iZXIsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XHJcblxyXG4gICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgJ1RhcmdldElzTm90TnVsbCcsXHJcbiAgICAgICAgJ1RoZSB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWluKFxyXG4gICAgICAgICAgJ01pblZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIHN0YXJ0IHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuc3RhcnRcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgTWF4KFxyXG4gICAgICAgICAgJ01heFZhbHVlJyxcclxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBsZXNzIHRoYW4gdGhlIGVuZCByYW5nZSB2YWx1ZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQsXHJcbiAgICAgICAgICB0aGlzLmVuZFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBlcXVhbCB0byB0aGUgY29tcGFyaXNvbiB0YXJnZXQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXJlRXF1YWwgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0FyZUVxdWFsUnVsZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSAhPT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgbm90IGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcmVOb3RFcXVhbCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbQXJlTm90RXF1YWxSdWxlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSkgPT09IENvbXBhcmVSZXN1bHQuRXF1YWwpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcclxuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcclxuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuL1JhbmdlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIHZhbGlkYXRlIGEgc3RyaW5nIHRhcmdldC4gQSB2YWxpZCBzdHJpbmcgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkOyBhbmQgaXRcclxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UgZXh0ZW5kcyBDb21wb3NpdGVSdWxlIHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvdmlkZSB0aGUgdGFyZ2V0IFtQcmltaXRpdmVdIHRvIGV2YWx1YXRlIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlUnVsZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlKHMpIHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIG1pbkxlbmd0aCBUaGUgbWluaW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xyXG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGNvbmZpZ3VyZS9hZGQgcnVsZXMgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuXHJcbiAgY29uZmlndXJlUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnU3RyaW5nSXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHN0cmluZyB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBSYW5nZShcclxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcclxuICAgICAgICAgICdUaGUgc3RyaW5nIHZhbHVlIGlzIG5vdCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQudG9TdHJpbmcoKS5sZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcclxuICAgICAgICAgIHRoaXMubWF4TGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJy4vU2VydmljZU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIG1hbmFnZSB0aGUgY29udGV4dCBvZiBhIHNpbmdsZSBzZXJ2aWNlIGNhbGwuIFRoaXNcclxuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcclxuICogb2YgYSBzZXJ2aWNlIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgdGhlXHJcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cclxuICAgKi9cclxuICBNZXNzYWdlczogQXJyYXk8U2VydmljZU1lc3NhZ2U+ID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IG1lc3NhZ2UgdG8gdGhlIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICovXHJcbiAgYWRkTWVzc2FnZShtZXNzYWdlOiBTZXJ2aWNlTWVzc2FnZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cclxuICAgKi9cclxuICBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxyXG4gICAqL1xyXG4gIGlzR29vZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlIHtcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuICovXHJcbiAgTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG1lc3NhZ2UuICovXHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIHNwZWNpZml5ICAqL1xyXG4gIE1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcclxuXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIFNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLiAqL1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBJbmRpY2F0ZXMgaWYgdGhlIG1lc3NhZ2UgaXMgZGlzcGxheWFibGUuXHJcbiAgICovXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZT86IHN0cmluZyxcclxuICAgIG1lc3NhZ2VUeXBlPzogTWVzc2FnZVR5cGUsXHJcbiAgICBzb3VyY2U/OiBzdHJpbmdcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXIgVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZyxcclxuICAgIGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgdGhpcy5OYW1lID0gbmFtZTtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XHJcbiAgICB9XHJcbiAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aE5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIGFkZCB0aGUgbWVzc2FnZSB0ZXh0IHRvIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbTWVzc2FnZVR5cGVdIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXHJcbiAgICovXHJcbiAgV2l0aE1lc3NhZ2VUeXBlKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbRGlzcGxheVRvVXNlcl0gaW5kaWNhdG9yIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgV2l0aERpc3BsYXlUb1VzZXIoZGlzcGxheVRvVXNlcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBOYW1lOiAke3RoaXMuTmFtZX07IE1lc3NhZ2U6ICR7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVxyXG4gICAgfTsgTWVzc2FnZVR5cGU6ICR7dGhpcy5NZXNzYWdlVHlwZS50b1N0cmluZygpfTsgU291cmNlOiAke1xyXG4gICAgICB0aGlzLlNvdXJjZVxyXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnLi9JVmFsaWRhdGlvbkNvbnRleHQnO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dFN0YXRlIH0gZnJvbSAnLi9WYWxpZGF0aW9uQ29udGV4dFN0YXRlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4uL3J1bGVzL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IFZhbGlkYXRpb24gQ29udGV4dCBmb3IgeW91ciBhcHBsaWNhdGlvbi4gV2l0aCB0aGlzXHJcbiAqIGNvbnRleHQsIHlvdSBjYW4gYWRkIHJ1bGVzIGFuZCBldmFsdWF0ZSB0aGUgcnVsZXMuXHJcbiAqXHJcbiAqIEFmdGVyIHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkLCB5b3UgY2FuIHVzZSB0aGUgVmFsaWRhdGlvbiBDb250ZXh0IHRvIGRldGVybWluZSBpZiB0aGVyZSBhcmVcclxuICogYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29udGV4dCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBzdGF0ZSBvZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIHN0YXRlOiBWYWxpZGF0aW9uQ29udGV4dFN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5Ob3RFdmFsdWF0ZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBhbGwgZXZhbHVhdGVkIHJ1bGVzIHRoYXQgYmVsb25nIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciByZW5kZXJpbmcuXHJcbiAgICovXHJcbiAgcnVsZXM6IEFycmF5PFJ1bGVQb2xpY3k+ID0gbmV3IEFycmF5PFJ1bGVQb2xpY3k+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCB2YWxpZGF0aW9uIGNvbnRleHQgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGJhc2UgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICdUaGUgW1ZhbGlkYXRpb25Db250ZXh0XSBpcyByZWFkeSBmb3IgYWN0aW9uKHMpLiBBbGwgdGhpbmdzIGFyZSBnb29kIHVudGlsIGJyb2tlbi4uLidcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IHJ1bGUgdG8gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxyXG4gICAqL1xyXG4gIGFkZFJ1bGUocnVsZTogUnVsZVBvbGljeSkge1xyXG4gICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgIHJ1bGUuc291cmNlID0gdGhpcy5zb3VyY2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBmb3IgdGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqIEBwYXJhbSBzb3VyY2VcclxuICAgKi9cclxuICB3aXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdLlxyXG4gICAqL1xyXG4gIHJlbmRlclJ1bGVzKCkge1xyXG4gICAgdGhpcy5yZXN1bHRzID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJ1bGVzXHJcbiAgICAgIC5zb3J0KHIgPT4gci5wcmlvcml0eSlcclxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzUnVsZVZpb2xhdGlvbnMoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaGFzVmlvbGF0aW9ucyA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMucnVsZXMpIHtcclxuICAgICAgY29uc3QgcnVsZVZpb2xhdGlvbnNDb3VudCA9XHJcbiAgICAgICAgdGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aDtcclxuICAgICAgaWYgKHJ1bGVWaW9sYXRpb25zQ291bnQgPiAwKSB7XHJcbiAgICAgICAgaGFzVmlvbGF0aW9ucyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBoYXNWaW9sYXRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogKlVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGlzIHZhbGlkIC0gbm8gcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzUnVsZVZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IGludmFsaWRSdWxlc0NvdW50ID0gdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKVxyXG4gICAgICAgIC5sZW5ndGg7XHJcbiAgICAgIGlmIChpbnZhbGlkUnVsZXNDb3VudCA+IDApIHtcclxuICAgICAgICBpc1J1bGVWYWxpZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNSdWxlVmFsaWQ7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fZXh0ZW5kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7Z0JBR0MsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDeEI7OzBDQUxEOzs7Ozs7Ozs7O0FDTUE7OztBQUFBOzs7Ozs7SUFxQ0Usb0JBQVksVUFBc0IsRUFBRSxNQUFZOzs7O3VCQWpDdEMsS0FBSztRQWtDYixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCO3FCQWxESDtJQW1EQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pE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