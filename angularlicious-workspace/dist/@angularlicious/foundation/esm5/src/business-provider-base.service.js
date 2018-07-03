/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ServiceMessage } from '@angularlicious/rules-engine';
import { MessageType } from '@angularlicious/rules-engine';
import { Severity } from '@angularlicious/logging';
/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
var /**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
BusinessProviderBase = /** @class */ (function () {
    function BusinessProviderBase(loggingService) {
        this.loggingService = loggingService;
        this.loggingService.log(this.serviceName, Severity.Information, "Running constructor for the [BusinessProviderBase].");
    }
    /**
     * Use to handle an unexpected error in the application. The error should implement
     * the specified interface. The method will add a new [ServiceMessage] to the
     * specified [ServiceContext].
     * @param error An unexpected application error that implements the [Error] interface.
     *
     * interface Error {
     *  name: string;
     *  message: string;
     *  stack?: string;
     * }
     */
    /**
     * Use to handle an unexpected error in the application. The error should implement
     * the specified interface. The method will add a new [ServiceMessage] to the
     * specified [ServiceContext].
     * @param {?} error An unexpected application error that implements the [Error] interface.
     *
     * interface Error {
     *  name: string;
     *  message: string;
     *  stack?: string;
     * }
     * @return {?}
     */
    BusinessProviderBase.prototype.handleUnexpectedError = /**
     * Use to handle an unexpected error in the application. The error should implement
     * the specified interface. The method will add a new [ServiceMessage] to the
     * specified [ServiceContext].
     * @param {?} error An unexpected application error that implements the [Error] interface.
     *
     * interface Error {
     *  name: string;
     *  message: string;
     *  stack?: string;
     * }
     * @return {?}
     */
    function (error) {
        var /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        var /** @type {?} */ logItem = message.toString() + "; " + error.stack;
        this.loggingService.log(this.serviceName, Severity.Error, logItem);
        this.serviceContext.addMessage(message);
    };
    /**
     * @param {?} sourceName
     * @return {?}
     */
    BusinessProviderBase.prototype.finishRequest = /**
     * @param {?} sourceName
     * @return {?}
     */
    function (sourceName) {
        var _this = this;
        this.loggingService.log(this.serviceName, Severity.Information, "Request for [" + sourceName + "] by " + this.serviceName + " is complete.");
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, "Preparing to write out the errors.");
            this.serviceContext.Messages.filter(function (f) { return f.DisplayToUser && f.MessageType === MessageType.Error; }).forEach(function (e) {
                return _this.loggingService.log(_this.serviceName, Severity.Error, e.toString());
            });
        }
    };
    return BusinessProviderBase;
}());
/**
 * Use the business provider base class to access common elements of the business provider.
 *
 * serviceContext: This is initialized for each instance of a business provider - its purpose is to collect information during the processing of business logic.
 */
