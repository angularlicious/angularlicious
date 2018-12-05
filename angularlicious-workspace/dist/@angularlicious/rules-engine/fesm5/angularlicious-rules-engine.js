import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { compare } from 'typescript-dotnet-commonjs/System/Compare';
import { __extends } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AngularliciousRulesEngineModule = /** @class */ (function () {
    function AngularliciousRulesEngineModule() {
    }
    AngularliciousRulesEngineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule]
                },] }
    ];
    return AngularliciousRulesEngineModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
RenderType[RenderType.ExitOnFirstFalseEvaluation] = 'ExitOnFirstFalseEvaluation';
RenderType[RenderType.ExitOnFirstTrueEvaluation] = 'ExitOnFirstTrueEvaluation';
RenderType[RenderType.EvaluateAllRules] = 'EvaluateAllRules';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     */
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var compareResult = compare(this.target, this.comparison, true);
        if (compareResult === -1 /* Less */) {
            this.isValid = false; //must be equal to or greater than the comparison value;
        }
        return new RuleResult(this, this.target);
    };
    return Min;
}(SimpleRule));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var compareResult = compare(this.target, this.comparison, true);
        if (compareResult === 1 /* Greater */) {
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    };
    return Max;
}(SimpleRule));

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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            /** @type {?} */
            var errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
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
            /** @type {?} */
            var errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            this.MessageType = (/** @type {?} */ (messageType));
        }
        if (source) {
            this.Source = (/** @type {?} */ (source));
        }
    }
    /**
     * Use this extension method to add the name of the message.
     * @param name The name of the service message.
     */
    /**
     * Use this extension method to add the name of the message.
     * @template THIS
     * @this {THIS}
     * @param {?} name The name of the service message.
     * @return {THIS}
     */
    ServiceMessage.prototype.WithName = /**
     * Use this extension method to add the name of the message.
     * @template THIS
     * @this {THIS}
     * @param {?} name The name of the service message.
     * @return {THIS}
     */
    function (name) {
        (/** @type {?} */ (this)).Name = name;
        return (/** @type {?} */ (this));
    };
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param message The display text of the service message.
     */
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} message The display text of the service message.
     * @return {THIS}
     */
    ServiceMessage.prototype.WithMessage = /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} message The display text of the service message.
     * @return {THIS}
     */
    function (message) {
        (/** @type {?} */ (this)).Message = message;
        return (/** @type {?} */ (this));
    };
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param messageType: Use to indicate the message type.
     */
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} messageType
     * @return {THIS}
     */
    ServiceMessage.prototype.WithMessageType = /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} messageType
     * @return {THIS}
     */
    function (messageType) {
        (/** @type {?} */ (this)).MessageType = messageType;
        return (/** @type {?} */ (this));
    };
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param source: Use to indicate the source of the message.
     */
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    ServiceMessage.prototype.WithSource = /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    function (source) {
        (/** @type {?} */ (this)).Source = source;
        return (/** @type {?} */ (this));
    };
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
     */
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @template THIS
     * @this {THIS}
     * @param {?} displayToUser
     * @return {THIS}
     */
    ServiceMessage.prototype.WithDisplayToUser = /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @template THIS
     * @this {THIS}
     * @param {?} displayToUser
     * @return {THIS}
     */
    function (displayToUser) {
        (/** @type {?} */ (this)).DisplayToUser = displayToUser;
        return (/** @type {?} */ (this));
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @template THIS
     * @this {THIS}
     * @param {?} rule
     * @return {THIS}
     */
    ValidationContext.prototype.addRule = /**
     * Use this method to add a new rule to the ValidationContext.
     * @template THIS
     * @this {THIS}
     * @param {?} rule
     * @return {THIS}
     */
    function (rule) {
        if ((/** @type {?} */ (this)).source) {
            rule.source = (/** @type {?} */ (this)).source;
        }
        (/** @type {?} */ (this)).rules.push(rule);
        return (/** @type {?} */ (this));
    };
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @param source
     */
    /**
     * Use this extension method to set the [Source] for the current validation context.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    ValidationContext.prototype.withSource = /**
     * Use this extension method to set the [Source] for the current validation context.
     * @template THIS
     * @this {THIS}
     * @param {?} source
     * @return {THIS}
     */
    function (source) {
        (/** @type {?} */ (this)).source = source;
        return (/** @type {?} */ (this));
    };
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     */
    /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    ValidationContext.prototype.renderRules = /**
     * Use this method to execute the rules added to the [ValidationContext].
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        var _this = this;
        (/** @type {?} */ (this)).results = new Array();
        if ((/** @type {?} */ (this)).rules && (/** @type {?} */ (this)).rules.length < 1) {
            return (/** @type {?} */ (this));
        }
        (/** @type {?} */ (this)).rules
            .sort(function (r) { return r.priority; })
            .forEach(function (r) { return (/** @type {?} */ (_this)).results.push(r.execute()); });
        return (/** @type {?} */ (this));
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
        /** @type {?} */
        var hasViolations = false;
        if (this.rules) {
            /** @type {?} */
            var ruleViolationsCount = this.rules && this.rules.filter(function (r) { return r.isValid === false; }).length;
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
            /** @type {?} */
            var isRuleValid = true;
            if (this.rules) {
                /** @type {?} */
                var invalidRulesCount = this.rules.filter(function (r) { return r.isValid === false; })
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
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularliciousRulesEngineModule, RuleResult, RulePolicy, RenderType, CompositeRule, SimpleRule, IsNullOrUndefined, IsNotNullOrUndefined, IsTrue, IsFalse, Min, Max, Range, AreEqual, AreNotEqual, StringIsNotNullEmptyRange, Severity, ServiceContext, ServiceMessage, MessageType, ValidationContext, ValidationContextState };

//# sourceMappingURL=angularlicious-rules-engine.js.map