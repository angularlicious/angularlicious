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
var /**
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
 * This is the base class for all rules. All rules will extend from this class. New rules
 * should extend [SimpleRule] or [CompositeRule] - these rule abstractions extend [RulePolicy].
 */
export { RulePolicy };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZVBvbGljeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvUnVsZVBvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDOzs7OztBQU10Qzs7OztBQUFBO0lBb0NFOzs7Ozs7OztPQVFHO0lBQ0gsb0JBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixhQUE4QixFQUM5QixRQUF1QyxFQUN2QyxRQUFvQjtRQUZwQiw4QkFBQSxFQUFBLHFCQUE4QjtRQUM5Qix5QkFBQSxFQUFBLFdBQXFCLFFBQVEsQ0FBQyxTQUFTO1FBQ3ZDLHlCQUFBLEVBQUEsWUFBb0I7Ozs7dUJBL0NaLElBQUk7Ozs7MEJBa0JXLFVBQVUsQ0FBQyxnQkFBZ0I7Ozs7d0JBRy9CLFFBQVEsQ0FBQyxTQUFTO1FBNEJyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztLQUMxQjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw0QkFBTzs7Ozs7O0lBQVA7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsMkJBQU07Ozs7SUFBTjtRQUNFLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEVBQTRFLENBQzdFLENBQUM7S0FDSDtxQkFyRkg7SUFzRkMsQ0FBQTs7Ozs7QUE3RUQsc0JBNkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVJ1bGVDb21wb25lbnQgfSBmcm9tICcuL0lSdWxlQ29tcG9uZW50JztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcbmltcG9ydCB7IFJlbmRlclR5cGUgfSBmcm9tICcuL1JlbmRlclR5cGUnO1xyXG5pbXBvcnQgeyBTZXZlcml0eSB9IGZyb20gJy4vU2V2ZXJpdHknO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBydWxlcy4gQWxsIHJ1bGVzIHdpbGwgZXh0ZW5kIGZyb20gdGhpcyBjbGFzcy4gTmV3IHJ1bGVzXHJcbiAqIHNob3VsZCBleHRlbmQgW1NpbXBsZVJ1bGVdIG9yIFtDb21wb3NpdGVSdWxlXSAtIHRoZXNlIHJ1bGUgYWJzdHJhY3Rpb25zIGV4dGVuZCBbUnVsZVBvbGljeV0uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUnVsZVBvbGljeSBpbXBsZW1lbnRzIElSdWxlQ29tcG9uZW50IHtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzdGF0dXMgb2YgdGhlIHJ1bGUuIFZhbHVlIGlzIGZhbHNlIHdoZW4gdGhlIHJ1bGUgY29udGFpbnMgdmlvbGF0aW9ucy4gKi9cclxuICBpc1ZhbGlkID0gdHJ1ZTtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBkaXNwbGF5IG1lc3NhZ2UgZm9yIGEgcnVsZSB2aW9sYXRpb24uICovXHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG5hbWUgb2YgdGhlIHNwZWNpZmllZCBydWxlLiAqL1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBwcmlvcml0eSB2YWx1ZSBvZiB0aGUgcnVsZS4gSGlnaGVyIHByaW9yaXR5IHZhbHVlcyBhcmUgZXZhbHVhdGVkIGZpcnN0LiAqL1xyXG4gIHByaW9yaXR5OiBudW1iZXI7XHJcbiAgXHJcbiAgLyoqIFRoZSBzcGVjaWZpZWQgcnVsZXMgcmVzdWx0LiAqL1xyXG4gIHJlc3VsdDogUnVsZVJlc3VsdDtcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBydWxlIHJlc3VsdCBpcyBkaXNwbGF5YWJsZS4gKi9cclxuICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gZGV0ZXJtaW5lIGhvdyB0aGUgcnVsZSBpcyBldmFsdWF0ZWQuICovXHJcbiAgcmVuZGVyVHlwZTogUmVuZGVyVHlwZSA9IFJlbmRlclR5cGUuRXZhbHVhdGVBbGxSdWxlcztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIHRoZSBzZXZlcml0eSBmb3IgYSBydWxlIHZpb2xhdGlvbi4gVGhlIGRlZmF1bHQgc2V2ZXJpdHkgaXMgW0V4Y2VwdGlvbl0uICovXHJcbiAgc2V2ZXJpdHk6IFNldmVyaXR5ID0gU2V2ZXJpdHkuRXhjZXB0aW9uO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgc3BlY2lmaWVkIHJ1bGUuICovXHJcbiAgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJsb2FkZWQgY29uc3RydWN0b3IgZm9yIHRoZSBbUnVsZVBvbGljeV0gY2xhc3MuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGlzRGlzcGxheWFibGU6IGJvb2xlYW4pO1xyXG4gIC8qKlxyXG4gICAqIE92ZXJsb2FkZWQgY29uc3RydWN0b3IgZm9yIHRoZSBbUnVsZVBvbGljeV0gY2xhc3MuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiBJbmRpY2F0ZXMgaWYgdGhlIHJ1bGUgdmlvbGF0aW9uIGlzIGRpc3BsYXlibGUuXHJcbiAgICogQHBhcmFtIHNldmVyaXR5IChPcHRpb25hbCkgVXNlIHRvIGluZGljYXRlIHRoZSBydWxlIHZpb2xhdGlvbiBzZXZlcml0eS4gRGVmYXVsdCBpcyBbRXhjZXB0aW9uXS5cclxuICAgKiBAcGFyYW0gcHJpb3JpdHkgKE9wdGlvbmFsKSBVc2UgdG8gaW5kY2lhdGUgdGhlIHJ1bGUncyBldmFsdWF0aW9uIHByaW9yaXR5LiBIaWdoZXIgbnVtZXJpYyB2YWx1ZXMgYXJlIHByaW9yaXR5LiAwIGlzIGRlZmF1bHQgYW5kIGxvd2VzdCBwcmlvcml0eS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZSxcclxuICAgIHNldmVyaXR5OiBTZXZlcml0eSA9IFNldmVyaXR5LkV4Y2VwdGlvbixcclxuICAgIHByaW9yaXR5OiBudW1iZXIgPSAwXHJcbiAgKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMuaXNEaXNwbGF5YWJsZSA9IGlzRGlzcGxheWFibGU7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLnNldmVyaXR5ID0gc2V2ZXJpdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZXhlY3V0ZSB0aGUgcnVsZS4gVGhpcyBpcyB0aGUgW3RlbXBsYXRlXSBtZXRob2Qgb2YgdGhlIFt0ZW1wbGF0ZSBtZXRob2RdIGRlc2lnblxyXG4gICAqIHBhdHRlcm4uIEl0IHdpbGwgY29vcmRpbmRhdGUgdGhlIGV4ZWN1dGlvbiBvZiBhbnkgcmVxdWlyZWQgbWV0aG9kcyBpbiB0aGUgcHJvY2Vzc2luZ1xyXG4gICAqIHBpcGVsaW5lLiBcclxuICAgKi9cclxuICBleGVjdXRlKCk6IFJ1bGVSZXN1bHQge1xyXG4gICAgY29uc29sZS5sb2coJ0JlZ2luIGV4ZWN1dGlvbiBvZiBSdWxlUG9saWN5OiAnICsgdGhpcy5uYW1lKTtcclxuICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWFjaCBydWxlIG11c3QgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHJldHVybiBhIHZhbGlkIFtSdWxlUmVzdWx0XS5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdCB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICdFYWNoIGNvbmNyZXRlIHJ1bGUgbXVzdCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcmV0dXJuIGEgdmFsaWQgUmVzdWx0LidcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==