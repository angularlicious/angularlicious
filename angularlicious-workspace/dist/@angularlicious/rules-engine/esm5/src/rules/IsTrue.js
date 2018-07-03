/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
/**
 * Use to determine if the target is truthy.
 */
var /**
 * Use to determine if the target is truthy.
 */
IsTrue = /** @class */ (function (_super) {
    tslib_1.__extends(IsTrue, _super);
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
 * Use to determine if the target is truthy.
 */
export { IsTrue };
function IsTrue_tsickle_Closure_declarations() {
    /**
     * The target for the specified rule evaluation.
     * @type {?}
     */
    IsTrue.prototype.target;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXNUcnVlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS8iLCJzb3VyY2VzIjpbInNyYy9ydWxlcy9Jc1RydWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFLMUM7OztBQUFBO0lBQTRCLGtDQUFVO0lBT3BDOzs7Ozs7T0FNRztJQUNILGdCQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBZSxFQUNmLGFBQTZCO1FBQTdCLDhCQUFBLEVBQUEsb0JBQTZCO1FBSi9CLFlBTUUsa0JBQU0sSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsU0FFcEM7UUFEQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7S0FDdEI7SUFFRjs7O1FBR0k7Ozs7OztJQUNILHVCQUFNOzs7OztJQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUUxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0QjtRQUNELE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFDO2lCQXpDSDtFQU00QixVQUFVLEVBb0NyQyxDQUFBOzs7O0FBcENELGtCQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSB0YXJnZXQgaXMgdHJ1dGh5LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIElzVHJ1ZSBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdGFyZ2V0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUgZXZhbHVhdGlvbi5cclxuICAgKi9cclxuICB0YXJnZXQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtJc1RydWVdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbdHJ1ZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IGJvb2xlYW4sXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICB9XHJcblxyXG4gLyoqXHJcbiAgICogVXNlIHRvIHJlbmRlciB0aGUgZXZhbHVhdGVkIHJlc3VsdCBmb3IgdGhlIHNwZWNpZmllZCBydWxlLiBUaGlzIG1ldGhvZFxyXG4gICAqIHJldHVybnMgYSBbUnVsZVJlc3VsdF0gd2l0aCB0aGUgZXZhbHVhdGVkIHJlc3VsdCBhbmQgcnVsZSBpbmZvcm1hdGlvbi5cclxuICAgKi9cclxuICByZW5kZXIoKTogUnVsZVJlc3VsdHtcclxuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XHJcbiAgICBpZiAodGhpcy50YXJnZXQgPT09IGZhbHNlKSB7XHJcbiAgICAgIC8vaWYobm90IHRydWUpLS0+ZmFsc2U7XHJcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBSdWxlUmVzdWx0KHRoaXMsIHRoaXMudGFyZ2V0KTtcclxuICB9XHJcbn1cclxuIl19