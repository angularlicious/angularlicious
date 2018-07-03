/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { RulePolicy } from './RulePolicy';
/**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
export class SimpleRule extends RulePolicy {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlUnVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvU2ltcGxlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7QUFTMUMsTUFBTSxpQkFBa0IsU0FBUSxVQUFVOzs7Ozs7O0lBTXhDLFlBQVksSUFBWSxFQUFFLE9BQWUsRUFBRSxhQUFzQjtRQUMvRCxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztLQUNyQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4vUnVsZVBvbGljeSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgYXMgYSBiYXNlIFtleHRlbmRzXSBjbGFzcyBmb3Igc2ltcGxlIHJ1bGVzLiBBIHNpbXBsZSBjb250YWluc1xyXG4gKiBhIHNpbmdsZSBydWxlIGFuZCB0YXJnZXQgdG8gZXZhbHVhdGUuXHJcbiAqXHJcbiAqIElmIHlvdSByZXF1aXJlIGEgcnVsZSB0aGF0IHdpbGwgY29udGFpbiBtb3JlIHRoYW4gb25lIHJ1bGUsIHlvdSBzaG91bGRcclxuICogdXNlIGV4dGVuZCB0aGUgW0NvbXBvc2l0ZVJ1bGVdIGNsYXNzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNpbXBsZVJ1bGUgZXh0ZW5kcyBSdWxlUG9saWN5IHtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBzaW1wbGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBkaXNwbGF5IGlmIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKSB7XHJcbiAgICBzdXBlcihuYW1lLCBtZXNzYWdlLCBpc0Rpc3BsYXlhYmxlKTtcclxuICB9XHJcbn1cclxuIl19