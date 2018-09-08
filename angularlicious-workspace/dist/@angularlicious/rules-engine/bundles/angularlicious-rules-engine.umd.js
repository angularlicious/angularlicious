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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMtZW5naW5lLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvUnVsZVJlc3VsdC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvUnVsZVBvbGljeS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL2xpYi9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9saWIvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvbGliL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBkZWZpbmVzIHRoZSByZXN1bHQgb2YgYSBzaW5nbGUgcnVsZSBldmFsdWF0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgUnVsZVJlc3VsdCB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHJ1bGUgcmVzdWx0IGlzIHZhbGlkIG9yIG5vdC5cbiAgICovXG4gIGlzVmFsaWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgdGhhdCB3YXMgZXZhbHVhdGVkLlxuICAgKi9cbiAgcnVsZVBvbGljeTogUnVsZVBvbGljeTtcblxuICAvKipcbiAgICogVGhlIHJ1bGUgbWVzc2FnZSB0byB1c2Ugd2hlbiB0aGUgZXZhbHVhdGlvbiBbaXNWYWxpZF0gaXMgW2ZhbHNlXS5cbiAgICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRhcmdldCBpdGVtIHRoYXQgd2FzIGV2YWx1YXRlZCBieSB0aGUgc3BlY2lmaWVkIHJ1bGUgcG9saWN5LlxuICAgKi9cbiAgdGFyZ2V0OiBhbnk7XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihydWxlUG9saWN5OiBSdWxlUG9saWN5LCB0YXJnZXQ6IGFueSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogQ29tcG9zaXRlUnVsZSk7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0PzogYW55KSB7XG4gICAgaWYgKHJ1bGVQb2xpY3kgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlUG9saWN5ID0gcnVsZVBvbGljeTtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHJ1bGVQb2xpY3kuaXNWYWxpZDtcbiAgICAgIHRoaXMubWVzc2FnZSA9IHJ1bGVQb2xpY3kubWVzc2FnZTtcbiAgICB9XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFJlbmRlclR5cGUgfSBmcm9tICcuL1JlbmRlclR5cGUnO1xuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xuICogc2hvdWxkIGV4dGVuZCBbU2ltcGxlUnVsZV0gb3IgW0NvbXBvc2l0ZVJ1bGVdIC0gdGhlc2UgcnVsZSBhYnN0cmFjdGlvbnMgZXh0ZW5kIFtSdWxlUG9saWN5XS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcnVsZS4gVmFsdWUgaXMgZmFsc2Ugd2hlbiB0aGUgcnVsZSBjb250YWlucyB2aW9sYXRpb25zLiAqL1xuICBpc1ZhbGlkID0gdHJ1ZTtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cbiAgbmFtZTogc3RyaW5nO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHByaW9yaXR5IHZhbHVlIG9mIHRoZSBydWxlLiBIaWdoZXIgcHJpb3JpdHkgdmFsdWVzIGFyZSBldmFsdWF0ZWQgZmlyc3QuICovXG4gIHByaW9yaXR5OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XG5cbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXG4gIGlzRGlzcGxheWFibGU6IGJvb2xlYW47XG5cbiAgLyoqIFVzZSB0byBkZXRlcm1pbmUgaG93IHRoZSBydWxlIGlzIGV2YWx1YXRlZC4gKi9cbiAgcmVuZGVyVHlwZTogUmVuZGVyVHlwZSA9IFJlbmRlclR5cGUuRXZhbHVhdGVBbGxSdWxlcztcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcblxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xuICBzb3VyY2U6IHN0cmluZztcblxuICAvKipcbiAgICogT3ZlcmxvYWRlZCBjb25zdHJ1Y3RvciBmb3IgdGhlIFtSdWxlUG9saWN5XSBjbGFzcy5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcbiAgLyoqXG4gICAqIE92ZXJsb2FkZWQgY29uc3RydWN0b3IgZm9yIHRoZSBbUnVsZVBvbGljeV0gY2xhc3MuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxuICAgKiBAcGFyYW0gc2V2ZXJpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kaWNhdGUgdGhlIHJ1bGUgdmlvbGF0aW9uIHNldmVyaXR5LiBEZWZhdWx0IGlzIFtFeGNlcHRpb25dLlxuICAgKiBAcGFyYW0gcHJpb3JpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kY2lhdGUgdGhlIHJ1bGUncyBldmFsdWF0aW9uIHByaW9yaXR5LiBIaWdoZXIgbnVtZXJpYyB2YWx1ZXMgYXJlIHByaW9yaXR5LiAwIGlzIGRlZmF1bHQgYW5kIGxvd2VzdCBwcmlvcml0eS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbixcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxuICApIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBleGVjdXRlIHRoZSBydWxlLiBUaGlzIGlzIHRoZSBbdGVtcGxhdGVdIG1ldGhvZCBvZiB0aGUgW3RlbXBsYXRlIG1ldGhvZF0gZGVzaWduXG4gICAqIHBhdHRlcm4uIEl0IHdpbGwgY29vcmRpbmRhdGUgdGhlIGV4ZWN1dGlvbiBvZiBhbnkgcmVxdWlyZWQgbWV0aG9kcyBpbiB0aGUgcHJvY2Vzc2luZ1xuICAgKiBwaXBlbGluZS5cbiAgICovXG4gIGV4ZWN1dGUoKTogUnVsZVJlc3VsdCB7XG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFYWNoIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgW1J1bGVSZXN1bHRdLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcbiAgICApO1xuICB9XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRoZSBbQ29tcG9zaXRlUnVsZV0gYXMgYSBiYXNlIGNsYXNzIGZvciBhIGNvbXBsZXggcnVsZSAtIGEgcnVsZSB0aGF0IGNvbnRhaW5zXG4gKiBvdGhlciBydWxlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvc2l0ZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcbiAgLyoqXG4gICAqIEluZGljYXRlcyBpZiB0aGUgcnVsZSBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cbiAgICovXG4gIGhhc0Vycm9ycyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgZXZhbHVhdGVkIHJ1bGVzLiBSdWxlcyBtdXN0IGJlIHJlbmRlcmVkL2V4ZWN1dGVkIGJlZm9yZVxuICAgKiBhbnkgcmVzdWx0cyBhcmUgYXZhaWxhYmxlLlxuICAgKi9cbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciB0aGUgc3BlY2lmaWVkIGNvbXBvc2l0ZSBydWxlLlxuICAgKi9cbiAgcnVsZXM6IEFycmF5PFJ1bGVQb2xpY3k+ID0gbmV3IEFycmF5PFJ1bGVQb2xpY3k+KCk7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaXMgZGlzcGxheWFibGUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIHRoaXMucnVsZXNcbiAgICAgIC5zb3J0KHMgPT4gcy5wcmlvcml0eSlcbiAgICAgIC5mb3JFYWNoKHIgPT4gdGhpcy5yZXN1bHRzLnB1c2goci5leGVjdXRlKCkpKTtcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzUmVzdWx0cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGNvbXBvc2l0ZSBydWxlIGhhcyBjaGlsZC1ydWxlcyB0aGF0IGFyZVxuICAgKiBtZW1iZXJzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS5cbiAgICovXG4gIHB1YmxpYyBoYXNSdWxlcygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHByb2Nlc3MgdGhlIHJlc3VsdHMgb2YgdGhlIHNwZWNpZmllZCBydWxlIHJlc3VsdCBjb2xsZWN0aW9uLiBDb21wb3NpdGVcbiAgICogcnVsZXMgd2lsbCBoYXZlIG9uZSBvciBtb3JlIHJ1bGUgcmVzdWx0cyBmb3IgYWxsIGNoaWxkLXJ1bGVzLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiByZXN1bHQgd2l0aCB0aGUgZXZhbHVhdGlvbiBzdW1tYXJ5IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcHJvY2Vzc1Jlc3VsdHMoKTogUnVsZVJlc3VsdCB7XG4gICAgaWYgKHRoaXMucmVzdWx0cy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSdWxlUG9saWN5IH0gZnJvbSAnLi9SdWxlUG9saWN5JztcblxuLyoqXG4gKiBVc2UgdGhpcyBjbGFzcyBhcyBhIGJhc2UgW2V4dGVuZHNdIGNsYXNzIGZvciBzaW1wbGUgcnVsZXMuIEEgc2ltcGxlIGNvbnRhaW5zXG4gKiBhIHNpbmdsZSBydWxlIGFuZCB0YXJnZXQgdG8gZXZhbHVhdGUuXG4gKlxuICogSWYgeW91IHJlcXVpcmUgYSBydWxlIHRoYXQgd2lsbCBjb250YWluIG1vcmUgdGhhbiBvbmUgcnVsZSwgeW91IHNob3VsZFxuICogdXNlIGV4dGVuZCB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGNsYXNzLlxuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlUnVsZSBleHRlbmRzIFJ1bGVQb2xpY3kge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc2ltcGxlIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGlzRGlzcGxheWFibGU6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcblxuLyoqXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgW251bGxdIG9yIFt1bmRlZmluZWRdLlxuICovXG5leHBvcnQgY2xhc3MgSXNOdWxsT3JVbmRlZmluZWQgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxuICAgKi9cbiAgdGFyZ2V0O1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOdWxsT3JVbmRlZmluZWRdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBhbnksXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIGlmIChcbiAgICAgIHRoaXMudGFyZ2V0ID09IG51bGwgfHxcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcblxuLyoqXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgTk9UIFtudWxsXSBvciBbdW5kZWZpbmVkXS5cbiAqL1xuZXhwb3J0IGNsYXNzIElzTm90TnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cbiAgICovXG4gIHRhcmdldDtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzTm90TnVsbE9yVW5kZWZpbmVkXSBydWxlLlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogYW55LFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XG4gICAgICB0aGlzLnRhcmdldCA9PT0gbnVsbCB8fFxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSAndW5kZWZpbmVkJ1xuICAgICkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIHRydXRoeS5cbiAqL1xuZXhwb3J0IGNsYXNzIElzVHJ1ZSBleHRlbmRzIFNpbXBsZVJ1bGUge1xuICAvKipcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXG4gICAqL1xuICB0YXJnZXQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc1RydWVdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW3RydWVdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXG4gICAqL1xuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy50YXJnZXQgPT09IGZhbHNlKSB7XG4gICAgICAvL2lmKG5vdCB0cnVlKS0tPmZhbHNlO1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5cbi8qKlxuICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWx1ZSBpcyBmYWxzeS5cbiAqL1xuZXhwb3J0IGNsYXNzIElzRmFsc2UgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgdGFyZ2V0IHZhbHVlIHRvIGV2YWx1YXRlLlxuICAgKi9cbiAgdGFyZ2V0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNGYWxzZV0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgLy9pZih0cnVlKS0tPmZhbHNlO1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG4vKipcbiAqIFVzZSB0aGUgW01pbl0gcnVsZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCB2YWx1ZSBpcyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1pbmltdW1cbiAqIGFsbG93ZWQgdmFsdWUgW2NvbXBhcmlzb25dLlxuICovXG5leHBvcnQgY2xhc3MgTWluIGV4dGVuZHMgU2ltcGxlUnVsZSB7XG4gIC8qKlxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIHRhcmdldDogUHJpbWl0aXZlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGFyaXNvbiBpdGVtIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNaW5dIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBjb21wYXJpc29uIFRoZSBjb21wYXJpc29uIHRhcmdldCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBjb25zdCBjb21wYXJlUmVzdWx0ID0gY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKTtcbiAgICBpZiAoY29tcGFyZVJlc3VsdCA9PT0gQ29tcGFyZVJlc3VsdC5MZXNzKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTsgLy9tdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgY29tcGFyaXNvbiB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbi8qKlxuICogVXNlIHRoZSBbTWF4XSBydWxlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IHZhbHVlIGlzIGVxdWFsIHRvIG9yIGxlc3MgdGhhblxuICogdGhlIGNvbXBhcmlzb24gdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXggZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW01heF0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXG4gICAgY29tcGFyaXNvbjogUHJpbWl0aXZlLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xuICAgIGlmIChjb21wYXJlUmVzdWx0ID09PSBDb21wYXJlUmVzdWx0LkdyZWF0ZXIpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XG5pbXBvcnQgeyBJc05vdE51bGxPclVuZGVmaW5lZCB9IGZyb20gJy4vSXNOb3ROdWxsT3JVbmRlZmluZWQnO1xuaW1wb3J0IHsgTWluIH0gZnJvbSAnLi9NaW4nO1xuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi9NYXgnO1xuXG4vKipcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgdGFyZ2V0IGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIChzdGFydCBhbmQgZW5kKSB2YWx1ZXMuXG4gKlxuICogVGhlIHJhbmdlIHZhbHVlcyBhcmUgaW5jbHVzaXZlLlxuICpcbiAqIEV4OiAxIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxuICogRXg6IDIgaXMgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgdmFsaWQuXG4gKiBFeDogMCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxuICogRXg6IDQgaXMgbm90IHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIG5vdCB2YWxpZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIGVuZCB2YWx1ZSBvZiB0aGUgcmFuZ2UuXG4gICAqL1xuICBlbmQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhcnQgdmFsdWUgb2YgdGhlIHJhbmdlLlxuICAgKi9cbiAgc3RhcnQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgW3ByaW1pdGl2ZV0gdmFsdWUgdGhhdCB3aWxsIGJlIGV2YWx1YXRlZC4gVGhlIHZhbHVlXG4gICAqIG11c3QgYmUgd2l0aGluIHRoZSBbc3RhcnRdIGFuZCB0aGUgW2VuZF0gdmFsdWUgdG8gYmUgdmFsaWQuXG4gICAqL1xuICB0YXJnZXQ6IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBbUmFuZ2VdIHJ1bGUuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZTogQSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdGhhdCB0aGUgcnVsZXMgd2lsbCBiZSBhcHBsaWVkIHRvLlxuICAgKiBAcGFyYW0gc3RhcnQgVGhlIHN0YXJ0IHJhbmdlIHZhbHVlIC0gdGhlIGxvd2VzdCBhbGxvd2VkIGJvdW5kYXJ5IHZhbHVlLlxuICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgcmFuZ2UgdmFsdWUgLSB0aGUgaGlnaGVzdCBhbGxvd2VkIGJvdW5kYXJ5IHZhbHVlLlxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIG1heSBiZSBkaXNwbGF5ZWQgb3IgdmlzaWJsZSB0byB0aGUgY2FsbGVyIG9yIGNsaWVudC4gRGVmYXVsdCBpcyBbZmFsc2VdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBzdGFydDogbnVtYmVyLFxuICAgIGVuZDogbnVtYmVyLFxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcblxuICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcbiAgICAgICAgJ1RhcmdldElzTm90TnVsbCcsXG4gICAgICAgICdUaGUgdGFyZ2V0IGlzIG51bGwgb3IgdW5kZWZpbmVkLicsXG4gICAgICAgIHRoaXMudGFyZ2V0XG4gICAgICApXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJ1bGVzLnB1c2goXG4gICAgICAgIG5ldyBNaW4oXG4gICAgICAgICAgJ01pblZhbHVlJyxcbiAgICAgICAgICAnVGhlIHZhbHVlIG11c3QgYmUgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHRoZSBzdGFydCByYW5nZSB2YWx1ZS4nLFxuICAgICAgICAgIHRoaXMudGFyZ2V0LFxuICAgICAgICAgIHRoaXMuc3RhcnRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHRoaXMucnVsZXMucHVzaChcbiAgICAgICAgbmV3IE1heChcbiAgICAgICAgICAnTWF4VmFsdWUnLFxuICAgICAgICAgICdUaGUgdmFsdWUgbXVzdCBiZSBlcXVhbCB0byBvciBsZXNzIHRoYW4gdGhlIGVuZCByYW5nZSB2YWx1ZS4nLFxuICAgICAgICAgIHRoaXMudGFyZ2V0LFxuICAgICAgICAgIHRoaXMuZW5kXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcblxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcblxuLyoqXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgZXF1YWwgdG8gdGhlIGNvbXBhcmlzb24gdGFyZ2V0LlxuICovXG5leHBvcnQgY2xhc3MgQXJlRXF1YWwgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0FyZUVxdWFsUnVsZV0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW3RydWVdLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IHRydWVcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0IHtcbiAgICBpZiAoY29tcGFyZSh0aGlzLnRhcmdldCwgdGhpcy5jb21wYXJpc29uLCB0cnVlKSAhPT0gQ29tcGFyZVJlc3VsdC5FcXVhbCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xuXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xuXG4vKipcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBub3QgZXF1YWwgdG8gdGhlIGNvbXBhcmlzb24gdGFyZ2V0LlxuICovXG5leHBvcnQgY2xhc3MgQXJlTm90RXF1YWwgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBydWxlIGluc3RhbmNlLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cbiAgICovXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0FyZU5vdEVxdWFsUnVsZV0gcnVsZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCBpcyBbdHJ1ZV0uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxuICApIHtcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xuICAgIGlmIChjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpID09PSBDb21wYXJlUmVzdWx0LkVxdWFsKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XG5cbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XG5cbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9SYW5nZSc7XG5cbi8qKlxuICogVXNlIHRoaXMgcnVsZSB0byB2YWxpZGF0ZSBhIHN0cmluZyB0YXJnZXQuIEEgdmFsaWQgc3RyaW5nIGlzIG5vdCBudWxsIG9yIHVuZGVmaW5lZDsgYW5kIGl0XG4gKiBpcyB3aXRoaW4gdGhlIHNwZWNpZmllZCBtaW5pbXVtIGFuZCBtYXhpdW11bSBsZW5ndGguXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XG4gIC8qKlxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXG4gICAqL1xuICBtYXhMZW5ndGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtaW5pbXVtIGxlbnRoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXG4gICAqL1xuICBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVXNlIHRvIHByb3ZpZGUgdGhlIHRhcmdldCBbUHJpbWl0aXZlXSB0byBldmFsdWF0ZSBmb3IgdGhlIHNwZWNpZmllZCBydWxlLlxuICAgKi9cbiAgdGFyZ2V0OiBQcmltaXRpdmU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlUnVsZV0uXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlKHMpIHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QuXG4gICAqIEBwYXJhbSBtaW5MZW5ndGggVGhlIG1pbmltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cbiAgICogQHBhcmFtIG1heExlbmd0aCBUaGUgbWF4aW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcbiAgICBtaW5MZW5ndGg6IG51bWJlcixcbiAgICBtYXhMZW5ndGg6IG51bWJlcixcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcbiAgKSB7XG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5taW5MZW5ndGggPSBtaW5MZW5ndGg7XG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZVJ1bGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGNvbmZpZ3VyZS9hZGQgcnVsZXMgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cbiAgICovXG5cbiAgY29uZmlndXJlUnVsZXMoKSB7XG4gICAgdGhpcy5ydWxlcy5wdXNoKFxuICAgICAgbmV3IElzTm90TnVsbE9yVW5kZWZpbmVkKFxuICAgICAgICAnU3RyaW5nSXNOb3ROdWxsJyxcbiAgICAgICAgJ1RoZSBzdHJpbmcgdGFyZ2V0IGlzIG51bGwgb3IgdW5kZWZpbmVkLicsXG4gICAgICAgIHRoaXMudGFyZ2V0XG4gICAgICApXG4gICAgKTtcbiAgICBpZiAodGhpcy50YXJnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxuICAgICAgICBuZXcgUmFuZ2UoXG4gICAgICAgICAgJ1RhcmdldExlbmd0aElzV2l0aGluUmFuZ2UnLFxuICAgICAgICAgICdUaGUgc3RyaW5nIHZhbHVlIGlzIG5vdCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS4nLFxuICAgICAgICAgIHRoaXMudGFyZ2V0LnRvU3RyaW5nKCkubGVuZ3RoLFxuICAgICAgICAgIHRoaXMubWluTGVuZ3RoLFxuICAgICAgICAgIHRoaXMubWF4TGVuZ3RoXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJy4vU2VydmljZU1lc3NhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcblxuLyoqXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBtYW5hZ2UgdGhlIGNvbnRleHQgb2YgYSBzaW5nbGUgc2VydmljZSBjYWxsLiBUaGlzXG4gKiBjbGFzcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIGFueSBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGR1cmluZyB0aGUgcHJvY2Vzc2luZ1xuICogb2YgYSBzZXJ2aWNlIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBBIGxpc3Qgb2Ygc2VydmljZSBtZXNzYWdlcyBhZGRlZCBieSB0aGUgYXBwbGljYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIHRoZVxuICAgKiBzcGVjaWZpZWQgc2VydmljZSByZXF1ZXN0LlxuICAgKi9cbiAgTWVzc2FnZXM6IEFycmF5PFNlcnZpY2VNZXNzYWdlPiA9IG5ldyBBcnJheTxTZXJ2aWNlTWVzc2FnZT4oKTtcblxuICAvKipcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBtZXNzYWdlIHRvIHRoZSBbU2VydmljZUNvbnRleHRdLlxuICAgKi9cbiAgYWRkTWVzc2FnZShtZXNzYWdlOiBTZXJ2aWNlTWVzc2FnZSkge1xuICAgIHRoaXMuTWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gY29udGFpbnMgYW55IG1lc3NhZ2VzIHdpdGggdHlwZSBvZiBbRXJyb3JdLlxuICAgKi9cbiAgaGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxuICAgICAgICBmID0+IGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXG4gICAgICApO1xuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XSBkb2VzIG5vdCBjb250YWluIGFueSBlcnJvcnMuXG4gICAqL1xuICBpc0dvb2QoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuTWVzc2FnZXMgJiYgdGhpcy5NZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcbiAgICAgICk7XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XG5cbi8qKlxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbWVzc2FnZSBmb3IgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5cbiAqL1xuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlIHtcbiAgLyoqIFVzZSB0byBzcGVjaWZ5IHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLiAqL1xuICBOYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFVzZSB0byBzcGVjaWZ5IHRoZSBtZXNzYWdlLiAqL1xuICBNZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqIFVzZSB0byBzcGVjaWZpeSAgKi9cbiAgTWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xuXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS4gKi9cbiAgU291cmNlOiBzdHJpbmc7XG5cbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgc3BlY2lmaWVkIG1lc3NhZ2Ugc2hvdWxkIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci4gKi9cbiAgRGlzcGxheVRvVXNlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlIGlzIGRpc3BsYXlhYmxlLlxuICAgKi9cblxuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxuICAgIHNvdXJjZT86IHN0cmluZ1xuICApO1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxuICAgIHNvdXJjZT86IHN0cmluZ1xuICApO1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlciBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIG1lc3NhZ2VUeXBlPzogTWVzc2FnZVR5cGUsXG4gICAgc291cmNlPzogc3RyaW5nLFxuICAgIGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuTWVzc2FnZVR5cGUgPSBtZXNzYWdlVHlwZSBhcyBNZXNzYWdlVHlwZTtcbiAgICB9XG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2UgYXMgc3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIGFkZCB0aGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cbiAgICovXG4gIFdpdGhOYW1lKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuTmFtZSA9IG5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG1lc3NhZ2UgdGV4dCB0byB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgc2VydmljZSBtZXNzYWdlLlxuICAgKi9cbiAgV2l0aE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW01lc3NhZ2VUeXBlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1lc3NhZ2UgdHlwZS5cbiAgICovXG4gIFdpdGhNZXNzYWdlVHlwZShtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGUpIHtcbiAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtTb3VyY2VdIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxuICAgKiBAcGFyYW0gc291cmNlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cbiAgICovXG4gIFdpdGhTb3VyY2Uoc291cmNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLlNvdXJjZSA9IHNvdXJjZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW0Rpc3BsYXlUb1VzZXJdIGluZGljYXRvciBvZiB0aGUgU2VydmljZU1lc3NhZ2UuXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBBIGJvb2xlYW4gdmFsdWUgdG8gaW5kaWNhdGUgaWYgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci5cbiAgICovXG4gIFdpdGhEaXNwbGF5VG9Vc2VyKGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLkRpc3BsYXlUb1VzZXIgPSBkaXNwbGF5VG9Vc2VyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSB0aGlzIG1ldGhvZCByZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBTZXJ2aWNlTWVzc2FnZS5cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgTmFtZTogJHt0aGlzLk5hbWV9OyBNZXNzYWdlOiAke1xuICAgICAgdGhpcy5NZXNzYWdlXG4gICAgfTsgTWVzc2FnZVR5cGU6ICR7dGhpcy5NZXNzYWdlVHlwZS50b1N0cmluZygpfTsgU291cmNlOiAke1xuICAgICAgdGhpcy5Tb3VyY2VcbiAgICB9OyBEaXNwbGF5VG9Vc2VyOiAke3RoaXMuRGlzcGxheVRvVXNlcn1gO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICcuL0lWYWxpZGF0aW9uQ29udGV4dCc7XG5pbXBvcnQgeyBWYWxpZGF0aW9uQ29udGV4dFN0YXRlIH0gZnJvbSAnLi9WYWxpZGF0aW9uQ29udGV4dFN0YXRlJztcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuLi9ydWxlcy9SdWxlUmVzdWx0JztcbmltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuLi9ydWxlcy9SdWxlUG9saWN5JztcblxuLyoqXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBuZXcgVmFsaWRhdGlvbiBDb250ZXh0IGZvciB5b3VyIGFwcGxpY2F0aW9uLiBXaXRoIHRoaXNcbiAqIGNvbnRleHQsIHlvdSBjYW4gYWRkIHJ1bGVzIGFuZCBldmFsdWF0ZSB0aGUgcnVsZXMuXG4gKlxuICogQWZ0ZXIgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQsIHlvdSBjYW4gdXNlIHRoZSBWYWxpZGF0aW9uIENvbnRleHQgdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGFyZVxuICogYW55IHJ1bGUgdmlvbGF0aW9ucy5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25Db250ZXh0IGltcGxlbWVudHMgSVZhbGlkYXRpb25Db250ZXh0IHtcbiAgLyoqXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhdGUgb2YgdGhlIHZhbGlkYXRpb24gY29udGV4dC5cbiAgICovXG4gIHN0YXRlOiBWYWxpZGF0aW9uQ29udGV4dFN0YXRlID0gVmFsaWRhdGlvbkNvbnRleHRTdGF0ZS5Ob3RFdmFsdWF0ZWQ7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBhbGwgZXZhbHVhdGVkIHJ1bGVzIHRoYXQgYmVsb25nIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqL1xuICByZXN1bHRzOiBBcnJheTxSdWxlUmVzdWx0PiA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgcnVsZXMgZm9yIHJlbmRlcmluZy5cbiAgICovXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xuXG4gIC8qKlxuICAgKiBUaGUgc291cmNlIG9mIHRoZSBzcGVjaWZpZWQgdmFsaWRhdGlvbiBjb250ZXh0IGluc3RhbmNlLlxuICAgKi9cbiAgc291cmNlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGJhc2UgdmFsaWRhdGlvbiBjb250ZXh0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc29sZS5sb2coXG4gICAgICAnVGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaXMgcmVhZHkgZm9yIGFjdGlvbihzKS4gQWxsIHRoaW5ncyBhcmUgZ29vZCB1bnRpbCBicm9rZW4uLi4nXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IHJ1bGUgdG8gdGhlIFZhbGlkYXRpb25Db250ZXh0LlxuICAgKi9cbiAgYWRkUnVsZShydWxlOiBSdWxlUG9saWN5KSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICBydWxlLnNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgIH1cbiAgICB0aGlzLnJ1bGVzLnB1c2gocnVsZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtTb3VyY2VdIGZvciB0aGUgY3VycmVudCB2YWxpZGF0aW9uIGNvbnRleHQuXG4gICAqIEBwYXJhbSBzb3VyY2VcbiAgICovXG4gIHdpdGhTb3VyY2Uoc291cmNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gZXhlY3V0ZSB0aGUgcnVsZXMgYWRkZWQgdG8gdGhlIFtWYWxpZGF0aW9uQ29udGV4dF0uXG4gICAqL1xuICByZW5kZXJSdWxlcygpIHtcbiAgICB0aGlzLnJlc3VsdHMgPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcbiAgICBpZiAodGhpcy5ydWxlcyAmJiB0aGlzLnJ1bGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGlzLnJ1bGVzXG4gICAgICAuc29ydChyID0+IHIucHJpb3JpdHkpXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGhhcyBhbnkgcnVsZSB2aW9sYXRpb25zLlxuICAgKi9cbiAgaGFzUnVsZVZpb2xhdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhc1Zpb2xhdGlvbnMgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5ydWxlcykge1xuICAgICAgY29uc3QgcnVsZVZpb2xhdGlvbnNDb3VudCA9XG4gICAgICAgIHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGg7XG4gICAgICBpZiAocnVsZVZpb2xhdGlvbnNDb3VudCA+IDApIHtcbiAgICAgICAgaGFzVmlvbGF0aW9ucyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoYXNWaW9sYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqICpVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBpcyB2YWxpZCAtIG5vIHJ1bGUgdmlvbGF0aW9ucy5cbiAgICovXG4gIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIGxldCBpc1J1bGVWYWxpZCA9IHRydWU7XG4gICAgaWYgKHRoaXMucnVsZXMpIHtcbiAgICAgIGNvbnN0IGludmFsaWRSdWxlc0NvdW50ID0gdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKVxuICAgICAgICAubGVuZ3RoO1xuICAgICAgaWYgKGludmFsaWRSdWxlc0NvdW50ID4gMCkge1xuICAgICAgICBpc1J1bGVWYWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNSdWxlVmFsaWQ7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsInRzbGliXzEuX19leHRlbmRzIiwiY29tcGFyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQUdDQSxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1CQUFZLENBQUM7cUJBQ3hCOzs4Q0FMRDs7Ozs7Ozs7OztBQ01BOztRQUFBOzs7Ozs7UUFxQ0Usb0JBQVksVUFBc0IsRUFBRSxNQUFZOzs7OzJCQWpDdEMsS0FBSztZQWtDYixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FB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