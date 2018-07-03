/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { RenderType } from './RenderType';
import { Severity } from './Severity';
/**
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
export class RulePolicy {
    /**
     * Overloaded constructor for the [RulePolicy] class.
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?=} isDisplayable
     * @param {?=} severity (Optional) Use to indicate the rule violation severity. Default is [Exception].
     * @param {?=} priority (Optional) Use to indciate the rule's evaluation priority. Higher numeric values are priority. 0 is default and lowest priority.
     */
    constructor(name, message, isDisplayable = false, severity = Severity.Exception, priority = 0) {
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
     * @return {?}
     */
    execute() {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    }
    /**
     * Each rule must implement this function and return a valid [RuleResult].
     * @return {?}
     */
    render() {
        throw new Error('Each concrete rule must implement this function and return a valid Result.');
    }
}
function RulePolicy_tsickle_Closure_declarations() {
    /**
     * Use to indicate the status of the rule. Value is false when the rule contains violations.
     * @type {?}
     */
    RulePolicy.prototype.isValid;
    /**
     * Use to indicate the display message for a rule violation.
     * @type {?}
     */
    RulePolicy.prototype.message;
    /**
     * Use to indicate the name of the specified rule.
     * @type {?}
     */
    RulePolicy.prototype.name;
    /**
     * Use to indicate the priority value of the rule. Higher priority values are evaluated first.
     * @type {?}
     */
    RulePolicy.prototype.priority;
    /**
     * The specified rules result.
     * @type {?}
     */
    RulePolicy.prototype.result;
    /**
     * Use to indicate if the rule result is displayable.
     * @type {?}
     */
    RulePolicy.prototype.isDisplayable;
    /**
     * Use to determine how the rule is evaluated.
     * @type {?}
     */
    RulePolicy.prototype.renderType;
    /**
     * Use to indicate the severity for a rule violation. The default severity is [Exception].
     * @type {?}
     */
    RulePolicy.prototype.severity;
    /**
     * Use to indicate the source of the specified rule.
     * @type {?}
     */
    RulePolicy.prototype.source;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZVBvbGljeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvUnVsZVBvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQU10QyxNQUFNOzs7Ozs7Ozs7SUE2Q0osWUFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLGdCQUF5QixLQUFLLEVBQzlCLFdBQXFCLFFBQVEsQ0FBQyxTQUFTLEVBQ3ZDLFdBQW1CLENBQUM7Ozs7dUJBL0NaLElBQUk7Ozs7MEJBa0JXLFVBQVUsQ0FBQyxnQkFBZ0I7Ozs7d0JBRy9CLFFBQVEsQ0FBQyxTQUFTO1FBNEJyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUMxQjs7Ozs7OztJQU9ELE9BQU87UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCOzs7OztJQUtELE1BQU07UUFDSixNQUFNLElBQUksS0FBSyxDQUNiLDRFQUE0RSxDQUM3RSxDQUFDO0tBQ0g7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElSdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9JUnVsZUNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBSZW5kZXJUeXBlIH0gZnJvbSAnLi9SZW5kZXJUeXBlJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICcuL1NldmVyaXR5JztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgcnVsZXMuIEFsbCBydWxlcyB3aWxsIGV4dGVuZCBmcm9tIHRoaXMgY2xhc3MuIE5ldyBydWxlc1xyXG4gKiBzaG91bGQgZXh0ZW5kIFtTaW1wbGVSdWxlXSBvciBbQ29tcG9zaXRlUnVsZV0gLSB0aGVzZSBydWxlIGFic3RyYWN0aW9ucyBleHRlbmQgW1J1bGVQb2xpY3ldLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJ1bGVQb2xpY3kgaW1wbGVtZW50cyBJUnVsZUNvbXBvbmVudCB7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhdHVzIG9mIHRoZSBydWxlLiBWYWx1ZSBpcyBmYWxzZSB3aGVuIHRoZSBydWxlIGNvbnRhaW5zIHZpb2xhdGlvbnMuICovXHJcbiAgaXNWYWxpZCA9IHRydWU7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgZGlzcGxheSBtZXNzYWdlIGZvciBhIHJ1bGUgdmlvbGF0aW9uLiAqL1xyXG4gIG1lc3NhZ2U6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBuYW1lIG9mIHRoZSBzcGVjaWZpZWQgcnVsZS4gKi9cclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgcHJpb3JpdHkgdmFsdWUgb2YgdGhlIHJ1bGUuIEhpZ2hlciBwcmlvcml0eSB2YWx1ZXMgYXJlIGV2YWx1YXRlZCBmaXJzdC4gKi9cclxuICBwcmlvcml0eTogbnVtYmVyO1xyXG4gIFxyXG4gIC8qKiBUaGUgc3BlY2lmaWVkIHJ1bGVzIHJlc3VsdC4gKi9cclxuICByZXN1bHQ6IFJ1bGVSZXN1bHQ7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgcnVsZSByZXN1bHQgaXMgZGlzcGxheWFibGUuICovXHJcbiAgaXNEaXNwbGF5YWJsZTogYm9vbGVhbjtcclxuICBcclxuICAvKiogVXNlIHRvIGRldGVybWluZSBob3cgdGhlIHJ1bGUgaXMgZXZhbHVhdGVkLiAqL1xyXG4gIHJlbmRlclR5cGU6IFJlbmRlclR5cGUgPSBSZW5kZXJUeXBlLkV2YWx1YXRlQWxsUnVsZXM7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc2V2ZXJpdHkgZm9yIGEgcnVsZSB2aW9sYXRpb24uIFRoZSBkZWZhdWx0IHNldmVyaXR5IGlzIFtFeGNlcHRpb25dLiAqL1xyXG4gIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbjtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBpc0Rpc3BsYXlhYmxlOiBib29sZWFuKTtcclxuICAvKipcclxuICAgKiBPdmVybG9hZGVkIGNvbnN0cnVjdG9yIGZvciB0aGUgW1J1bGVQb2xpY3ldIGNsYXNzLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gaXNEaXNwbGF5YWJsZTogSW5kaWNhdGVzIGlmIHRoZSBydWxlIHZpb2xhdGlvbiBpcyBkaXNwbGF5YmxlLlxyXG4gICAqIEBwYXJhbSBzZXZlcml0eSAoT3B0aW9uYWwpIFVzZSB0byBpbmRpY2F0ZSB0aGUgcnVsZSB2aW9sYXRpb24gc2V2ZXJpdHkuIERlZmF1bHQgaXMgW0V4Y2VwdGlvbl0uXHJcbiAgICogQHBhcmFtIHByaW9yaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGNpYXRlIHRoZSBydWxlJ3MgZXZhbHVhdGlvbiBwcmlvcml0eS4gSGlnaGVyIG51bWVyaWMgdmFsdWVzIGFyZSBwcmlvcml0eS4gMCBpcyBkZWZhdWx0IGFuZCBsb3dlc3QgcHJpb3JpdHkuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2UsXHJcbiAgICBzZXZlcml0eTogU2V2ZXJpdHkgPSBTZXZlcml0eS5FeGNlcHRpb24sXHJcbiAgICBwcmlvcml0eTogbnVtYmVyID0gMFxyXG4gICkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLmlzRGlzcGxheWFibGUgPSBpc0Rpc3BsYXlhYmxlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGV4ZWN1dGUgdGhlIHJ1bGUuIFRoaXMgaXMgdGhlIFt0ZW1wbGF0ZV0gbWV0aG9kIG9mIHRoZSBbdGVtcGxhdGUgbWV0aG9kXSBkZXNpZ25cclxuICAgKiBwYXR0ZXJuLiBJdCB3aWxsIGNvb3JkaW5kYXRlIHRoZSBleGVjdXRpb24gb2YgYW55IHJlcXVpcmVkIG1ldGhvZHMgaW4gdGhlIHByb2Nlc3NpbmdcclxuICAgKiBwaXBlbGluZS4gXHJcbiAgICovXHJcbiAgZXhlY3V0ZSgpOiBSdWxlUmVzdWx0IHtcclxuICAgIGNvbnNvbGUubG9nKCdCZWdpbiBleGVjdXRpb24gb2YgUnVsZVBvbGljeTogJyArIHRoaXMubmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEVhY2ggcnVsZSBtdXN0IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uIGFuZCByZXR1cm4gYSB2YWxpZCBbUnVsZVJlc3VsdF0uXHJcbiAgICovXHJcbiAgcmVuZGVyKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAnRWFjaCBjb25jcmV0ZSBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFJlc3VsdC4nXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=