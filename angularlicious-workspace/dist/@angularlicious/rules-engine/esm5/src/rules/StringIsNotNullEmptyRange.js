/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { Range } from './Range';
/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
var /**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
StringIsNotNullEmptyRange = /** @class */ (function (_super) {
    tslib_1.__extends(StringIsNotNullEmptyRange, _super);
    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param name The name of the rule.
     * @param message The message to display when the rule is violated.
     * @param target The target that the rule(s) will be evaluated against.
     * @param minLength The minimum allowed length of the target value.
     * @param maxLength The maximum allowed length of the target value.
     */
    function StringIsNotNullEmptyRange(name, message, target, minLength, maxLength, isDisplayable) {
        if (isDisplayable === void 0) { isDisplayable = false; }
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
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
export { StringIsNotNullEmptyRange };
function StringIsNotNullEmptyRange_tsickle_Closure_declarations() {
    /**
     * Use to indicate the maximum length of the target value.
     * @type {?}
     */
    StringIsNotNullEmptyRange.prototype.maxLength;
    /**
     * Use to indicate the minimum lenth of the target value.
     * @type {?}
     */
    StringIsNotNullEmptyRange.prototype.minLength;
    /**
     * Use to provide the target [Primitive] to evaluate for the specified rule.
     * @type {?}
     */
    StringIsNotNullEmptyRange.prototype.target;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7OztBQU1oQzs7OztBQUFBO0lBQStDLHFEQUFhO0lBZ0IxRDs7Ozs7OztPQU9HO0lBQ0gsbUNBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixNQUFpQixFQUNqQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixhQUE4QjtRQUE5Qiw4QkFBQSxFQUFBLHFCQUE4QjtRQU5oQyxZQVFFLGtCQUFNLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLFNBTXBDO1FBTEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztLQUN2QjtJQUVEOztPQUVHOzs7OztJQUVILGtEQUFjOzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLG9CQUFvQixDQUN0QixpQkFBaUIsRUFDakIseUNBQXlDLEVBQ3pDLElBQUksQ0FBQyxNQUFNLENBQ1osQ0FDRixDQUFDO1FBQ0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLElBQUksS0FBSyxDQUNQLDJCQUEyQixFQUMzQixxREFBcUQsRUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQzdCLElBQUksQ0FBQyxTQUFTLEVBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FDZixDQUNGLENBQUM7U0FDSDtLQUNGO29DQTlFSDtFQWUrQyxhQUFhLEVBZ0UzRCxDQUFBOzs7OztBQWhFRCxxQ0FnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wYXJlUmVzdWx0IH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmVSZXN1bHQnO1xyXG5pbXBvcnQgeyBjb21wYXJlIH0gZnJvbSAndHlwZXNjcmlwdC1kb3RuZXQtY29tbW9uanMvU3lzdGVtL0NvbXBhcmUnO1xyXG5cclxuaW1wb3J0IHsgU2ltcGxlUnVsZSB9IGZyb20gJy4vU2ltcGxlUnVsZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuL1J1bGVSZXN1bHQnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL1ByaW1pdGl2ZSc7XHJcblxyXG5pbXBvcnQgeyBDb21wb3NpdGVSdWxlIH0gZnJvbSAnLi9Db21wb3NpdGVSdWxlJztcclxuaW1wb3J0IHsgSXNOb3ROdWxsT3JVbmRlZmluZWQgfSBmcm9tICcuL0lzTm90TnVsbE9yVW5kZWZpbmVkJztcclxuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICcuL1JhbmdlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBydWxlIHRvIHZhbGlkYXRlIGEgc3RyaW5nIHRhcmdldC4gQSB2YWxpZCBzdHJpbmcgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkOyBhbmQgaXRcclxuICogaXMgd2l0aGluIHRoZSBzcGVjaWZpZWQgbWluaW11bSBhbmQgbWF4aXVtdW0gbGVuZ3RoLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFN0cmluZ0lzTm90TnVsbEVtcHR5UmFuZ2UgZXh0ZW5kcyBDb21wb3NpdGVSdWxlIHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgbWluaW11bSBsZW50aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gcHJvdmlkZSB0aGUgdGFyZ2V0IFtQcmltaXRpdmVdIHRvIGV2YWx1YXRlIGZvciB0aGUgc3BlY2lmaWVkIHJ1bGUuXHJcbiAgICovXHJcbiAgdGFyZ2V0OiBQcmltaXRpdmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlUnVsZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZGlzcGxheSB3aGVuIHRoZSBydWxlIGlzIHZpb2xhdGVkLlxyXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCB0aGF0IHRoZSBydWxlKHMpIHdpbGwgYmUgZXZhbHVhdGVkIGFnYWluc3QuXHJcbiAgICogQHBhcmFtIG1pbkxlbmd0aCBUaGUgbWluaW11bSBhbGxvd2VkIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHRhcmdldDogUHJpbWl0aXZlLFxyXG4gICAgbWluTGVuZ3RoOiBudW1iZXIsXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMubWluTGVuZ3RoID0gbWluTGVuZ3RoO1xyXG4gICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVSdWxlcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBoZWxwZXIgbWV0aG9kIHRvIGNvbmZpZ3VyZS9hZGQgcnVsZXMgdG8gdGhlIHZhbGlkYXRpb24gY29udGV4dC5cclxuICAgKi9cclxuXHJcbiAgY29uZmlndXJlUnVsZXMoKSB7XHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnU3RyaW5nSXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHN0cmluZyB0YXJnZXQgaXMgbnVsbCBvciB1bmRlZmluZWQuJyxcclxuICAgICAgICB0aGlzLnRhcmdldFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBSYW5nZShcclxuICAgICAgICAgICdUYXJnZXRMZW5ndGhJc1dpdGhpblJhbmdlJyxcclxuICAgICAgICAgICdUaGUgc3RyaW5nIHZhbHVlIGlzIG5vdCB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS4nLFxyXG4gICAgICAgICAgdGhpcy50YXJnZXQudG9TdHJpbmcoKS5sZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1pbkxlbmd0aCxcclxuICAgICAgICAgIHRoaXMubWF4TGVuZ3RoXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=