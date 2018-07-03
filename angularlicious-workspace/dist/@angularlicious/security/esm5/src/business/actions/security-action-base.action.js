/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ActionBase } from '@angularlicious/foundation';
var SecurityActionBase = /** @class */ (function (_super) {
    tslib_1.__extends(SecurityActionBase, _super);
    function SecurityActionBase() {
        return _super.call(this) || this;
    }
    /**
     * Use the [Do] method to perform the action.
     */
    /**
     * Use the [Do] method to perform the action.
     * @param {?} businessProvider
     * @return {?}
     */
    SecurityActionBase.prototype.Do = /**
     * Use the [Do] method to perform the action.
     * @param {?} businessProvider
     * @return {?}
     */
    function (businessProvider) {
        // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;
        this.execute();
    };
    return SecurityActionBase;
}(ActionBase));
export { SecurityActionBase };
function SecurityActionBase_tsickle_Closure_declarations() {
    /** @type {?} */
    SecurityActionBase.prototype.businessProvider;
    /** @type {?} */
    SecurityActionBase.prototype.loggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktYWN0aW9uLWJhc2UuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5LyIsInNvdXJjZXMiOlsic3JjL2J1c2luZXNzL2FjdGlvbnMvc2VjdXJpdHktYWN0aW9uLWJhc2UuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXhELElBQUE7SUFBd0MsOENBQVU7SUFJaEQ7ZUFDRSxpQkFBTztLQUNSO0lBRUQ7O09BRUc7Ozs7OztJQUNILCtCQUFFOzs7OztJQUFGLFVBQUcsZ0JBQWlEOztRQUVsRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7UUFFdEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOzZCQXRCSDtFQUl3QyxVQUFVLEVBbUJqRCxDQUFBO0FBbkJELDhCQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2J1c2luZXNzL3NlY3VyaXR5LWJ1c2luZXNzLXByb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBBY3Rpb25CYXNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlY3VyaXR5QWN0aW9uQmFzZSBleHRlbmRzIEFjdGlvbkJhc2Uge1xyXG4gIGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2U7XHJcbiAgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGUgW0RvXSBtZXRob2QgdG8gcGVyZm9ybSB0aGUgYWN0aW9uLlxyXG4gICAqL1xyXG4gIERvKGJ1c2luZXNzUHJvdmlkZXI6IFNlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIC8vIFByb3ZpZGUgdGhlIFtTZWN1cml0eUJ1c2luZXNzUHJvdmlkZXJTZXJ2aWNlXSwgW1NlcnZpY2VDb250ZXh0XSwgYW5kIFtMb2dnaW5nU2VydmljZV0gdG8gYWN0aW9uO1xyXG4gICAgdGhpcy5idXNpbmVzc1Byb3ZpZGVyID0gYnVzaW5lc3NQcm92aWRlcjtcclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQgPSBidXNpbmVzc1Byb3ZpZGVyLnNlcnZpY2VDb250ZXh0O1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZSA9IGJ1c2luZXNzUHJvdmlkZXIubG9nZ2luZ1NlcnZpY2U7XHJcblxyXG4gICAgdGhpcy5leGVjdXRlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==