export { BusinessProviderBase };
function BusinessProviderBase_tsickle_Closure_declarations() {
    /** @type {?} */
    BusinessProviderBase.prototype.serviceName;
    /** @type {?} */
    BusinessProviderBase.prototype.serviceContext;
    /** @type {?} */
    BusinessProviderBase.prototype.accessToken;
    /** @type {?} */
    BusinessProviderBase.prototype.loggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0FBT25EOzs7OztBQUFBO0lBS0UsOEJBQW1CLGNBQTRDO1FBQTVDLG1CQUFjLEdBQWQsY0FBYyxDQUE4QjtRQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIscURBQXFELENBQ3RELENBQUM7S0FDSDtJQUVEOzs7Ozs7Ozs7OztPQVdHOzs7Ozs7Ozs7Ozs7OztJQUNILG9EQUFxQjs7Ozs7Ozs7Ozs7OztJQUFyQixVQUFzQixLQUFZO1FBQ2hDLHFCQUFNLE9BQU8sR0FBRyxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDMUQsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQ3ZCLGVBQWUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFaEMscUJBQU0sT0FBTyxHQUFNLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBSyxLQUFLLENBQUMsS0FBTyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVuRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCw0Q0FBYTs7OztJQUFiLFVBQWMsVUFBa0I7UUFBaEMsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixJQUFJLENBQUMsV0FBVyxFQUNoQixRQUFRLENBQUMsV0FBVyxFQUNwQixrQkFBZ0IsVUFBVSxhQUFRLElBQUksQ0FBQyxXQUFXLGtCQUFlLENBQ2xFLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsb0NBQW9DLENBQ3JDLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ2pDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQXRELENBQXNELENBQzVELENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDVCxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFBdkUsQ0FBdUUsQ0FDeEUsQ0FBQztTQUNIO0tBQ0Y7K0JBbkVIO0lBb0VDLENBQUE7Ozs7OztBQXhERCxnQ0F3REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuaW1wb3J0IHsgU2VydmljZUNvbnRleHQgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2VydmljZU1lc3NhZ2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lJztcclxuaW1wb3J0IHsgU2V2ZXJpdHkgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcblxyXG4vKipcclxuICogVXNlIHRoZSBidXNpbmVzcyBwcm92aWRlciBiYXNlIGNsYXNzIHRvIGFjY2VzcyBjb21tb24gZWxlbWVudHMgb2YgdGhlIGJ1c2luZXNzIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBzZXJ2aWNlQ29udGV4dDogVGhpcyBpcyBpbml0aWFsaXplZCBmb3IgZWFjaCBpbnN0YW5jZSBvZiBhIGJ1c2luZXNzIHByb3ZpZGVyIC0gaXRzIHB1cnBvc2UgaXMgdG8gY29sbGVjdCBpbmZvcm1hdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgYnVzaW5lc3MgbG9naWMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQnVzaW5lc3NQcm92aWRlckJhc2Uge1xyXG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XHJcbiAgc2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0O1xyXG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSkge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUnVubmluZyBjb25zdHJ1Y3RvciBmb3IgdGhlIFtCdXNpbmVzc1Byb3ZpZGVyQmFzZV0uYFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0byBoYW5kbGUgYW4gdW5leHBlY3RlZCBlcnJvciBpbiB0aGUgYXBwbGljYXRpb24uIFRoZSBlcnJvciBzaG91bGQgaW1wbGVtZW50XHJcbiAgICogdGhlIHNwZWNpZmllZCBpbnRlcmZhY2UuIFRoZSBtZXRob2Qgd2lsbCBhZGQgYSBuZXcgW1NlcnZpY2VNZXNzYWdlXSB0byB0aGVcclxuICAgKiBzcGVjaWZpZWQgW1NlcnZpY2VDb250ZXh0XS5cclxuICAgKiBAcGFyYW0gZXJyb3IgQW4gdW5leHBlY3RlZCBhcHBsaWNhdGlvbiBlcnJvciB0aGF0IGltcGxlbWVudHMgdGhlIFtFcnJvcl0gaW50ZXJmYWNlLlxyXG4gICAqXHJcbiAgICogaW50ZXJmYWNlIEVycm9yIHtcclxuICAgKiAgbmFtZTogc3RyaW5nO1xyXG4gICAqICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICogIHN0YWNrPzogc3RyaW5nO1xyXG4gICAqIH1cclxuICAgKi9cclxuICBoYW5kbGVVbmV4cGVjdGVkRXJyb3IoZXJyb3I6IEVycm9yKTogdm9pZCB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IFNlcnZpY2VNZXNzYWdlKGVycm9yLm5hbWUsIGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIC5XaXRoRGlzcGxheVRvVXNlcih0cnVlKVxyXG4gICAgICAuV2l0aE1lc3NhZ2VUeXBlKE1lc3NhZ2VUeXBlLkVycm9yKVxyXG4gICAgICAuV2l0aFNvdXJjZSh0aGlzLnNlcnZpY2VOYW1lKTtcclxuXHJcbiAgICBjb25zdCBsb2dJdGVtID0gYCR7bWVzc2FnZS50b1N0cmluZygpfTsgJHtlcnJvci5zdGFja31gO1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGxvZ0l0ZW0pO1xyXG5cclxuICAgIHRoaXMuc2VydmljZUNvbnRleHQuYWRkTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIGZpbmlzaFJlcXVlc3Qoc291cmNlTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgIGBSZXF1ZXN0IGZvciBbJHtzb3VyY2VOYW1lfV0gYnkgJHt0aGlzLnNlcnZpY2VOYW1lfSBpcyBjb21wbGV0ZS5gXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc2VydmljZUNvbnRleHQuaGFzRXJyb3JzKCkpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTmFtZSxcclxuICAgICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgICBgUHJlcGFyaW5nIHRvIHdyaXRlIG91dCB0aGUgZXJyb3JzLmBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zZXJ2aWNlQ29udGV4dC5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLkRpc3BsYXlUb1VzZXIgJiYgZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKS5mb3JFYWNoKGUgPT5cclxuICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5FcnJvciwgZS50b1N0cmluZygpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=