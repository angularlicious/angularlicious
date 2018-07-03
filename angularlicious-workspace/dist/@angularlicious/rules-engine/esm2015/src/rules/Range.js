/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CompositeRule } from './CompositeRule';
import { IsNotNullOrUndefined } from './IsNotNullOrUndefined';
import { Min } from './Min';
import { Max } from './Max';
/**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
export class Range extends CompositeRule {
    /**
     * Constructor for the [Range] rule.
     * @param {?} name The name of the rule.
     * @param {?} message
     * @param {?} target The target object that the rules will be applied to.
     * @param {?} start The start range value - the lowest allowed boundary value.
     * @param {?} end The end range value - the highest allowed boundary value.
     * @param {?=} isDisplayable
     */
    constructor(name, message, target, start, end, isDisplayable = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.start = start;
        this.end = end;
        this.isDisplayable = isDisplayable;
        this.rules.push(new IsNotNullOrUndefined('TargetIsNotNull', 'The target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Min('MinValue', 'The value must be equal to or greater than the start range value.', this.target, this.start));
            this.rules.push(new Max('MaxValue', 'The value must be equal to or less than the end range value.', this.target, this.end));
        }
    }
}
function Range_tsickle_Closure_declarations() {
    /**
     * Use to indicate the end value of the range.
     * @type {?}
     */
    Range.prototype.end;
    /**
     * Use to indicate the start value of the range.
     * @type {?}
     */
    Range.prototype.start;
    /**
     * Use to indicate the [primitive] value that will be evaluated. The value
     * must be within the [start] and the [end] value to be valid.
     * @type {?}
     */
    Range.prototype.target;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3J1bGVzL1JhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFPQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7Ozs7Ozs7OztBQVk1QixNQUFNLFlBQWEsU0FBUSxhQUFhOzs7Ozs7Ozs7O0lBd0J0QyxZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsTUFBaUIsRUFDakIsS0FBYSxFQUNiLEdBQVcsRUFDWCxnQkFBeUIsS0FBSztRQUU5QixLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBRW5DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNiLElBQUksb0JBQW9CLENBQ3RCLGlCQUFpQixFQUNqQixrQ0FBa0MsRUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUNGLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsSUFBSSxHQUFHLENBQ0wsVUFBVSxFQUNWLG1FQUFtRSxFQUNuRSxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxLQUFLLENBQ1gsQ0FDRixDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2IsSUFBSSxHQUFHLENBQ0wsVUFBVSxFQUNWLDhEQUE4RCxFQUM5RCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxHQUFHLENBQ1QsQ0FDRixDQUFDO1NBQ0g7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcGFyZVJlc3VsdCB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlUmVzdWx0JztcclxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gJ3R5cGVzY3JpcHQtZG90bmV0LWNvbW1vbmpzL1N5c3RlbS9Db21wYXJlJztcclxuXHJcbmltcG9ydCB7IFNpbXBsZVJ1bGUgfSBmcm9tICcuL1NpbXBsZVJ1bGUnO1xyXG5pbXBvcnQgeyBSdWxlUmVzdWx0IH0gZnJvbSAnLi9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9QcmltaXRpdmUnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9zaXRlUnVsZSB9IGZyb20gJy4vQ29tcG9zaXRlUnVsZSc7XHJcbmltcG9ydCB7IElzTm90TnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAnLi9Jc05vdE51bGxPclVuZGVmaW5lZCc7XHJcbmltcG9ydCB7IE1pbiB9IGZyb20gJy4vTWluJztcclxuaW1wb3J0IHsgTWF4IH0gZnJvbSAnLi9NYXgnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIHJ1bGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSBzcGVjaWZpZWQgdGFyZ2V0IGlzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlIChzdGFydCBhbmQgZW5kKSB2YWx1ZXMuXHJcbiAqXHJcbiAqIFRoZSByYW5nZSB2YWx1ZXMgYXJlIGluY2x1c2l2ZS5cclxuICpcclxuICogRXg6IDEgaXMgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgdmFsaWQuXHJcbiAqIEV4OiAyIGlzIHdpdGhpbiAxIGFuZCAzLiBUaGUgdGFyZ2V0IGlzIHZhbGlkLlxyXG4gKiBFeDogMCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKiBFeDogNCBpcyBub3Qgd2l0aGluIDEgYW5kIDMuIFRoZSB0YXJnZXQgaXMgbm90IHZhbGlkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlIGV4dGVuZHMgQ29tcG9zaXRlUnVsZSB7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBlbmQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIGVuZDogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc3RhcnQgdmFsdWUgb2YgdGhlIHJhbmdlLlxyXG4gICAqL1xyXG4gIHN0YXJ0OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGluZGljYXRlIHRoZSBbcHJpbWl0aXZlXSB2YWx1ZSB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkLiBUaGUgdmFsdWVcclxuICAgKiBtdXN0IGJlIHdpdGhpbiB0aGUgW3N0YXJ0XSBhbmQgdGhlIFtlbmRdIHZhbHVlIHRvIGJlIHZhbGlkLlxyXG4gICAqL1xyXG4gIHRhcmdldDogUHJpbWl0aXZlO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RvciBmb3IgdGhlIFtSYW5nZV0gcnVsZS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcnVsZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZTogQSBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgdGhlIHJ1bGUgaXMgdmlvbGF0ZWQuXHJcbiAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCB0aGF0IHRoZSBydWxlcyB3aWxsIGJlIGFwcGxpZWQgdG8uXHJcbiAgICogQHBhcmFtIHN0YXJ0IFRoZSBzdGFydCByYW5nZSB2YWx1ZSAtIHRoZSBsb3dlc3QgYWxsb3dlZCBib3VuZGFyeSB2YWx1ZS5cclxuICAgKiBAcGFyYW0gZW5kIFRoZSBlbmQgcmFuZ2UgdmFsdWUgLSB0aGUgaGlnaGVzdCBhbGxvd2VkIGJvdW5kYXJ5IHZhbHVlLlxyXG4gICAqIEBwYXJhbSBpc0Rpc3BsYXlhYmxlOiAoT3B0aW9uYWwpIEluZGljYXRlcyBpZiB0aGUgcnVsZSB2aW9sYXRpb24gbWF5IGJlIGRpc3BsYXllZCBvciB2aXNpYmxlIHRvIHRoZSBjYWxsZXIgb3IgY2xpZW50LiBEZWZhdWx0IGlzIFtmYWxzZV0uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICB0YXJnZXQ6IFByaW1pdGl2ZSxcclxuICAgIHN0YXJ0OiBudW1iZXIsXHJcbiAgICBlbmQ6IG51bWJlcixcclxuICAgIGlzRGlzcGxheWFibGU6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgc3VwZXIobmFtZSwgbWVzc2FnZSwgaXNEaXNwbGF5YWJsZSk7XHJcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgdGhpcy5pc0Rpc3BsYXlhYmxlID0gaXNEaXNwbGF5YWJsZTtcclxuXHJcbiAgICB0aGlzLnJ1bGVzLnB1c2goXHJcbiAgICAgIG5ldyBJc05vdE51bGxPclVuZGVmaW5lZChcclxuICAgICAgICAnVGFyZ2V0SXNOb3ROdWxsJyxcclxuICAgICAgICAnVGhlIHRhcmdldCBpcyBudWxsIG9yIHVuZGVmaW5lZC4nLFxyXG4gICAgICAgIHRoaXMudGFyZ2V0XHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNaW4oXHJcbiAgICAgICAgICAnTWluVmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgc3RhcnQgcmFuZ2UgdmFsdWUuJyxcclxuICAgICAgICAgIHRoaXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGhpcy5zdGFydFxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5ydWxlcy5wdXNoKFxyXG4gICAgICAgIG5ldyBNYXgoXHJcbiAgICAgICAgICAnTWF4VmFsdWUnLFxyXG4gICAgICAgICAgJ1RoZSB2YWx1ZSBtdXN0IGJlIGVxdWFsIHRvIG9yIGxlc3MgdGhhbiB0aGUgZW5kIHJhbmdlIHZhbHVlLicsXHJcbiAgICAgICAgICB0aGlzLnRhcmdldCxcclxuICAgICAgICAgIHRoaXMuZW5kXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=