(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('typescript-dotnet-commonjs/System/Compare')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/rules-engine', ['exports', '@angular/core', '@angular/common', 'typescript-dotnet-commonjs/System/Compare'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious['rules-engine'] = {}),global.ng.core,global.ng.common,null));
}(this, (function (exports,core,common,Compare) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AngularliciousRulesEngineModule = (function () {
        function AngularliciousRulesEngineModule() {
        }
        AngularliciousRulesEngineModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule]
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
    var /**
     * This class defines the result of a single rule evaluation.
     */ RuleResult = (function () {
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
    var /**
     * This is the base class for all rules. All rules will extend from this class. New rules
     * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
     */ RulePolicy = (function () {
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
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
            if (severity === void 0) {
                severity = Severity.Exception;
            }
            if (priority === void 0) {
                priority = 0;
            }
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
     * other rules.
     */
    var /**
     * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
     * other rules.
     */ CompositeRule = (function (_super) {
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
    var /**
     * Use this class as a base [extends] class for simple rules. A simple contains
     * a single rule and target to evaluate.
     *
     * If you require a rule that will contain more than one rule, you should
     * use extend the [CompositeRule] class.
     */ SimpleRule = (function (_super) {
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
    var /**
     * Use to determine if the target is [null] or [undefined].
     */ IsNullOrUndefined = (function (_super) {
        __extends(IsNullOrUndefined, _super);
        /**
         * The constructor for the [IsNullOrUndefined] rule.
         * @param name The name of the rule.
         * @param message The message to display when the rule is violated.
         * @param target The target that the rules are evaluated against.
         * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
         */
        function IsNullOrUndefined(name, message, target, isDisplayable) {
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
    var /**
     * Use to determine if the target is NOT [null] or [undefined].
     */ IsNotNullOrUndefined = (function (_super) {
        __extends(IsNotNullOrUndefined, _super);
        /**
         * The constructor for the [IsNotNullOrUndefined] rule.
         * @param name The name of the rule.
         * @param message The message to display when the rule is violated.
         * @param target The target that the rules are evaluated against.
         * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
         */
        function IsNotNullOrUndefined(name, message, target, isDisplayable) {
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
    var /**
     * Use to determine if the target is truthy.
     */ IsTrue = (function (_super) {
        __extends(IsTrue, _super);
        /**
         * The constructor for the [IsTrue] rule.
         * @param name The name of the rule.
         * @param message The message to display when the rule is violated.
         * @param target The target that the rules are evaluated against.
         * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [true].
         */
        function IsTrue(name, message, target, isDisplayable) {
            if (isDisplayable === void 0) {
                isDisplayable = true;
            }
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
    var /**
     * Use to indicate if the value is falsy.
     */ IsFalse = (function (_super) {
        __extends(IsFalse, _super);
        /**
         * The constructor for the [IsFalse] rule.
         * @param name The name of the rule.
         * @param message The message to display when the rule is violated.
         * @param target The target that the rules are evaluated against.
         * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
         */
        function IsFalse(name, message, target, isDisplayable) {
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
    var /**
     * Use the [Min] rule to determine if the target value is equal to or greater than the minimum
     * allowed value [comparison].
     */ Min = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
                var /** @type {?} */ compareResult = Compare.compare(this.target, this.comparison, true);
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
    var /**
     * Use the [Max] rule to determine if the target value is equal to or less than
     * the comparison value.
     */ Max = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
                var /** @type {?} */ compareResult = Compare.compare(this.target, this.comparison, true);
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
    var /**
     * Use this rule to determine if the specified target is within the specified range (start and end) values.
     *
     * The range values are inclusive.
     *
     * Ex: 1 is within 1 and 3. The target is valid.
     * Ex: 2 is within 1 and 3. The target is valid.
     * Ex: 0 is not within 1 and 3. The target is not valid.
     * Ex: 4 is not within 1 and 3. The target is not valid.
     */ Range = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
    var /**
     * Use to determine if the target is equal to the comparison target.
     */ AreEqual = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = true;
            }
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
                if (Compare.compare(this.target, this.comparison, true) !== 0 /* Equal */) {
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
    var /**
     * Use to determine if the target is not equal to the comparison target.
     */ AreNotEqual = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = true;
            }
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
                if (Compare.compare(this.target, this.comparison, true) === 0 /* Equal */) {
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
    var /**
     * Use this rule to validate a string target. A valid string is not null or undefined; and it
     * is within the specified minimum and maxiumum length.
     */ StringIsNotNullEmptyRange = (function (_super) {
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
            if (isDisplayable === void 0) {
                isDisplayable = false;
            }
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
    var /**
     * Use this class to manage the context of a single service call. This
     * class will contain a list of any service messages added during the processing
     * of a service request.
     */ ServiceContext = (function () {
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
    var /**
     * Use this class to create a message for the current [ServiceContext].
     */ ServiceMessage = (function () {
        /**
         *
         * @param name The name of the message.
         * @param message The display text of the message.
         * @param messageType: Indicates the type of message.
         * @param source: Indicates the source of the message.
         * @param displayToUser Use to indicate if the specified message should be displayed to the user.
         */
        function ServiceMessage(name, message, messageType, source, displayToUser) {
            if (displayToUser === void 0) {
                displayToUser = false;
            }
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
    var /**
     * Use this class to create a new Validation Context for your application. With this
     * context, you can add rules and evaluate the rules.
     *
     * After the rules are evaluated, you can use the Validation Context to determine if there are
     * any rule violations.
     */ ValidationContext = (function () {
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
             */ function () {
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

    exports.AngularliciousRulesEngineModule = AngularliciousRulesEngineModule;
    exports.RuleResult = RuleResult;
    exports.RulePolicy = RulePolicy;
    exports.RenderType = RenderType;
    exports.CompositeRule = CompositeRule;
    exports.SimpleRule = SimpleRule;
    exports.IsNullOrUndefined = IsNullOrUndefined;
    exports.IsNotNullOrUndefined = IsNotNullOrUndefined;
    exports.IsTrue = IsTrue;
    exports.IsFalse = IsFalse;
    exports.Min = Min;
    exports.Max = Max;
    exports.Range = Range;
    exports.AreEqual = AreEqual;
    exports.AreNotEqual = AreNotEqual;
    exports.StringIsNotNullEmptyRange = StringIsNotNullEmptyRange;
    exports.Severity = Severity;
    exports.ServiceContext = ServiceContext;
    exports.ServiceMessage = ServiceMessage;
    exports.MessageType = MessageType;
    exports.ValidationContext = ValidationContext;
    exports.ValidationContextState = ValidationContextState;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMtZW5naW5lLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvUnVsZVJlc3VsdC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvUnVsZVBvbGljeS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgcmVzdWx0IG9mIGEgc2luZ2xlIHJ1bGUgZXZhbHVhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUmVzdWx0IHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cclxuICAgKi9cclxuICBpc1ZhbGlkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBydWxlIHRoYXQgd2FzIGV2YWx1YXRlZC5cclxuICAgKi9cclxuICBydWxlUG9saWN5OiBSdWxlUG9saWN5O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcnVsZSBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoZSBldmFsdWF0aW9uIFtpc1ZhbGlkXSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxyXG4gICAqL1xyXG4gIHRhcmdldDogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIHRhcmdldCBVc2UgdG8gc3BlY2lmeSB0aGUgdGFyZ2V0IHRvIGJlIGV2YWx1YXRlZCBieSB0aGUgcnVsZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IENvbXBvc2l0ZVJ1bGUpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldD86IGFueSkge1xyXG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJ1bGVQb2xpY3kgPSBydWxlUG9saWN5O1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBydWxlUG9saWN5LmlzVmFsaWQ7XHJcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcclxuICAgIH1cclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJUnVsZUNvbXBvbmVudCB9IGZyb20gJy4vSVJ1bGVDb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUmVuZGVyVHlwZSB9IGZyb20gJy4vUmVuZGVyVHlwZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnLi9TZXZlcml0eSc7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIHJ1bGVzLiBBbGwgcnVsZXMgd2lsbCBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLiBOZXcgcnVsZXNcclxuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUG9saWN5IGltcGxlbWVudHMgSVJ1bGVDb21wb25lbnQge1xyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xyXG4gIGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuXHJcbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xyXG4gIHJlc3VsdDogUnVsZVJlc3VsdDtcclxuXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cclxuICByZW5kZXJUeXBlOiBSZW5kZXJUeXBlID0gUmVuZGVyVHlwZS5FdmFsdWF0ZUFsbFJ1bGVzO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5ID0gU2V2ZXJpdHkuRXhjZXB0aW9uO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS5cclxuICAgKi9cclxuICBleGVjdXRlKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWFjaCBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFtSdWxlUmVzdWx0XS5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGFzIGEgYmFzZSBjbGFzcyBmb3IgYSBjb21wbGV4IHJ1bGUgLSBhIHJ1bGUgdGhhdCBjb250YWluc1xyXG4gKiBvdGhlciBydWxlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGVzIGlmIHRoZSBydWxlIGhhcyBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgZXZhbHVhdGVkIHJ1bGVzLiBSdWxlcyBtdXN0IGJlIHJlbmRlcmVkL2V4ZWN1dGVkIGJlZm9yZVxyXG4gICAqIGFueSByZXN1bHRzIGFyZSBhdmFpbGFibGUuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciB0aGUgc3BlY2lmaWVkIGNvbXBvc2l0ZSBydWxlLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGUgSW5kaWNhdGVzIGlmIHRoZSBydWxlIGlzIGRpc3BsYXlhYmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhpcy5ydWxlc1xyXG4gICAgICAuc29ydChzID0+IHMucHJpb3JpdHkpXHJcbiAgICAgIC5mb3JFYWNoKHIgPT4gdGhpcy5yZXN1bHRzLnB1c2goci5leGVjdXRlKCkpKTtcclxuICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXN1bHRzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21wb3NpdGUgcnVsZSBoYXMgY2hpbGQtcnVsZXMgdGhhdCBhcmVcclxuICAgKiBtZW1iZXJzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS5cclxuICAgKi9cclxuICBwdWJsaWMgaGFzUnVsZXMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvY2VzcyB0aGUgcmVzdWx0cyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUgcmVzdWx0IGNvbGxlY3Rpb24uIENvbXBvc2l0ZVxyXG4gICAqIHJ1bGVzIHdpbGwgaGF2ZSBvbmUgb3IgbW9yZSBydWxlIHJlc3VsdHMgZm9yIGFsbCBjaGlsZC1ydWxlcy5cclxuICAgKlxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHJlc3VsdCB3aXRoIHRoZSBldmFsdWF0aW9uIHN1bW1hcnkgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcHJvY2Vzc1Jlc3VsdHMoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAodGhpcy5yZXN1bHRzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgYXMgYSBiYXNlIFtleHRlbmRzXSBjbGFzcyBmb3Igc2ltcGxlIHJ1bGVzLiBBIHNpbXBsZSBjb250YWluc1xyXG4gKiBhIHNpbmdsZSBydWxlIGFuZCB0YXJnZXQgdG8gZXZhbHVhdGUuXHJcbiAqXHJcbiAqIElmIHlvdSByZXF1aXJlIGEgcnVsZSB0aGF0IHdpbGwgY29udGFpbiBtb3JlIHRoYW4gb25lIHJ1bGUsIHlvdSBzaG91bGRcclxuICogdXNlIGV4dGVuZCB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBzaW1wbGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBbbnVsbF0gb3IgW3VuZGVmaW5lZF0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSXNOdWxsT3JVbmRlZmluZWQgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc051bGxPclVuZGVmaW5lZF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGFueSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIE5PVCBbbnVsbF0gb3IgW3VuZGVmaW5lZF0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSXNOb3ROdWxsT3JVbmRlZmluZWQgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc05vdE51bGxPclVuZGVmaW5lZF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGFueSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XHJcbiAgICAgIHRoaXMudGFyZ2V0ID09PSBudWxsIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgdHJ1dGh5LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzVHJ1ZSBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxyXG4gICAqL1xyXG4gIHRhcmdldDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzVHJ1ZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogYm9vbGVhbixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0ID09PSBmYWxzZSkge1xyXG4gICAgICAvL2lmKG5vdCB0cnVlKS0tPmZhbHNlO1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHZhbHVlIGlzIGZhbHN5LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzRmFsc2UgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHRhcmdldCB2YWx1ZSB0byBldmFsdWF0ZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc0ZhbHNlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogYm9vbGVhbixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgIC8vaWYodHJ1ZSktLT5mYWxzZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBbTWluXSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgbWluaW11bVxyXG4gKiBhbGxvd2VkIHZhbHVlIFtjb21wYXJpc29uXS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNaW4gZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW01pbl0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xyXG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuTGVzcykge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTsgLy9tdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgY29tcGFyaXNvbiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtNYXhdIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgdmFsdWUgaXMgZXF1YWwgdG8gb3IgbGVzcyB0aGFuXHJcbiAqIHRoZSBjb21wYXJpc29uIHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1heCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbTWF4XSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgY29uc3QgY29tcGFyZVJlc3VsdCA9IGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSk7XHJcbiAgICBpZiAoY29tcGFyZVJlc3VsdCA9PT0gQ29tcGFyZVJlc3VsdC5HcmVhdGVyKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XHJcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4vTWluJztcclxuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi9NYXgnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgdGFyZ2V0IGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIChzdGFydCBhbmQgZW5kKSB2YWx1ZXMuXHJcbiAqXHJcbiAqIFRoZSByYW5nZSB2YWx1ZXMgYXJlIGluY2x1c2l2ZS5cclxuICpcclxuICogRXg6IDEgaXMgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgdmFsaWQuXHJcbiAqIEV4OiAyIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKiBFeDogNCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBlbmQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIGVuZDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhcnQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIHN0YXJ0OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBbcHJpbWl0aXZlXSB2YWx1ZSB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkLiBUaGUgdmFsdWVcclxuICAgKiBtdXN0IGJlIHdpdGhpbiB0aGUgW3N0YXJ0XSBhbmQgdGhlIFtlbmRdIHZhbHVlIHRvIGJlIHZhbGlkLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFtSYW5nZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZTogQSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSBydWxlcyB3aWxsIGJlIGFwcGxpZWQgdG8uXHJcbiAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCByYW5nZSB2YWx1ZSAtIHRoZSBsb3dlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgcmFuZ2UgdmFsdWUgLSB0aGUgaGlnaGVzdCBhbGxvd2VkIGJvdW5kYXJ5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gbWF5IGJlIGRpc3BsYXllZCBvciB2aXNpYmxlIHRvIHRoZSBjYWxsZXIgb3IgY2xpZW50LiBEZWZhdWx0IGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIHN0YXJ0OiBudW1iZXIsXHJcbiAgICBlbmQ6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcclxuXHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnVGFyZ2V0SXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxyXG4gICAgICAgIHRoaXMudGFyZ2V0XHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNaW4oXHJcbiAgICAgICAgICAnTWluVmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc3RhcnQgcmFuZ2UgdmFsdWUuJyxcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGhpcy5zdGFydFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNYXgoXHJcbiAgICAgICAgICAnTWF4VmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGxlc3MgdGhhbiB0aGUgZW5kIHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuZW5kXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcmVFcXVhbCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgY29tcGFyaXNvbjogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbQXJlRXF1YWxSdWxlXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW3RydWVdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmIChjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpICE9PSBDb21wYXJlUmVzdWx0LkVxdWFsKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBub3QgZXF1YWwgdG8gdGhlIGNvbXBhcmlzb24gdGFyZ2V0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFyZU5vdEVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVOb3RFcXVhbFJ1bGVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IChPcHRpb25hbCkgSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSA9PT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5pbXBvcnQgeyBJc05vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vSXNOb3ROdWxsT3JVbmRlZmluZWQnO1xyXG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJy4vUmFuZ2UnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gdmFsaWRhdGUgYSBzdHJpbmcgdGFyZ2V0LiBBIHZhbGlkIHN0cmluZyBpcyBub3QgbnVsbCBvciB1bmRlZmluZWQ7IGFuZCBpdFxyXG4gKiBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCBtaW5pbXVtIGFuZCBtYXhpdW11bSBsZW5ndGguXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZSBleHRlbmRzIENvbXBvc2l0ZVJ1bGUge1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBtYXhMZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtaW5pbXVtIGxlbnRoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgbWluTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBwcm92aWRlIHRoZSB0YXJnZXQgW1ByaW1pdGl2ZV0gdG8gZXZhbHVhdGUgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2VSdWxlXS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGUocykgd2lsbCBiZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gbWluTGVuZ3RoIFRoZSBtaW5pbXVtIGFsbG93ZWQgbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICogQHBhcmFtIG1heExlbmd0aCBUaGUgbWF4aW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBtaW5MZW5ndGg6IG51bWJlcixcclxuICAgIG1heExlbmd0aDogbnVtYmVyLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5taW5MZW5ndGggPSBtaW5MZW5ndGg7XHJcbiAgICB0aGlzLm1heExlbmd0aCA9IG1heExlbmd0aDtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZVJ1bGVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBIGhlbHBlciBtZXRob2QgdG8gY29uZmlndXJlL2FkZCBydWxlcyB0byB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG5cclxuICBjb25maWd1cmVSdWxlcygpIHtcclxuICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgbmV3IElzTm90TnVsbE9yVW5kZWZpbmVkKFxyXG4gICAgICAgICdTdHJpbmdJc05vdE51bGwnLFxyXG4gICAgICAgICdUaGUgc3RyaW5nIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxyXG4gICAgICAgIHRoaXMudGFyZ2V0XHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICBpZiAodGhpcy50YXJnZXQgIT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgICAgbmV3IFJhbmdlKFxyXG4gICAgICAgICAgJ1RhcmdldExlbmd0aElzV2l0aGluUmFuZ2UnLFxyXG4gICAgICAgICAgJ1RoZSBzdHJpbmcgdmFsdWUgaXMgbm90IHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldC50b1N0cmluZygpLmxlbmd0aCxcclxuICAgICAgICAgIHRoaXMubWluTGVuZ3RoLFxyXG4gICAgICAgICAgdGhpcy5tYXhMZW5ndGhcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnLi9TZXJ2aWNlTWVzc2FnZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gbWFuYWdlIHRoZSBjb250ZXh0IG9mIGEgc2luZ2xlIHNlcnZpY2UgY2FsbC4gVGhpc1xyXG4gKiBjbGFzcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIGFueSBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGR1cmluZyB0aGUgcHJvY2Vzc2luZ1xyXG4gKiBvZiBhIHNlcnZpY2UgcmVxdWVzdC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQ29udGV4dCB7XHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHNlcnZpY2UgbWVzc2FnZXMgYWRkZWQgYnkgdGhlIGFwcGxpY2F0aW9uIGR1cmluZyB0aGUgcHJvY2Vzc2luZyBvZiB0aGVcclxuICAgKiBzcGVjaWZpZWQgc2VydmljZSByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIE1lc3NhZ2VzOiBBcnJheTxTZXJ2aWNlTWVzc2FnZT4gPSBuZXcgQXJyYXk8U2VydmljZU1lc3NhZ2U+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhZGQgYSBuZXcgbWVzc2FnZSB0byB0aGUgW1NlcnZpY2VDb250ZXh0XS5cclxuICAgKi9cclxuICBhZGRNZXNzYWdlKG1lc3NhZ2U6IFNlcnZpY2VNZXNzYWdlKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gY29udGFpbnMgYW55IG1lc3NhZ2VzIHdpdGggdHlwZSBvZiBbRXJyb3JdLlxyXG4gICAqL1xyXG4gIGhhc0Vycm9ycygpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBkb2VzIG5vdCBjb250YWluIGFueSBlcnJvcnMuXHJcbiAgICovXHJcbiAgaXNHb29kKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuTWVzc2FnZXMgJiYgdGhpcy5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZXMgPSB0aGlzLk1lc3NhZ2VzLmZpbHRlcihcclxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIGNyZWF0ZSBhIG1lc3NhZ2UgZm9yIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2Uge1xyXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZS4gKi9cclxuICBOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbWVzc2FnZS4gKi9cclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmaXkgICovXHJcbiAgTWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xyXG5cclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuICovXHJcbiAgU291cmNlOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuICovXHJcbiAgRGlzcGxheVRvVXNlcjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXI6IEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxyXG4gICAgc291cmNlPzogc3RyaW5nXHJcbiAgKTtcclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlciBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxyXG4gICAgc291cmNlPzogc3RyaW5nLFxyXG4gICAgZGlzcGxheVRvVXNlcjogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVR5cGUgPSBtZXNzYWdlVHlwZSBhcyBNZXNzYWdlVHlwZTtcclxuICAgIH1cclxuICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2UgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IG5hbWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBtZXNzYWdlIHRleHQgdG8gdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgc2VydmljZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIFdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtNZXNzYWdlVHlwZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1lc3NhZ2UgdHlwZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZVR5cGUobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLlNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtEaXNwbGF5VG9Vc2VyXSBpbmRpY2F0b3Igb2YgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBBIGJvb2xlYW4gdmFsdWUgdG8gaW5kaWNhdGUgaWYgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci5cclxuICAgKi9cclxuICBXaXRoRGlzcGxheVRvVXNlcihkaXNwbGF5VG9Vc2VyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLkRpc3BsYXlUb1VzZXIgPSBkaXNwbGF5VG9Vc2VyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgU2VydmljZU1lc3NhZ2UuXHJcbiAgICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYE5hbWU6ICR7dGhpcy5OYW1lfTsgTWVzc2FnZTogJHtcclxuICAgICAgdGhpcy5NZXNzYWdlXHJcbiAgICB9OyBNZXNzYWdlVHlwZTogJHt0aGlzLk1lc3NhZ2VUeXBlLnRvU3RyaW5nKCl9OyBTb3VyY2U6ICR7XHJcbiAgICAgIHRoaXMuU291cmNlXHJcbiAgICB9OyBEaXNwbGF5VG9Vc2VyOiAke3RoaXMuRGlzcGxheVRvVXNlcn1gO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICcuL0lWYWxpZGF0aW9uQ29udGV4dCc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgfSBmcm9tICcuL1ZhbGlkYXRpb25Db250ZXh0U3RhdGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuLi9ydWxlcy9SdWxlUG9saWN5JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBuZXcgVmFsaWRhdGlvbiBDb250ZXh0IGZvciB5b3VyIGFwcGxpY2F0aW9uLiBXaXRoIHRoaXNcclxuICogY29udGV4dCwgeW91IGNhbiBhZGQgcnVsZXMgYW5kIGV2YWx1YXRlIHRoZSBydWxlcy5cclxuICpcclxuICogQWZ0ZXIgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQsIHlvdSBjYW4gdXNlIHRoZSBWYWxpZGF0aW9uIENvbnRleHQgdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGFyZVxyXG4gKiBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25Db250ZXh0IGltcGxlbWVudHMgSVZhbGlkYXRpb25Db250ZXh0IHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXRlIG9mIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgc3RhdGU6IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgPSBWYWxpZGF0aW9uQ29udGV4dFN0YXRlLk5vdEV2YWx1YXRlZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGFsbCBldmFsdWF0ZWQgcnVsZXMgdGhhdCBiZWxvbmcgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuICByZXN1bHRzOiBBcnJheTxSdWxlUmVzdWx0PiA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcnVsZXMgZm9yIHJlbmRlcmluZy5cclxuICAgKi9cclxuICBydWxlczogQXJyYXk8UnVsZVBvbGljeT4gPSBuZXcgQXJyYXk8UnVsZVBvbGljeT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNvdXJjZSBvZiB0aGUgc3BlY2lmaWVkIHZhbGlkYXRpb24gY29udGV4dCBpbnN0YW5jZS5cclxuICAgKi9cclxuICBzb3VyY2U6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgYmFzZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgJ1RoZSBbVmFsaWRhdGlvbkNvbnRleHRdIGlzIHJlYWR5IGZvciBhY3Rpb24ocykuIEFsbCB0aGluZ3MgYXJlIGdvb2QgdW50aWwgYnJva2VuLi4uJ1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBhZGQgYSBuZXcgcnVsZSB0byB0aGUgVmFsaWRhdGlvbkNvbnRleHQuXHJcbiAgICovXHJcbiAgYWRkUnVsZShydWxlOiBSdWxlUG9saWN5KSB7XHJcbiAgICBpZiAodGhpcy5zb3VyY2UpIHtcclxuICAgICAgcnVsZS5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcclxuICAgIH1cclxuICAgIHRoaXMucnVsZXMucHVzaChydWxlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtTb3VyY2VdIGZvciB0aGUgY3VycmVudCB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICogQHBhcmFtIHNvdXJjZVxyXG4gICAqL1xyXG4gIHdpdGhTb3VyY2Uoc291cmNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0uXHJcbiAgICovXHJcbiAgcmVuZGVyUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJlc3VsdHMgPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuICAgIGlmICh0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRoaXMucnVsZXNcclxuICAgICAgLnNvcnQociA9PiByLnByaW9yaXR5KVxyXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBoYXNSdWxlVmlvbGF0aW9ucygpOiBib29sZWFuIHtcclxuICAgIGxldCBoYXNWaW9sYXRpb25zID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5ydWxlcykge1xyXG4gICAgICBjb25zdCBydWxlVmlvbGF0aW9uc0NvdW50ID1cclxuICAgICAgICB0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoO1xyXG4gICAgICBpZiAocnVsZVZpb2xhdGlvbnNDb3VudCA+IDApIHtcclxuICAgICAgICBoYXNWaW9sYXRpb25zID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhhc1Zpb2xhdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAqVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgaXMgdmFsaWQgLSBubyBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaXNSdWxlVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMucnVsZXMpIHtcclxuICAgICAgY29uc3QgaW52YWxpZFJ1bGVzQ291bnQgPSB0aGlzLnJ1bGVzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpXHJcbiAgICAgICAgLmxlbmd0aDtcclxuICAgICAgaWYgKGludmFsaWRSdWxlc0NvdW50ID4gMCkge1xyXG4gICAgICAgIGlzUnVsZVZhbGlkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBpc1J1bGVWYWxpZDtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJjb21wYXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7b0JBR0NBLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksQ0FBQztxQkFDeEI7OzhDQUxEOzs7Ozs7Ozs7O0FDTUE7O1FBQUE7Ozs7OztRQXFDRSxvQkFBWSxVQUFzQixFQUFFLE1BQVk7Ozs7MkJBakN0QyxLQUFLO1lBa0NiLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDdEI7eUJBbERIO1FBbURDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakREOzs7O0FBT0E7OztRQUFBOzs7Ozs7Ozs7O1FBNENFLG9CQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsYUFBOEIsRUFDOUIsUUFBdUMsRUFDdkMsUUFBb0I7WUFGcEIsOEJBQUE7Z0JBQUEscUJBQThCOztZQUM5Qix5QkFBQTtnQkFBQSxXQUFxQixRQUFRLENBQUMsU0FBUzs7WUFDdkMseUJBQUE7Z0JBQUEsWUFBb0I7Ozs7OzJCQS9DWixJQUFJOzs7OzhCQWtCVyxVQUFVLENBQUMsZ0JBQWdCOzs7OzRCQUcvQixRQUFRLENBQUMsU0FBUztZQTRCckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMs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