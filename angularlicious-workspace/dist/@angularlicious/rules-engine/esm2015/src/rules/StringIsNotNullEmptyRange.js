/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { Range } from './Range';
/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length.
 */
export class StringIsNotNullEmptyRange extends CompositeRule {
    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param {?} name The name of the rule.
     * @param {?} message The message to display when the rule is violated.
     * @param {?} target The target that the rule(s) will be evaluated against.
     * @param {?} minLength The minimum allowed length of the target value.
     * @param {?} maxLength The maximum allowed length of the target value.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, minLength, maxLength, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.minLength = minLength;
        this.maxLength = maxLength;
        this.configureRules();
    }
    /**
     * A helper method to configure/add rules to the validation context.
     * @return {?}
     */
    configureRules() {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Range('TargetLengthIsWithinRange', 'The string value is not within the specified range.', this.target.toString().length, this.minLength, this.maxLength));
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFybGljaW91cy9ydWxlcy1lbmdpbmUvIiwic291cmNlcyI6WyJzcmMvcnVsZXMvU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBTWhDLE1BQU0sZ0NBQWlDLFNBQVEsYUFBYTs7Ozs7Ozs7OztJQXdCMUQsWUFDRSxJQUFZLEVBQ1osT0FBZSxFQUNmLE1BQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLGdCQUF5QixLQUFLO1FBRTlCLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBRTNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFNRCxjQUFjO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsSUFBSSxvQkFBb0IsQ0FDdEIsaUJBQWlCLEVBQ2pCLHlDQUF5QyxFQUN6QyxJQUFJLENBQUMsTUFBTSxDQUNaLENBQ0YsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDYixJQUFJLEtBQUssQ0FDUCwyQkFBMkIsRUFDM0IscURBQXFELEVBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUM3QixJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FDRixDQUFDO1NBQ0g7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XHJcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAnLi9SYW5nZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgcnVsZSB0byB2YWxpZGF0ZSBhIHN0cmluZyB0YXJnZXQuIEEgdmFsaWQgc3RyaW5nIGlzIG5vdCBudWxsIG9yIHVuZGVmaW5lZDsgYW5kIGl0XHJcbiAqIGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG1pbmltdW0gYW5kIG1heGl1bXVtIGxlbmd0aC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdHJpbmdJc05vdE51bGxFbXB0eVJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgdGFyZ2V0IHZhbHVlLlxyXG4gICAqL1xyXG4gIG1heExlbmd0aDogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1pbmltdW0gbGVudGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKi9cclxuICBtaW5MZW5ndGg6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIHByb3ZpZGUgdGhlIHRhcmdldCBbUHJpbWl0aXZlXSB0byBldmFsdWF0ZSBmb3IgdGhlIHNwZWNpZmllZCBydWxlLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU3RyaW5nSXNOb3ROdWxsRW1wdHlSYW5nZVJ1bGVdLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXkgd2hlbiB0aGUgcnVsZSBpcyB2aW9sYXRlZC5cclxuICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgdGhhdCB0aGUgcnVsZShzKSB3aWxsIGJlIGV2YWx1YXRlZCBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBtaW5MZW5ndGggVGhlIG1pbmltdW0gYWxsb3dlZCBsZW5ndGggb2YgdGhlIHRhcmdldCB2YWx1ZS5cclxuICAgKiBAcGFyYW0gbWF4TGVuZ3RoIFRoZSBtYXhpbXVtIGFsbG93ZWQgbGVuZ3RoIG9mIHRoZSB0YXJnZXQgdmFsdWUuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIG1pbkxlbmd0aDogbnVtYmVyLFxyXG4gICAgbWF4TGVuZ3RoOiBudW1iZXIsXHJcbiAgICBpc0Rpc3BsYXlhYmxlOiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UsIGlzRGlzcGxheWFibGUpO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB0aGlzLm1pbkxlbmd0aCA9IG1pbkxlbmd0aDtcclxuICAgIHRoaXMubWF4TGVuZ3RoID0gbWF4TGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuY29uZmlndXJlUnVsZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaGVscGVyIG1ldGhvZCB0byBjb25maWd1cmUvYWRkIHJ1bGVzIHRvIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuXHJcbiAgICovXHJcblxyXG4gIGNvbmZpZ3VyZVJ1bGVzKCkge1xyXG4gICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICBuZXcgSXNOb3ROdWxsT3JVbmRlZmluZWQoXHJcbiAgICAgICAgJ1N0cmluZ0lzTm90TnVsbCcsXHJcbiAgICAgICAgJ1RoZSBzdHJpbmcgdGFyZ2V0IGlzIG51bGwgb3IgdW5kZWZpbmVkLicsXHJcbiAgICAgICAgdGhpcy50YXJnZXRcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnRhcmdldCAhPSBudWxsKSB7XHJcbiAgICAgIHRoaXMucnVsZXMucHVzaChcclxuICAgICAgICBuZXcgUmFuZ2UoXHJcbiAgICAgICAgICAnVGFyZ2V0TGVuZ3RoSXNXaXRoaW5SYW5nZScsXHJcbiAgICAgICAgICAnVGhlIHN0cmluZyB2YWx1ZSBpcyBub3Qgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuJyxcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LnRvU3RyaW5nKCkubGVuZ3RoLFxyXG4gICAgICAgICAgdGhpcy5taW5MZW5ndGgsXHJcbiAgICAgICAgICB0aGlzLm1heExlbmd0aFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19