/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { RulePolicy } from './RulePolicy';
import { RuleResult } from './RuleResult';
/**
 * Use the [CompositeRule] as a base class for a complex rule - a rule that contains
 * other rules.
 */
export class CompositeRule extends RulePolicy {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9zaXRlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvQ29tcG9zaXRlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQU0xQyxNQUFNLG9CQUFxQixTQUFRLFVBQVU7Ozs7Ozs7SUF3QjNDLFlBQVksSUFBWSxFQUFFLE9BQWUsRUFBRSxhQUFzQjtRQUMvRCxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozt5QkFwQjFCLEtBQUs7Ozs7O3VCQU1ZLElBQUksS0FBSyxFQUFjOzs7O3FCQUt6QixJQUFJLEtBQUssRUFBYztLQVVqRDs7Ozs7O0lBTUQsTUFBTTtRQUNKLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDOUI7Ozs7OztJQU1NLFFBQVE7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7Ozs7O0lBU2YsY0FBYztRQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGFzIGEgYmFzZSBjbGFzcyBmb3IgYSBjb21wbGV4IHJ1bGUgLSBhIHJ1bGUgdGhhdCBjb250YWluc1xyXG4gKiBvdGhlciBydWxlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDb21wb3NpdGVSdWxlIGV4dGVuZHMgUnVsZVBvbGljeSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlcyBpZiB0aGUgcnVsZSBoYXMgYW55IHJ1bGUgdmlvbGF0aW9ucy5cclxuICAgKi9cclxuICBoYXNFcnJvcnMgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBsaXN0IG9mIHJlc3VsdHMgZm9yIGV2YWx1YXRlZCBydWxlcy4gUnVsZXMgbXVzdCBiZSByZW5kZXJlZC9leGVjdXRlZCBiZWZvcmUgXHJcbiAgICogYW55IHJlc3VsdHMgYXJlIGF2YWlsYWJsZS5cclxuICAgKi9cclxuICByZXN1bHRzOiBBcnJheTxSdWxlUmVzdWx0PiA9IG5ldyBBcnJheTxSdWxlUmVzdWx0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIGxpc3Qgb2YgcnVsZXMgZm9yIHRoZSBzcGVjaWZpZWQgY29tcG9zaXRlIHJ1bGUuXHJcbiAgICovXHJcbiAgcnVsZXM6IEFycmF5PFJ1bGVQb2xpY3k+ID0gbmV3IEFycmF5PFJ1bGVQb2xpY3k+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZSBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgaXMgZGlzcGxheWFibGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGlzRGlzcGxheWFibGU6IGJvb2xlYW4pIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIHRoaXMucnVsZXNcclxuICAgICAgLnNvcnQocyA9PiBzLnByaW9yaXR5KVxyXG4gICAgICAuZm9yRWFjaChyID0+IHRoaXMucmVzdWx0cy5wdXNoKHIuZXhlY3V0ZSgpKSk7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzUmVzdWx0cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY29tcG9zaXRlIHJ1bGUgaGFzIGNoaWxkLXJ1bGVzIHRoYXQgYXJlXHJcbiAgICogbWVtYmVycyBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgcHVibGljIGhhc1J1bGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMucnVsZXMgJiYgdGhpcy5ydWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb2Nlc3MgdGhlIHJlc3VsdHMgb2YgdGhlIHNwZWNpZmllZCBydWxlIHJlc3VsdCBjb2xsZWN0aW9uLiBDb21wb3NpdGVcclxuICAgKiBydWxlcyB3aWxsIGhhdmUgb25lIG9yIG1vcmUgcnVsZSByZXN1bHRzIGZvciBhbGwgY2hpbGQtcnVsZXMuXHJcbiAgICogXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gcmVzdWx0IHdpdGggdGhlIGV2YWx1YXRpb24gc3VtbWFyeSBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICBwcm9jZXNzUmVzdWx0cygpOiBSdWxlUmVzdWx0IHtcclxuICAgIGlmICh0aGlzLnJlc3VsdHMuZmlsdGVyKHIgPT4gci5pc1ZhbGlkID09PSBmYWxzZSkubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5oYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMpO1xyXG4gIH1cclxufVxyXG4iXX0=