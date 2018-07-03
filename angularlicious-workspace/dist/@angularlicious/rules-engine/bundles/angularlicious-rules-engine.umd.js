(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('typescript-dotnet-commonjs/System/Compare')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/rules-engine', ['exports', '@angular/core', '@angular/common', 'typescript-dotnet-commonjs/System/Compare'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious['rules-engine'] = {}),global.ng.core,global.ng.common,global.Compare));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtcnVsZXMtZW5naW5lLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMtZW5naW5lLm1vZHVsZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvUnVsZVJlc3VsdC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvUnVsZVBvbGljeS50cyIsbnVsbCwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9Db21wb3NpdGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9TaW1wbGVSdWxlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9Jc051bGxPclVuZGVmaW5lZC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvSXNOb3ROdWxsT3JVbmRlZmluZWQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL0lzVHJ1ZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvSXNGYWxzZS50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvTWluLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9NYXgudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL1JhbmdlLnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lL3NyYy9ydWxlcy9BcmVFcXVhbC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS9zcmMvcnVsZXMvQXJlTm90RXF1YWwudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3J1bGVzL1N0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiLCJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvc3JjL3ZhbGlkYXRpb24vVmFsaWRhdGlvbkNvbnRleHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzUnVsZXNFbmdpbmVNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IENvbXBvc2l0ZVJ1bGUgfSBmcm9tICcuL0NvbXBvc2l0ZVJ1bGUnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgZGVmaW5lcyB0aGUgcmVzdWx0IG9mIGEgc2luZ2xlIHJ1bGUgZXZhbHVhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBSdWxlUmVzdWx0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBydWxlIHJlc3VsdCBpcyB2YWxpZCBvciBub3QuIFxyXG4gICAqL1xyXG4gIGlzVmFsaWQgPSBmYWxzZTtcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgcnVsZSB0aGF0IHdhcyBldmFsdWF0ZWQuXHJcbiAgICovXHJcbiAgcnVsZVBvbGljeTogUnVsZVBvbGljeTtcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgcnVsZSBtZXNzYWdlIHRvIHVzZSB3aGVuIHRoZSBldmFsdWF0aW9uIFtpc1ZhbGlkXSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGl0ZW0gdGhhdCB3YXMgZXZhbHVhdGVkIGJ5IHRoZSBzcGVjaWZpZWQgcnVsZSBwb2xpY3kuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdG9yIGZvciB0aGUgUnVsZVJlc3VsdCBjbGFzcy5cclxuICAgKiBAcGFyYW0gcnVsZVBvbGljeSBVc2UgdG8gc3BlY2lmeSB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFVzZSB0byBzcGVjaWZ5IHRoZSB0YXJnZXQgdG8gYmUgZXZhbHVhdGVkIGJ5IHRoZSBydWxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJ1bGVQb2xpY3k6IFJ1bGVQb2xpY3ksIHRhcmdldDogYW55KTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFJ1bGVSZXN1bHQgY2xhc3MuXHJcbiAgICogQHBhcmFtIHJ1bGVQb2xpY3kgVXNlIHRvIHNwZWNpZnkgdGhlIHJ1bGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogQ29tcG9zaXRlUnVsZSk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0b3IgZm9yIHRoZSBSdWxlUmVzdWx0IGNsYXNzLlxyXG4gICAqIEBwYXJhbSBydWxlUG9saWN5IFVzZSB0byBzcGVjaWZ5IHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVXNlIHRvIHNwZWNpZnkgdGhlIHRhcmdldCB0byBiZSBldmFsdWF0ZWQgYnkgdGhlIHJ1bGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocnVsZVBvbGljeTogUnVsZVBvbGljeSwgdGFyZ2V0PzogYW55KSB7XHJcbiAgICBpZiAocnVsZVBvbGljeSAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZVBvbGljeSA9IHJ1bGVQb2xpY3k7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHJ1bGVQb2xpY3kuaXNWYWxpZDtcclxuICAgICAgdGhpcy5tZXNzYWdlID0gcnVsZVBvbGljeS5tZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSZW5kZXJUeXBlIH0gZnJvbSAnLi9SZW5kZXJUeXBlJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xyXG4gKiBzaG91bGQgZXh0ZW5kIFtTaW1wbGVSdWxlXSBvciBbQ29tcG9zaXRlUnVsZV0gLSB0aGVzZSBydWxlIGFic3RyYWN0aW9ucyBleHRlbmQgW1J1bGVQb2xpY3ldLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhdHVzIG9mIHRoZSBydWxlLiBWYWx1ZSBpcyBmYWxzZSB3aGVuIHRoZSBydWxlIGNvbnRhaW5zIHZpb2xhdGlvbnMuICovXHJcbiAgaXNWYWxpZCA9IHRydWU7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZGlzcGxheSBtZXNzYWdlIGZvciBhIHJ1bGUgdmlvbGF0aW9uLiAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgcHJpb3JpdHkgdmFsdWUgb2YgdGhlIHJ1bGUuIEhpZ2hlciBwcmlvcml0eSB2YWx1ZXMgYXJlIGV2YWx1YXRlZCBmaXJzdC4gKi9cclxuICBwcmlvcml0eTogbnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBUaGUgc3BlY2lmaWVkIHJ1bGVzIHJlc3VsdC4gKi9cclxuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuICBcclxuICAvKiogVXNlIHRvIGRldGVybWluZSBob3cgdGhlIHJ1bGUgaXMgZXZhbHVhdGVkLiAqL1xyXG4gIHJlbmRlclR5cGU6IFJlbmRlclR5cGUgPSBSZW5kZXJUeXBlLkV2YWx1YXRlQWxsUnVsZXM7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc2V2ZXJpdHkgZm9yIGEgcnVsZSB2aW9sYXRpb24uIFRoZSBkZWZhdWx0IHNldmVyaXR5IGlzIFtFeGNlcHRpb25dLiAqL1xyXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS4gXHJcbiAgICovXHJcbiAgZXhlY3V0ZSgpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnNvbGUubG9nKCdCZWdpbiBleGVjdXRpb24gb2YgUnVsZVBvbGljeTogJyArIHRoaXMubmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVhY2ggcnVsZSBtdXN0IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIGFuZCByZXR1cm4gYSB2YWxpZCBbUnVsZVJlc3VsdF0uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnRWFjaCBjb25jcmV0ZSBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFJlc3VsdC4nXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtDb21wb3NpdGVSdWxlXSBhcyBhIGJhc2UgY2xhc3MgZm9yIGEgY29tcGxleCBydWxlIC0gYSBydWxlIHRoYXQgY29udGFpbnNcclxuICogb3RoZXIgcnVsZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlUnVsZSBleHRlbmRzIFJ1bGVQb2xpY3kge1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzRXJyb3JzID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBldmFsdWF0ZWQgcnVsZXMuIFJ1bGVzIG11c3QgYmUgcmVuZGVyZWQvZXhlY3V0ZWQgYmVmb3JlIFxyXG4gICAqIGFueSByZXN1bHRzIGFyZSBhdmFpbGFibGUuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciB0aGUgc3BlY2lmaWVkIGNvbXBvc2l0ZSBydWxlLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGUgSW5kaWNhdGVzIGlmIHRoZSBydWxlIGlzIGRpc3BsYXlhYmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICB0aGlzLnJ1bGVzXHJcbiAgICAgIC5zb3J0KHMgPT4gcy5wcmlvcml0eSlcclxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGNvbXBvc2l0ZSBydWxlIGhhcyBjaGlsZC1ydWxlcyB0aGF0IGFyZVxyXG4gICAqIG1lbWJlcnMgb2YgdGhlIHNwZWNpZmllZCBydWxlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBoYXNSdWxlcygpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBwcm9jZXNzIHRoZSByZXN1bHRzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZSByZXN1bHQgY29sbGVjdGlvbi4gQ29tcG9zaXRlXHJcbiAgICogcnVsZXMgd2lsbCBoYXZlIG9uZSBvciBtb3JlIHJ1bGUgcmVzdWx0cyBmb3IgYWxsIGNoaWxkLXJ1bGVzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHJlc3VsdCB3aXRoIHRoZSBldmFsdWF0aW9uIHN1bW1hcnkgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcHJvY2Vzc1Jlc3VsdHMoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAodGhpcy5yZXN1bHRzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgYXMgYSBiYXNlIFtleHRlbmRzXSBjbGFzcyBmb3Igc2ltcGxlIHJ1bGVzLiBBIHNpbXBsZSBjb250YWluc1xyXG4gKiBhIHNpbmdsZSBydWxlIGFuZCB0YXJnZXQgdG8gZXZhbHVhdGUuXHJcbiAqXHJcbiAqIElmIHlvdSByZXF1aXJlIGEgcnVsZSB0aGF0IHdpbGwgY29udGFpbiBtb3JlIHRoYW4gb25lIHJ1bGUsIHlvdSBzaG91bGRcclxuICogdXNlIGV4dGVuZCB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBzaW1wbGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBbbnVsbF0gb3IgW3VuZGVmaW5lZF0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSXNOdWxsT3JVbmRlZmluZWQgZXh0ZW5kcyBTaW1wbGVSdWxlIHtcclxuXHJcbiAgIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxyXG4gICAqL1xyXG4gIHRhcmdldDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzTnVsbE9yVW5kZWZpbmVkXSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZXMgYXJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgdmFsdWUgaXMgW2ZhbHNlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogYW55LFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy50YXJnZXQgPT0gbnVsbCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICB0eXBlb2YgdGhpcy50YXJnZXQgPT09ICd1bmRlZmluZWQnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBOT1QgW251bGxdIG9yIFt1bmRlZmluZWRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzTm90TnVsbE9yVW5kZWZpbmVkIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcblxyXG4gICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc05vdE51bGxPclVuZGVmaW5lZF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGFueSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudGFyZ2V0ID09IG51bGwgfHxcclxuICAgICAgdGhpcy50YXJnZXQgPT09IG51bGwgfHxcclxuICAgICAgdHlwZW9mIHRoaXMudGFyZ2V0ID09PSAndW5kZWZpbmVkJ1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyB0cnV0aHkuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSXNUcnVlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB0YXJnZXQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBldmFsdWF0aW9uLlxyXG4gICAqL1xyXG4gIHRhcmdldDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzVHJ1ZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFt0cnVlXS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogYm9vbGVhbixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnRhcmdldCA9PT0gZmFsc2UpIHtcclxuICAgICAgLy9pZihub3QgdHJ1ZSktLT5mYWxzZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGluZGljYXRlIGlmIHRoZSB2YWx1ZSBpcyBmYWxzeS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc0ZhbHNlIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgdGFyZ2V0IHZhbHVlIHRvIGV2YWx1YXRlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0lzRmFsc2VdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBib29sZWFuLFxyXG4gICAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgLy9pZih0cnVlKS0tPmZhbHNlO1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtNaW5dIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgdmFsdWUgaXMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHRoZSBtaW5pbXVtXHJcbiAqIGFsbG93ZWQgdmFsdWUgW2NvbXBhcmlzb25dLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1pbiBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtNaW5dIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLmNvbXBhcmlzb24gPSBjb21wYXJpc29uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpO1xyXG4gICAgaWYgKGNvbXBhcmVSZXN1bHQgPT09IENvbXBhcmVSZXN1bHQuTGVzcykge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTsgLy9tdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgY29tcGFyaXNvbiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzLCB0aGlzLnRhcmdldCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBhcmVSZXN1bHQgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZVJlc3VsdCc7XHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tICd0eXBlc2NyaXB0LWRvdG5ldC1jb21tb25qcy9TeXN0ZW0vQ29tcGFyZSc7XHJcblxyXG5pbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFByaW1pdGl2ZSB9IGZyb20gJy4vUHJpbWl0aXZlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtNYXhdIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgdmFsdWUgaXMgZXF1YWwgdG8gb3IgbGVzcyB0aGFuXHJcbiAqIHRoZSBjb21wYXJpc29uIHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1heCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW01heF0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLiBEZWZhdWx0IHZhbHVlIGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgY29uc3QgY29tcGFyZVJlc3VsdCA9IGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSk7XHJcbiAgICBpZiAoY29tcGFyZVJlc3VsdCA9PT0gQ29tcGFyZVJlc3VsdC5HcmVhdGVyKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XHJcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4vTWluJztcclxuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi9NYXgnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgdGFyZ2V0IGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIChzdGFydCBhbmQgZW5kKSB2YWx1ZXMuXHJcbiAqXHJcbiAqIFRoZSByYW5nZSB2YWx1ZXMgYXJlIGluY2x1c2l2ZS5cclxuICpcclxuICogRXg6IDEgaXMgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgdmFsaWQuXHJcbiAqIEV4OiAyIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKiBFeDogNCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBlbmQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIGVuZDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhcnQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIHN0YXJ0OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBbcHJpbWl0aXZlXSB2YWx1ZSB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkLiBUaGUgdmFsdWVcclxuICAgKiBtdXN0IGJlIHdpdGhpbiB0aGUgW3N0YXJ0XSBhbmQgdGhlIFtlbmRdIHZhbHVlIHRvIGJlIHZhbGlkLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFtSYW5nZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZTogQSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSBydWxlcyB3aWxsIGJlIGFwcGxpZWQgdG8uXHJcbiAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCByYW5nZSB2YWx1ZSAtIHRoZSBsb3dlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgcmFuZ2UgdmFsdWUgLSB0aGUgaGlnaGVzdCBhbGxvd2VkIGJvdW5kYXJ5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gbWF5IGJlIGRpc3BsYXllZCBvciB2aXNpYmxlIHRvIHRoZSBjYWxsZXIgb3IgY2xpZW50LiBEZWZhdWx0IGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIHN0YXJ0OiBudW1iZXIsXHJcbiAgICBlbmQ6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcclxuXHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnVGFyZ2V0SXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxyXG4gICAgICAgIHRoaXMudGFyZ2V0XHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNaW4oXHJcbiAgICAgICAgICAnTWluVmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc3RhcnQgcmFuZ2UgdmFsdWUuJyxcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGhpcy5zdGFydFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNYXgoXHJcbiAgICAgICAgICAnTWF4VmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGxlc3MgdGhhbiB0aGUgZW5kIHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuZW5kXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIGVxdWFsIHRvIHRoZSBjb21wYXJpc29uIHRhcmdldC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcmVFcXVhbCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG4gXHJcbiAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHJ1bGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21wYXJpc29uIGl0ZW0gZm9yIHRoZSBzcGVjaWZpZWQgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICBjb21wYXJpc29uOiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtBcmVFcXVhbFJ1bGVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGNvbXBhcmlzb24gVGhlIGNvbXBhcmlzb24gdGFyZ2V0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIGNvbXBhcmlzb246IFByaW1pdGl2ZSxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSB0cnVlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5jb21wYXJpc29uID0gY29tcGFyaXNvbjtcclxuICB9XHJcblxyXG4gLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIGlmIChjb21wYXJlKHRoaXMudGFyZ2V0LCB0aGlzLmNvbXBhcmlzb24sIHRydWUpICE9PSBDb21wYXJlUmVzdWx0LkVxdWFsKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIHRhcmdldCBpcyBub3QgZXF1YWwgdG8gdGhlIGNvbXBhcmlzb24gdGFyZ2V0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFyZU5vdEVxdWFsIGV4dGVuZHMgU2ltcGxlUnVsZSB7XHJcbiBcclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgcnVsZSBpbnN0YW5jZS5cclxuICAgKi9cclxuICB0YXJnZXQ6IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBhcmlzb24gaXRlbSBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGNvbXBhcmlzb246IFByaW1pdGl2ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW0FyZU5vdEVxdWFsUnVsZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRoYXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gY29tcGFyaXNvbiBUaGUgY29tcGFyaXNvbiB0YXJnZXQgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogKE9wdGlvbmFsKSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuIERlZmF1bHQgaXMgW3RydWVdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBQcmltaXRpdmUsXHJcbiAgICBjb21wYXJpc29uOiBQcmltaXRpdmUsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuY29tcGFyaXNvbiA9IGNvbXBhcmlzb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgaWYgKGNvbXBhcmUodGhpcy50YXJnZXQsIHRoaXMuY29tcGFyaXNvbiwgdHJ1ZSkgPT09IENvbXBhcmVSZXN1bHQuRXF1YWwpIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcclxuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcclxuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuL1JhbmdlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIHZhbGlkYXRlIGEgc3RyaW5nIHRhcmdldC4gQSB2YWxpZCBzdHJpbmcgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkOyBhbmQgaXRcclxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UgZXh0ZW5kcyBDb21wb3NpdGVSdWxlIHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvdmlkZSB0aGUgdGFyZ2V0IFtQcmltaXRpdmVdIHRvIGV2YWx1YXRlIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlUnVsZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlKHMpIHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIG1pbkxlbmd0aCBUaGUgbWluaW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xyXG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGNvbmZpZ3VyZS9hZGQgcnVsZXMgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuXHJcbiAgY29uZmlndXJlUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnU3RyaW5nSXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHN0cmluZyB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBSYW5nZShcclxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcclxuICAgICAgICAgICdUaGUgc3RyaW5nIHZhbHVlIGlzIG5vdCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQudG9TdHJpbmcoKS5sZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcclxuICAgICAgICAgIHRoaXMubWF4TGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJy4vU2VydmljZU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIG1hbmFnZSB0aGUgY29udGV4dCBvZiBhIHNpbmdsZSBzZXJ2aWNlIGNhbGwuIFRoaXNcclxuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcclxuICogb2YgYSBzZXJ2aWNlIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgdGhlXHJcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cclxuICAgKi9cclxuICBNZXNzYWdlczogQXJyYXk8U2VydmljZU1lc3NhZ2U+ID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IG1lc3NhZ2UgdG8gdGhlIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICovXHJcbiAgYWRkTWVzc2FnZShtZXNzYWdlOiBTZXJ2aWNlTWVzc2FnZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cclxuICAgKi9cclxuICBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxyXG4gICAqL1xyXG4gIGlzR29vZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlIHtcclxuICBcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuICovXHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbWVzc2FnZS4gKi9cclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBzcGVjaWZpeSAgKi9cclxuICBNZXNzYWdlVHlwZTogTWVzc2FnZVR5cGU7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIFNvdXJjZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuICovXHJcbiAgRGlzcGxheVRvVXNlcjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXI6IEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nLCBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgc3BlY2lmaWVkIG1lc3NhZ2Ugc2hvdWxkIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci4gXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxyXG4gICAgc291cmNlPzogc3RyaW5nLFxyXG4gICAgZGlzcGxheVRvVXNlcjogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVR5cGUgPSBtZXNzYWdlVHlwZSBhcyBNZXNzYWdlVHlwZTtcclxuICAgIH1cclxuICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2UgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IG5hbWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBtZXNzYWdlIHRleHQgdG8gdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgc2VydmljZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIFdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtNZXNzYWdlVHlwZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1lc3NhZ2UgdHlwZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZVR5cGUobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLlNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtEaXNwbGF5VG9Vc2VyXSBpbmRpY2F0b3Igb2YgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBBIGJvb2xlYW4gdmFsdWUgdG8gaW5kaWNhdGUgaWYgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci5cclxuICAgKi9cclxuICBXaXRoRGlzcGxheVRvVXNlcihkaXNwbGF5VG9Vc2VyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLkRpc3BsYXlUb1VzZXIgPSBkaXNwbGF5VG9Vc2VyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgU2VydmljZU1lc3NhZ2UuXHJcbiAgICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYE5hbWU6ICR7dGhpcy5OYW1lfTsgTWVzc2FnZTogJHtcclxuICAgICAgdGhpcy5NZXNzYWdlXHJcbiAgICB9OyBNZXNzYWdlVHlwZTogJHt0aGlzLk1lc3NhZ2VUeXBlLnRvU3RyaW5nKCl9OyBTb3VyY2U6ICR7XHJcbiAgICAgIHRoaXMuU291cmNlXHJcbiAgICB9OyBEaXNwbGF5VG9Vc2VyOiAke3RoaXMuRGlzcGxheVRvVXNlcn1gO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVmFsaWRhdGlvbkNvbnRleHQgfSBmcm9tICcuL0lWYWxpZGF0aW9uQ29udGV4dCc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Db250ZXh0U3RhdGUgfSBmcm9tICcuL1ZhbGlkYXRpb25Db250ZXh0U3RhdGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi4vcnVsZXMvUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuLi9ydWxlcy9SdWxlUG9saWN5JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBuZXcgVmFsaWRhdGlvbiBDb250ZXh0IGZvciB5b3VyIGFwcGxpY2F0aW9uLiBXaXRoIHRoaXNcclxuICogY29udGV4dCwgeW91IGNhbiBhZGQgcnVsZXMgYW5kIGV2YWx1YXRlIHRoZSBydWxlcy5cclxuICpcclxuICogQWZ0ZXIgdGhlIHJ1bGVzIGFyZSBldmFsdWF0ZWQsIHlvdSBjYW4gdXNlIHRoZSBWYWxpZGF0aW9uIENvbnRleHQgdG8gZGV0ZXJtaW5lIGlmIHRoZXJlIGFyZVxyXG4gKiBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25Db250ZXh0IGltcGxlbWVudHMgSVZhbGlkYXRpb25Db250ZXh0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBzdGF0ZSBvZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LiBcclxuICAgKi9cclxuICBzdGF0ZTogVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSA9IFZhbGlkYXRpb25Db250ZXh0U3RhdGUuTm90RXZhbHVhdGVkO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcmVzdWx0cyBmb3IgYWxsIGV2YWx1YXRlZCBydWxlcyB0aGF0IGJlbG9uZyB0byB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+ID0gbmV3IEFycmF5PFJ1bGVSZXN1bHQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyBmb3IgcmVuZGVyaW5nLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc291cmNlIG9mIHRoZSBzcGVjaWZpZWQgdmFsaWRhdGlvbiBjb250ZXh0IGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBiYXNlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAnVGhlIFtWYWxpZGF0aW9uQ29udGV4dF0gaXMgcmVhZHkgZm9yIGFjdGlvbihzKS4gQWxsIHRoaW5ncyBhcmUgZ29vZCB1bnRpbCBicm9rZW4uLi4nXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIGFkZCBhIG5ldyBydWxlIHRvIHRoZSBWYWxpZGF0aW9uQ29udGV4dC5cclxuICAgKi9cclxuICBhZGRSdWxlKHJ1bGU6IFJ1bGVQb2xpY3kpIHtcclxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xyXG4gICAgICBydWxlLnNvdXJjZSA9IHRoaXMuc291cmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ydWxlcy5wdXNoKHJ1bGUpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gZm9yIHRoZSBjdXJyZW50IHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICovXHJcbiAgd2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIG1ldGhvZCB0byBleGVjdXRlIHRoZSBydWxlcyBhZGRlZCB0byB0aGUgW1ZhbGlkYXRpb25Db250ZXh0XS5cclxuICAgKi9cclxuICByZW5kZXJSdWxlcygpIHtcclxuICAgIHRoaXMucmVzdWx0cyA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xyXG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ydWxlc1xyXG4gICAgICAuc29ydChyID0+IHIucHJpb3JpdHkpXHJcbiAgICAgIC5mb3JFYWNoKHIgPT4gdGhpcy5yZXN1bHRzLnB1c2goci5leGVjdXRlKCkpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0IGhhcyBhbnkgcnVsZSB2aW9sYXRpb25zLlxyXG4gICAqL1xyXG4gIGhhc1J1bGVWaW9sYXRpb25zKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGhhc1Zpb2xhdGlvbnMgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLnJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IHJ1bGVWaW9sYXRpb25zQ291bnQgPVxyXG4gICAgICAgIHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5maWx0ZXIociA9PiByLmlzVmFsaWQgPT09IGZhbHNlKS5sZW5ndGg7XHJcbiAgICAgIGlmIChydWxlVmlvbGF0aW9uc0NvdW50ID4gMCkge1xyXG4gICAgICAgIGhhc1Zpb2xhdGlvbnMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGFzVmlvbGF0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqICpVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHZhbGlkYXRpb24gY29udGV4dCBpcyB2YWxpZCAtIG5vIHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgIGxldCBpc1J1bGVWYWxpZCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy5ydWxlcykge1xyXG4gICAgICBjb25zdCBpbnZhbGlkUnVsZXNDb3VudCA9IHRoaXMucnVsZXMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSlcclxuICAgICAgICAubGVuZ3RoO1xyXG4gICAgICBpZiAoaW52YWxpZFJ1bGVzQ291bnQgPiAwKSB7XHJcbiAgICAgICAgaXNSdWxlVmFsaWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzUnVsZVZhbGlkO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsImNvbXBhcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFHQ0EsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3FCQUN4Qjs7OENBTEQ7Ozs7Ozs7Ozs7QUNNQTs7UUFBQTs7Ozs7O1FBc0NFLG9CQUFZLFVBQXNCLEVBQUUsTUFBWTs7OzsyQkFqQ3RDLEtBQUs7WUFrQ2IsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0Qjt5QkFuREg7UUFvREM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsREQ7Ozs7QUFPQTs7O1FBQUE7Ozs7Ozs7Ozs7UUE2Q0Usb0JBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixhQUE4QixFQUM5QixRQUF1QyxFQUN2QyxRQUFvQjtZQUZwQiw4QkFBQTtnQkFBQSxxQkFBOEI7O1lBQzlCLHlCQUFBO2dCQUFBLFdBQXFCLFFBQVEsQ0FBQyxTQUFTOztZQUN2Qyx5QkFBQTtnQkFBQSxZQUFvQjs7Ozs7MkJBL0NaLElBQUk7Ozs7OEJBa0JXLFVBQVUsQ0FBQyxnQkFBZ0I7Ozs7NEJBRy9CLFFBQVEsQ0FBQyxTQUFTO1lBNEJyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFH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