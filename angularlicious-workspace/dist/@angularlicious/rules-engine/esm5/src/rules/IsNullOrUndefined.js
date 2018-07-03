/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SimpleRule } from './SimpleRule';
import { RuleResult } from './RuleResult';
/**
 * Use to determine if the target is [null] or [undefined].
 */
var /**
 * Use to determine if the target is [null] or [undefined].
 */
IsNullOrUndefined = /** @class */ (function (_super) {
    tslib_1.__extends(IsNullOrUndefined, _super);
    /**
     * The constructor for the [IsNullOrUndefined] rule.
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rules are evaluated against.
     * @param isDisplayable: Indicates if the rule violation is displayble. Default value is [false].
     */
    function IsNullOrUndefined(name, message, target, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
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
 * Use to determine if the target is [null] or [undefined].
 */
export { IsNullOrUndefined };
function IsNullOrUndefined_tsickle_Closure_declarations() {
    /**
     * The target for the specified rule evaluation.
     * @type {?}
     */
    IsNullOrUndefined.prototype.target;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXNOdWxsT3JVbmRlZmluZWQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3J1bGVzL0lzTnVsbE9yVW5kZWZpbmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBSzFDOzs7QUFBQTtJQUF1Qyw2Q0FBVTtJQU8vQzs7Ozs7O09BTUc7SUFDSCwyQkFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLE1BQVcsRUFDWCxhQUE4QjtRQUE5Qiw4QkFBQSxFQUFBLHFCQUE4QjtRQUpoQyxZQU1FLGtCQUFNLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLFNBRXBDO1FBREMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0tBQ3RCO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxrQ0FBTTs7Ozs7SUFBTjtRQUNFLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssV0FDekIsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7UUFDRCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMxQzs0QkE3Q0g7RUFNdUMsVUFBVSxFQXdDaEQsQ0FBQTs7OztBQXhDRCw2QkF3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW1wbGVSdWxlIH0gZnJvbSAnLi9TaW1wbGVSdWxlJztcclxuaW1wb3J0IHsgUnVsZVJlc3VsdCB9IGZyb20gJy4vUnVsZVJlc3VsdCc7XHJcblxyXG4vKipcclxuICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgdGFyZ2V0IGlzIFtudWxsXSBvciBbdW5kZWZpbmVkXS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc051bGxPclVuZGVmaW5lZCBleHRlbmRzIFNpbXBsZVJ1bGUge1xyXG5cclxuICAgLyoqXHJcbiAgICogVGhlIHRhcmdldCBmb3IgdGhlIHNwZWNpZmllZCBydWxlIGV2YWx1YXRpb24uXHJcbiAgICovXHJcbiAgdGFyZ2V0O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbSXNOdWxsT3JVbmRlZmluZWRdIHJ1bGUuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlcyBhcmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGlzRGlzcGxheWFibGU6IEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gaXMgZGlzcGxheWJsZS4gRGVmYXVsdCB2YWx1ZSBpcyBbZmFsc2VdLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgdGFyZ2V0OiBhbnksXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcmVuZGVyIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuIFRoaXMgbWV0aG9kXHJcbiAgICogcmV0dXJucyBhIFtSdWxlUmVzdWx0XSB3aXRoIHRoZSBldmFsdWF0ZWQgcmVzdWx0IGFuZCBydWxlIGluZm9ybWF0aW9uLlxyXG4gICAqL1xyXG4gIHJlbmRlcigpOiBSdWxlUmVzdWx0e1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnRhcmdldCA9PSBudWxsIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3VuZGVmaW5lZCdcclxuICAgICkge1xyXG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFJ1bGVSZXN1bHQodGhpcywgdGhpcy50YXJnZXQpO1xyXG4gIH1cclxufVxyXG4iXX0=