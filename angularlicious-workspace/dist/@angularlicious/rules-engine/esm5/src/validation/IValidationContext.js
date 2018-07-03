/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this interface class to define the structure of a Validation Context.
 * @record
 */
export function IValidationContext() { }
function IValidationContext_tsickle_Closure_declarations() {
    /**
     * Use to indicate the status of the validation context. The value is [true] when
     * all rules are evaluated without violations.
     * @type {?}
     */
    IValidationContext.prototype.isValid;
    /**
     * Use to indicate the state of the validation context.
     * @type {?}
     */
    IValidationContext.prototype.state;
    /**
     * A list of results for all rules evaluated.
     * @type {?}
     */
    IValidationContext.prototype.results;
    /**
     * A list of rules that will be evaluated.
     * @type {?}
     */
    IValidationContext.prototype.rules;
    /**
     * Implement this method to indicate if the validation context contains any rule violations. Returns [true]
     * when there are one or more rule violations.
     * @type {?}
     */
    IValidationContext.prototype.hasRuleViolations;
    /**
     * Implement this method to render the rules contained in the validation context.
     * @type {?}
     */
    IValidationContext.prototype.renderRules;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSVZhbGlkYXRpb25Db250ZXh0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZS8iLCJzb3VyY2VzIjpbInNyYy92YWxpZGF0aW9uL0lWYWxpZGF0aW9uQ29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSB9IGZyb20gJy4vVmFsaWRhdGlvbkNvbnRleHRTdGF0ZSc7XHJcbmltcG9ydCB7IFJ1bGVSZXN1bHQgfSBmcm9tICcuLi9ydWxlcy9SdWxlUmVzdWx0JztcclxuaW1wb3J0IHsgUnVsZVBvbGljeSB9IGZyb20gJy4uL3J1bGVzL1J1bGVQb2xpY3knO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGludGVyZmFjZSBjbGFzcyB0byBkZWZpbmUgdGhlIHN0cnVjdHVyZSBvZiBhIFZhbGlkYXRpb24gQ29udGV4dC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25Db250ZXh0IHtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXR1cyBvZiB0aGUgdmFsaWRhdGlvbiBjb250ZXh0LiBUaGUgdmFsdWUgaXMgW3RydWVdIHdoZW5cclxuICAgKiBhbGwgcnVsZXMgYXJlIGV2YWx1YXRlZCB3aXRob3V0IHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaXNWYWxpZDogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHN0YXRlIG9mIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuIFxyXG4gICAqL1xyXG4gIHN0YXRlOiBWYWxpZGF0aW9uQ29udGV4dFN0YXRlO1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiByZXN1bHRzIGZvciBhbGwgcnVsZXMgZXZhbHVhdGVkLlxyXG4gICAqL1xyXG4gIHJlc3VsdHM6IEFycmF5PFJ1bGVSZXN1bHQ+O1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBydWxlcyB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkLlxyXG4gICAqL1xyXG4gIHJ1bGVzOiBSdWxlUG9saWN5W107XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIGluZGljYXRlIGlmIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQgY29udGFpbnMgYW55IHJ1bGUgdmlvbGF0aW9ucy4gUmV0dXJucyBbdHJ1ZV1cclxuICAgKiB3aGVuIHRoZXJlIGFyZSBvbmUgb3IgbW9yZSBydWxlIHZpb2xhdGlvbnMuXHJcbiAgICovXHJcbiAgaGFzUnVsZVZpb2xhdGlvbnMoKTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbmRlciB0aGUgcnVsZXMgY29udGFpbmVkIGluIHRoZSB2YWxpZGF0aW9uIGNvbnRleHQuIFxyXG4gICAqL1xyXG4gIHJlbmRlclJ1bGVzKCk6IElWYWxpZGF0aW9uQ29udGV4dDtcclxufVxyXG4iXX0=