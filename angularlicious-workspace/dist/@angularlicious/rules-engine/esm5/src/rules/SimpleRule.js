/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { RulePolicy } from './RulePolicy';
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
 */
SimpleRule = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleRule, _super);
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
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
export { SimpleRule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvU2ltcGxlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7O0FBUzFDOzs7Ozs7O0FBQUE7SUFBZ0Msc0NBQVU7SUFDeEM7Ozs7T0FJRztJQUNILG9CQUFZLElBQVksRUFBRSxPQUFlLEVBQUUsYUFBc0I7ZUFDL0Qsa0JBQU0sSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUM7S0FDcEM7cUJBakJIO0VBU2dDLFVBQVUsRUFTekMsQ0FBQTs7Ozs7Ozs7QUFURCxzQkFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJ1bGVQb2xpY3kgfSBmcm9tICcuL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIGFzIGEgYmFzZSBbZXh0ZW5kc10gY2xhc3MgZm9yIHNpbXBsZSBydWxlcy4gQSBzaW1wbGUgY29udGFpbnNcclxuICogYSBzaW5nbGUgcnVsZSBhbmQgdGFyZ2V0IHRvIGV2YWx1YXRlLlxyXG4gKlxyXG4gKiBJZiB5b3UgcmVxdWlyZSBhIHJ1bGUgdGhhdCB3aWxsIGNvbnRhaW4gbW9yZSB0aGFuIG9uZSBydWxlLCB5b3Ugc2hvdWxkXHJcbiAqIHVzZSBleHRlbmQgdGhlIFtDb21wb3NpdGVSdWxlXSBjbGFzcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaW1wbGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgc2ltcGxlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaXNEaXNwbGF5YWJsZTogYm9vbGVhbikge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==