/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { RulePolicy } from './RulePolicy';
import { RuleResult } from './RuleResult';
/**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
var /**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
CompositeRule = /** @class */ (function (_super) {
    tslib_1.__extends(CompositeRule, _super);
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
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
export { CompositeRule };
function CompositeRule_tsickle_Closure_declarations() {
    /**
     * Indicates if the rule has any rule violations.
     * @type {?}
     */
    CompositeRule.prototype.hasErrors;
    /**
     * A list of results for evaluated rules. Rules must be rendered/executed before
     * any results are available.
     * @type {?}
     */
    CompositeRule.prototype.results;
    /**
     * A list of rules for the specified composite rule.
     * @type {?}
     */
    CompositeRule.prototype.rules;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvQ29tcG9zaXRlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7QUFNMUM7Ozs7QUFBQTtJQUFtQyx5Q0FBVTtJQWtCM0M7Ozs7O09BS0c7SUFDSCx1QkFBWSxJQUFZLEVBQUUsT0FBZSxFQUFFLGFBQXNCO1FBQWpFLFlBQ0Usa0JBQU0sSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsU0FDcEM7Ozs7MEJBckJXLEtBQUs7Ozs7O3dCQU1ZLElBQUksS0FBSyxFQUFjOzs7O3NCQUt6QixJQUFJLEtBQUssRUFBYzs7S0FVakQ7SUFFRDs7O09BR0c7Ozs7OztJQUNILDhCQUFNOzs7OztJQUFOO1FBQUEsaUJBS0M7UUFKQyxJQUFJLENBQUMsS0FBSzthQUNQLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7O0lBTU0sZ0NBQVE7Ozs7OztRQUNiLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDOztJQUdmOzs7OztPQUtHOzs7Ozs7OztJQUNILHNDQUFjOzs7Ozs7O0lBQWQ7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFuQixDQUFtQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFDRCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7d0JBckVIO0VBT21DLFVBQVUsRUErRDVDLENBQUE7Ozs7O0FBL0RELHlCQStEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhlIFtDb21wb3NpdGVSdWxlXSBhcyBhIGJhc2UgY2xhc3MgZm9yIGEgY29tcGxleCBydWxlIC0gYSBydWxlIHRoYXQgY29udGFpbnNcclxuICogb3RoZXIgcnVsZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ29tcG9zaXRlUnVsZSBleHRlbmRzIFJ1bGVQb2xpY3kge1xyXG5cclxuICAvKipcclxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaGFzIGFueSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzRXJyb3JzID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBldmFsdWF0ZWQgcnVsZXMuIFJ1bGVzIG11c3QgYmUgcmVuZGVyZWQvZXhlY3V0ZWQgYmVmb3JlIFxyXG4gICAqIGFueSByZXN1bHRzIGFyZSBhdmFpbGFibGUuXHJcbiAgICovXHJcbiAgcmVzdWx0czogQXJyYXk8UnVsZVJlc3VsdD4gPSBuZXcgQXJyYXk8UnVsZVJlc3VsdD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJ1bGVzIGZvciB0aGUgc3BlY2lmaWVkIGNvbXBvc2l0ZSBydWxlLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBBcnJheTxSdWxlUG9saWN5PiA9IG5ldyBBcnJheTxSdWxlUG9saWN5PigpO1xyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGUgSW5kaWNhdGVzIGlmIHRoZSBydWxlIGlzIGRpc3BsYXlhYmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byByZW5kZXIgdGhlIGV2YWx1YXRlZCByZXN1bHQgZm9yIHRoZSBzcGVjaWZpZWQgcnVsZS4gVGhpcyBtZXRob2RcclxuICAgKiByZXR1cm5zIGEgW1J1bGVSZXN1bHRdIHdpdGggdGhlIGV2YWx1YXRlZCByZXN1bHQgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHR7XHJcbiAgICB0aGlzLnJ1bGVzXHJcbiAgICAgIC5zb3J0KHMgPT4gcy5wcmlvcml0eSlcclxuICAgICAgLmZvckVhY2gociA9PiB0aGlzLnJlc3VsdHMucHVzaChyLmV4ZWN1dGUoKSkpO1xyXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBkZXRlcm1pbmUgaWYgdGhlIGNvbXBvc2l0ZSBydWxlIGhhcyBjaGlsZC1ydWxlcyB0aGF0IGFyZVxyXG4gICAqIG1lbWJlcnMgb2YgdGhlIHNwZWNpZmllZCBydWxlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBoYXNSdWxlcygpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLnJ1bGVzICYmIHRoaXMucnVsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBwcm9jZXNzIHRoZSByZXN1bHRzIG9mIHRoZSBzcGVjaWZpZWQgcnVsZSByZXN1bHQgY29sbGVjdGlvbi4gQ29tcG9zaXRlXHJcbiAgICogcnVsZXMgd2lsbCBoYXZlIG9uZSBvciBtb3JlIHJ1bGUgcmVzdWx0cyBmb3IgYWxsIGNoaWxkLXJ1bGVzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHJlc3VsdCB3aXRoIHRoZSBldmFsdWF0aW9uIHN1bW1hcnkgYW5kIHJ1bGUgaW5mb3JtYXRpb24uXHJcbiAgICovXHJcbiAgcHJvY2Vzc1Jlc3VsdHMoKTogUnVsZVJlc3VsdCB7XHJcbiAgICBpZiAodGhpcy5yZXN1bHRzLmZpbHRlcihyID0+IHIuaXNWYWxpZCA9PT0gZmFsc2UpLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUnVsZVJlc3VsdCh0aGlzKTtcclxuICB9XHJcbn1cclxuIl19