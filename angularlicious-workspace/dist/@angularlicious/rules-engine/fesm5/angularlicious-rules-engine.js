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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy1lbmdpbmUubW9kdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUmVzdWx0LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9SdWxlUG9saWN5LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSByZXN1bHQgb2YgYSBzaW5nbGUgcnVsZSBldmFsdWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUnVsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cbiAgICovXG4gIGlzVmFsaWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkLlxuICAgKi9cbiAgcnVsZVBvbGljeTogUnVsZVBvbGljeTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGUgZXZhbHVhdGlvbiBbaXNWYWxpZF0gaXMgW2ZhbHNlXS5cbiAgICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxuICAgKi9cbiAgdGFyZ2V0OiBhbnk7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogQ29tcG9zaXRlUnVsZSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0PzogYW55KSB7XG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlUG9saWN5ID0gcnVsZVBvbGljeTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHJ1bGVQb2xpY3kuaXNWYWxpZDtcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFJlbmRlclR5cGUgfSBmcm9tICcuL1JlbmRlclR5cGUnO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xuICBpc1ZhbGlkID0gdHJ1ZTtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XG5cbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXG4gIGlzRGlzcGxheWFibGU6IGJvb2xlYW47XG5cbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cbiAgcmVuZGVyVHlwZTogUmVuZGVyVHlwZSA9IFJlbmRlclR5cGUuRXZhbHVhdGVBbGxSdWxlcztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xuICBzb3VyY2U6IHN0cmluZztcblxuICAvKipcbiAgICogT3ZlcmxvYWRlZCBjb25zdHJ1Y3RvciBmb3IgdGhlIFtSdWxlUG9saWN5XSBjbGFzcy5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcbiAgLyoqXG4gICAqIE92ZXJsb2FkZWQgY29uc3RydWN0b3IgZm9yIHRoZSBbUnVsZVBvbGljeV0gY2xhc3MuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxuICAgKiBAcGFyYW0gc2V2ZXJpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kaWNhdGUgdGhlIHJ1bGUgdmlvbGF0aW9uIHNldmVyaXR5LiBEZWZhdWx0IGlzIFtFeGNlcHRpb25dLlxuICAgKiBAcGFyYW0gcHJpb3JpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kY2lhdGUgdGhlIHJ1bGUncyBldmFsdWF0aW9uIHByaW9yaXR5LiBIaWdoZXIgbnVtZXJpYyB2YWx1ZXMgYXJlIHByaW9yaXR5LiAwIGlzIGRlZmF1bHQgYW5kIGxvd2VzdCBwcmlvcml0eS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbixcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBleGVjdXRlIHRoZSBydWxlLiBUaGlzIGlzIHRoZSBbdGVtcGxhdGVdIG1ldGhvZCBvZiB0aGUgW3RlbXBsYXRlIG1ldGhvZF0gZGVzaWduXG4gICAqIHBhdHRlcm4uIEl0IHdpbGwgY29vcmRpbmRhdGUgdGhlIGV4ZWN1dGlvbiBvZiBhbnkgcmVxdWlyZWQgbWV0aG9kcyBpbiB0aGUgcHJvY2Vzc2luZ1xuICAgKiBwaXBlbGluZS5cbiAgICovXG4gIGV4ZWN1dGUoKTogUnVsZVJlc3VsdCB7XG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFYWNoIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgW1J1bGVSZXN1bHRdLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi9SdWxlUG9saWN5JztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGFzIGEgYmFzZSBjbGFzcyBmb3IgYSBjb21wbGV4IHJ1bGUgLSBhIHJ1bGUgdGhhdCBjb250YWluc1xuICogb3RoZXIgcnVsZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXG4gICAqL1xuICBoYXNFcnJvcnMgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGV2YWx1YXRlZCBydWxlcy4gUnVsZXMgbXVzdCBiZSByZW5kZXJlZC9leGVjdXRlZCBiZWZvcmVcbiAgICogYW55IHJlc3VsdHMgYXJlIGF2YWlsYWJsZS5cbiAgICovXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgdGhlIHNwZWNpZmllZCBjb21wb3NpdGUgcnVsZS5cbiAgICovXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGUgSW5kaWNhdGVzIGlmIHRoZSBydWxlIGlzIGRpc3BsYXlhYmxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGlzRGlzcGxheWFibGU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICB0aGlzLnJ1bGVzXG4gICAgICAuc29ydChzID0+IHMucHJpb3JpdHkpXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21wb3NpdGUgcnVsZSBoYXMgY2hpbGQtcnVsZXMgdGhhdCBhcmVcbiAgICogbWVtYmVycyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuXG4gICAqL1xuICBwdWJsaWMgaGFzUnVsZXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBwcm9jZXNzIHRoZSByZXN1bHRzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZSByZXN1bHQgY29sbGVjdGlvbi4gQ29tcG9zaXRlXG4gICAqIHJ1bGVzIHdpbGwgaGF2ZSBvbmUgb3IgbW9yZSBydWxlIHJlc3VsdHMgZm9yIGFsbCBjaGlsZC1ydWxlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcmVzdWx0IHdpdGggdGhlIGV2YWx1YXRpb24gc3VtbWFyeSBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHByb2Nlc3NSZXN1bHRzKCk6IFJ1bGVSZXN1bHQge1xuICAgIGlmICh0aGlzLnJlc3VsdHMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgYXMgYSBiYXNlIFtleHRlbmRzXSBjbGFzcyBmb3Igc2ltcGxlIHJ1bGVzLiBBIHNpbXBsZSBjb250YWluc1xuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxuICpcbiAqIElmIHlvdSByZXF1aXJlIGEgcnVsZSB0aGF0IHdpbGwgY29udGFpbiBtb3JlIHRoYW4gb25lIHJ1bGUsIHlvdSBzaG91bGRcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIHNpbXBsZSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIFtudWxsXSBvciBbdW5kZWZpbmVkXS5cbiAqL1xuZXhwb3J0IGNsYXNzIElzTnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cbiAgICovXG4gIHRhcmdldDtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzTnVsbE9yVW5kZWZpbmVkXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogYW55LFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIE5PVCBbbnVsbF0gb3IgW3VuZGVmaW5lZF0uXG4gKi9cbmV4cG9ydCBjbGFzcyBJc05vdE51bGxPclVuZGVmaW5lZCBleHRlbmRzIFNpbXBsZVJ1bGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXG4gICAqL1xuICB0YXJnZXQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc05vdE51bGxPclVuZGVmaW5lZF0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IGFueSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxuICAgICAgdGhpcy50YXJnZXQgPT09IG51bGwgfHxcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyB0cnV0aHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBJc1RydWUgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxuICAgKi9cbiAgdGFyZ2V0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNUcnVlXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBib29sZWFuLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMudGFyZ2V0ID09PSBmYWxzZSkge1xuICAgICAgLy9pZihub3QgdHJ1ZSktLT5mYWxzZTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuXG4vKipcbiAqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgdmFsdWUgaXMgZmFsc3kuXG4gKi9cbmV4cG9ydCBjbGFzcyBJc0ZhbHNlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHRhcmdldCB2YWx1ZSB0byBldmFsdWF0ZS5cbiAgICovXG4gIHRhcmdldDogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzRmFsc2VdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBib29sZWFuLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgIC8vaWYodHJ1ZSktLT5mYWxzZTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuLyoqXG4gKiBVc2UgdGhlIFtNaW5dIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgdmFsdWUgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHRoZSBtaW5pbXVtXG4gKiBhbGxvd2VkIHZhbHVlIFtjb21wYXJpc29uXS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbiBleHRlbmRzIFNpbXBsZVJ1bGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICB0YXJnZXQ6IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxuICAgKi9cbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbTWluXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgY29uc3QgY29tcGFyZVJlc3VsdCA9IGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSk7XG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuTGVzcykge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7IC8vbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIGNvbXBhcmlzb24gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG4vKipcbiAqIFVzZSB0aGUgW01heF0gcnVsZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCB2YWx1ZSBpcyBlcXVhbCB0byBvciBsZXNzIHRoYW5cbiAqIHRoZSBjb21wYXJpc29uIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgTWF4IGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNYXhdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcbiAgICBpZiAoY29tcGFyZVJlc3VsdCA9PT0gQ29tcGFyZVJlc3VsdC5HcmVhdGVyKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4vTWluJztcbmltcG9ydCB7IE1heCB9IGZyb20gJy4vTWF4JztcblxuLyoqXG4gKiBVc2UgdGhpcyBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgc3BlY2lmaWVkIHRhcmdldCBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZSAoc3RhcnQgYW5kIGVuZCkgdmFsdWVzLlxuICpcbiAqIFRoZSByYW5nZSB2YWx1ZXMgYXJlIGluY2x1c2l2ZS5cbiAqXG4gKiBFeDogMSBpcyB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyB2YWxpZC5cbiAqIEV4OiAyIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxuICogRXg6IDAgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cbiAqIEV4OiA0IGlzIG5vdCB3aXRoaW4gMSBhbmQgMy4gVGhlIHRhcmdldCBpcyBub3QgdmFsaWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xuICAvKipcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBlbmQgdmFsdWUgb2YgdGhlIHJhbmdlLlxuICAgKi9cbiAgZW5kOiBudW1iZXI7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXJ0IHZhbHVlIG9mIHRoZSByYW5nZS5cbiAgICovXG4gIHN0YXJ0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIFtwcmltaXRpdmVdIHZhbHVlIHRoYXQgd2lsbCBiZSBldmFsdWF0ZWQuIFRoZSB2YWx1ZVxuICAgKiBtdXN0IGJlIHdpdGhpbiB0aGUgW3N0YXJ0XSBhbmQgdGhlIFtlbmRdIHZhbHVlIHRvIGJlIHZhbGlkLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgW1JhbmdlXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2U6IEEgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRoYXQgdGhlIHJ1bGVzIHdpbGwgYmUgYXBwbGllZCB0by5cbiAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCByYW5nZSB2YWx1ZSAtIHRoZSBsb3dlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cbiAgICogQHBhcmFtIGVuZCBUaGUgZW5kIHJhbmdlIHZhbHVlIC0gdGhlIGhpZ2hlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IChPcHRpb25hbCkgSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBtYXkgYmUgZGlzcGxheWVkIG9yIHZpc2libGUgdG8gdGhlIGNhbGxlciBvciBjbGllbnQuIERlZmF1bHQgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgc3RhcnQ6IG51bWJlcixcbiAgICBlbmQ6IG51bWJlcixcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XG5cbiAgICB0aGlzLnJ1bGVzLnB1c2goXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXG4gICAgICAgICdUYXJnZXRJc05vdE51bGwnLFxuICAgICAgICAnVGhlIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxuICAgICAgICB0aGlzLnRhcmdldFxuICAgICAgKVxuICAgICk7XG5cbiAgICBpZiAodGhpcy50YXJnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxuICAgICAgICBuZXcgTWluKFxuICAgICAgICAgICdNaW5WYWx1ZScsXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc3RhcnQgcmFuZ2UgdmFsdWUuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldCxcbiAgICAgICAgICB0aGlzLnN0YXJ0XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICB0aGlzLnJ1bGVzLnB1c2goXG4gICAgICAgIG5ldyBNYXgoXG4gICAgICAgICAgJ01heFZhbHVlJyxcbiAgICAgICAgICAnVGhlIHZhbHVlIG11c3QgYmUgZXF1YWwgdG8gb3IgbGVzcyB0aGFuIHRoZSBlbmQgcmFuZ2UgdmFsdWUuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldCxcbiAgICAgICAgICB0aGlzLmVuZFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFyZUVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVFcXVhbFJ1bGVdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgaWYgKGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSkgIT09IENvbXBhcmVSZXN1bHQuRXF1YWwpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuLyoqXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgbm90IGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFyZU5vdEVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVOb3RFcXVhbFJ1bGVdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgaXMgW3RydWVdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSA9PT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJy4vUmFuZ2UnO1xuXG4vKipcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gdmFsaWRhdGUgYSBzdHJpbmcgdGFyZ2V0LiBBIHZhbGlkIHN0cmluZyBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQ7IGFuZCBpdFxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxuICovXG5leHBvcnQgY2xhc3MgU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xuICAvKipcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxuICAgKi9cbiAgbWF4TGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxuICAgKi9cbiAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFVzZSB0byBwcm92aWRlIHRoZSB0YXJnZXQgW1ByaW1pdGl2ZV0gdG8gZXZhbHVhdGUgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZVJ1bGVdLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZShzKSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gbWluTGVuZ3RoIFRoZSBtaW5pbXVtIGFsbG93ZWQgbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXG4gICAgbWF4TGVuZ3RoOiBudW1iZXIsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xuXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgaGVscGVyIG1ldGhvZCB0byBjb25maWd1cmUvYWRkIHJ1bGVzIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqL1xuXG4gIGNvbmZpZ3VyZVJ1bGVzKCkge1xuICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcbiAgICAgICAgJ1N0cmluZ0lzTm90TnVsbCcsXG4gICAgICAgICdUaGUgc3RyaW5nIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxuICAgICAgICB0aGlzLnRhcmdldFxuICAgICAgKVxuICAgICk7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgICAgbmV3IFJhbmdlKFxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcbiAgICAgICAgICAnVGhlIHN0cmluZyB2YWx1ZSBpcyBub3Qgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuJyxcbiAgICAgICAgICB0aGlzLnRhcmdldC50b1N0cmluZygpLmxlbmd0aCxcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcbiAgICAgICAgICB0aGlzLm1heExlbmd0aFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICcuL1NlcnZpY2VNZXNzYWdlJztcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gbWFuYWdlIHRoZSBjb250ZXh0IG9mIGEgc2luZ2xlIHNlcnZpY2UgY2FsbC4gVGhpc1xuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcbiAqIG9mIGEgc2VydmljZSByZXF1ZXN0LlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xuICAvKipcbiAgICogQSBsaXN0IG9mIHNlcnZpY2UgbWVzc2FnZXMgYWRkZWQgYnkgdGhlIGFwcGxpY2F0aW9uIGR1cmluZyB0aGUgcHJvY2Vzc2luZyBvZiB0aGVcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cbiAgICovXG4gIE1lc3NhZ2VzOiBBcnJheTxTZXJ2aWNlTWVzc2FnZT4gPSBuZXcgQXJyYXk8U2VydmljZU1lc3NhZ2U+KCk7XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhZGQgYSBuZXcgbWVzc2FnZSB0byB0aGUgW1NlcnZpY2VDb250ZXh0XS5cbiAgICovXG4gIGFkZE1lc3NhZ2UobWVzc2FnZTogU2VydmljZU1lc3NhZ2UpIHtcbiAgICB0aGlzLk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cbiAgICovXG4gIGhhc0Vycm9ycygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZXMgPSB0aGlzLk1lc3NhZ2VzLmZpbHRlcihcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxuICAgICAgKTtcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxuICAgKi9cbiAgaXNHb29kKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXG4gICAgICApO1xuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xuXG4vKipcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIGNyZWF0ZSBhIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZSB7XG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZS4gKi9cbiAgTmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbWVzc2FnZS4gKi9cbiAgTWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gc3BlY2lmaXkgICovXG4gIE1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZTtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuICovXG4gIFNvdXJjZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuICovXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXI6IEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5YWJsZS5cbiAgICovXG5cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcbiAgICBzb3VyY2U/OiBzdHJpbmdcbiAgKTtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcbiAgICBzb3VyY2U/OiBzdHJpbmdcbiAgKTtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXIgVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxuICAgIHNvdXJjZT86IHN0cmluZyxcbiAgICBkaXNwbGF5VG9Vc2VyOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgdGhpcy5OYW1lID0gbmFtZTtcbiAgICB0aGlzLk1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XG4gICAgfVxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXG4gICAqL1xuICBXaXRoTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBtZXNzYWdlIHRleHQgdG8gdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cbiAgICovXG4gIFdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtNZXNzYWdlVHlwZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXG4gICAqL1xuICBXaXRoTWVzc2FnZVR5cGUobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlKSB7XG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXG4gICAqL1xuICBXaXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtEaXNwbGF5VG9Vc2VyXSBpbmRpY2F0b3Igb2YgdGhlIFNlcnZpY2VNZXNzYWdlLlxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXG4gICAqL1xuICBXaXRoRGlzcGxheVRvVXNlcihkaXNwbGF5VG9Vc2VyOiBib29sZWFuKSB7XG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgU2VydmljZU1lc3NhZ2UuXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYE5hbWU6ICR7dGhpcy5OYW1lfTsgTWVzc2FnZTogJHtcbiAgICAgIHRoaXMuTWVzc2FnZVxuICAgIH07IE1lc3NhZ2VUeXBlOiAke3RoaXMuTWVzc2FnZVR5cGUudG9TdHJpbmcoKX07IFNvdXJjZTogJHtcbiAgICAgIHRoaXMuU291cmNlXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVZhbGlkYXRpb25Db250ZXh0IH0gZnJvbSAnLi9JVmFsaWRhdGlvbkNvbnRleHQnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJy4vVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVBvbGljeSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbmV3IFZhbGlkYXRpb24gQ29udGV4dCBmb3IgeW91ciBhcHBsaWNhdGlvbi4gV2l0aCB0aGlzXG4gKiBjb250ZXh0LCB5b3UgY2FuIGFkZCBydWxlcyBhbmQgZXZhbHVhdGUgdGhlIHJ1bGVzLlxuICpcbiAqIEFmdGVyIHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkLCB5b3UgY2FuIHVzZSB0aGUgVmFsaWRhdGlvbiBDb250ZXh0IHRvIGRldGVybWluZSBpZiB0aGVyZSBhcmVcbiAqIGFueSBydWxlIHZpb2xhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uQ29udGV4dCBpbXBsZW1lbnRzIElWYWxpZGF0aW9uQ29udGV4dCB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXRlIG9mIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqL1xuICBzdGF0ZTogVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuTm90RXZhbHVhdGVkO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgYWxsIGV2YWx1YXRlZCBydWxlcyB0aGF0IGJlbG9uZyB0byB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxuICAgKi9cbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciByZW5kZXJpbmcuXG4gICAqL1xuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcblxuICAvKipcbiAgICogVGhlIHNvdXJjZSBvZiB0aGUgc3BlY2lmaWVkIHZhbGlkYXRpb24gY29udGV4dCBpbnN0YW5jZS5cbiAgICovXG4gIHNvdXJjZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBiYXNlIHZhbGlkYXRpb24gY29udGV4dC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ1RoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGlzIHJlYWR5IGZvciBhY3Rpb24ocykuIEFsbCB0aGluZ3MgYXJlIGdvb2QgdW50aWwgYnJva2VuLi4uJ1xuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBydWxlIHRvIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cbiAgICovXG4gIGFkZFJ1bGUocnVsZTogUnVsZVBvbGljeSkge1xuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgcnVsZS5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICB9XG4gICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBmb3IgdGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBjb250ZXh0LlxuICAgKiBAcGFyYW0gc291cmNlXG4gICAqL1xuICB3aXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGV4ZWN1dGUgdGhlIHJ1bGVzIGFkZGVkIHRvIHRoZSBbVmFsaWRhdGlvbkNvbnRleHRdLlxuICAgKi9cbiAgcmVuZGVyUnVsZXMoKSB7XG4gICAgdGhpcy5yZXN1bHRzID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhpcy5ydWxlc1xuICAgICAgLnNvcnQociA9PiByLnByaW9yaXR5KVxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cbiAgICovXG4gIGhhc1J1bGVWaW9sYXRpb25zKCk6IGJvb2xlYW4ge1xuICAgIGxldCBoYXNWaW9sYXRpb25zID0gZmFsc2U7XG4gICAgaWYgKHRoaXMucnVsZXMpIHtcbiAgICAgIGNvbnN0IHJ1bGVWaW9sYXRpb25zQ291bnQgPVxuICAgICAgICB0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoO1xuICAgICAgaWYgKHJ1bGVWaW9sYXRpb25zQ291bnQgPiAwKSB7XG4gICAgICAgIGhhc1Zpb2xhdGlvbnMgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGFzVmlvbGF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiAqVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaXMgdmFsaWQgLSBubyBydWxlIHZpb2xhdGlvbnMuXG4gICAqL1xuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICBsZXQgaXNSdWxlVmFsaWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLnJ1bGVzKSB7XG4gICAgICBjb25zdCBpbnZhbGlkUnVsZXNDb3VudCA9IHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSlcbiAgICAgICAgLmxlbmd0aDtcbiAgICAgIGlmIChpbnZhbGlkUnVsZXNDb3VudCA+IDApIHtcbiAgICAgICAgaXNSdWxlVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGlzUnVsZVZhbGlkO1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O2dCQUdDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCOzswQ0FMRDs7Ozs7Ozs7OztBQ01BOzs7QUFBQTs7Ozs7O0lBcUNFLG9CQUFZLFVBQXNCLEVBQUUsTUFBWTs7Ozt1QkFqQ3RDLEtBQUs7UUFrQ2IsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtxQkFsREg7SUFtREM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREQ7Ozs7QUFPQTs7OztBQUFBOzs7Ozs7Ozs7O0lBNENFLG9CQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsYUFBOEIsRUFDOUIsUUFBdUMsRUFDdkMsUUFBb0I7UUFGcEIsOEJBQUEsRUFBQSxxQkFBOEI7UUFDOUIseUJBQUEsRUFBQSxXQUFxQixRQUFRLENBQUMsU0FBUztRQUN2Qyx5QkFBQSxFQUFBLFlBQW9COzs7O3VCQS9DWixJQUFJOzs7OzBCQWtCVyxVQUFVLENBQUMsZ0JBQWdCOzs7O3dCQUcvQixRQUFRLENBQUMsU0FBUztRQTRCckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7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