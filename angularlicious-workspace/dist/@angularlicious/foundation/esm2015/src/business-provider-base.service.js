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
export class BusinessProviderBase {
    /**
     * @param {?} loggingService
     */
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.loggingService.log(this.serviceName, Severity.Information, `Running constructor for the [BusinessProviderBase].`);
    }
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
    handleUnexpectedError(error) {
        const /** @type {?} */ message = new ServiceMessage(error.name, error.message)
            .WithDisplayToUser(true)
            .WithMessageType(MessageType.Error)
            .WithSource(this.serviceName);
        const /** @type {?} */ logItem = `${message.toString()}; ${error.stack}`;
        this.loggingService.log(this.serviceName, Severity.Error, logItem);
        this.serviceContext.addMessage(message);
    }
    /**
     * @param {?} sourceName
     * @return {?}
     */
    finishRequest(sourceName) {
        this.loggingService.log(this.serviceName, Severity.Information, `Request for [${sourceName}] by ${this.serviceName} is complete.`);
        if (this.serviceContext.hasErrors()) {
            this.loggingService.log(this.serviceName, Severity.Information, `Preparing to write out the errors.`);
            this.serviceContext.Messages.filter(f => f.DisplayToUser && f.MessageType === MessageType.Error).forEach(e => this.loggingService.log(this.serviceName, Severity.Error, e.toString()));
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvYnVzaW5lc3MtcHJvdmlkZXItYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7O0FBT25ELE1BQU07Ozs7SUFLSixZQUFtQixjQUE0QztRQUE1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBOEI7UUFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLFFBQVEsQ0FBQyxXQUFXLEVBQ3BCLHFEQUFxRCxDQUN0RCxDQUFDO0tBQ0g7Ozs7Ozs7Ozs7Ozs7O0lBY0QscUJBQXFCLENBQUMsS0FBWTtRQUNoQyx1QkFBTSxPQUFPLEdBQUcsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzFELGlCQUFpQixDQUFDLElBQUksQ0FBQzthQUN2QixlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzthQUNsQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWhDLHVCQUFNLE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7OztJQUVELGFBQWEsQ0FBQyxVQUFrQjtRQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsZ0JBQWdCLFVBQVUsUUFBUSxJQUFJLENBQUMsV0FBVyxlQUFlLENBQ2xFLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsUUFBUSxDQUFDLFdBQVcsRUFDcEIsb0NBQW9DLENBQ3JDLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ2pDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQzVELENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUN4RSxDQUFDO1NBQ0g7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZSB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9sb2dnaW5nJztcclxuXHJcbmltcG9ydCB7IFNlcnZpY2VDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNlcnZpY2VNZXNzYWdlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL3J1bGVzLWVuZ2luZSc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGUgYnVzaW5lc3MgcHJvdmlkZXIgYmFzZSBjbGFzcyB0byBhY2Nlc3MgY29tbW9uIGVsZW1lbnRzIG9mIHRoZSBidXNpbmVzcyBwcm92aWRlci5cclxuICpcclxuICogc2VydmljZUNvbnRleHQ6IFRoaXMgaXMgaW5pdGlhbGl6ZWQgZm9yIGVhY2ggaW5zdGFuY2Ugb2YgYSBidXNpbmVzcyBwcm92aWRlciAtIGl0cyBwdXJwb3NlIGlzIHRvIGNvbGxlY3QgaW5mb3JtYXRpb24gZHVyaW5nIHRoZSBwcm9jZXNzaW5nIG9mIGJ1c2luZXNzIGxvZ2ljLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJ1c2luZXNzUHJvdmlkZXJCYXNlIHtcclxuICBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG4gIHNlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDtcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2luZ1NlcnZpY2U6IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UpIHtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICB0aGlzLnNlcnZpY2VOYW1lLFxyXG4gICAgICBTZXZlcml0eS5JbmZvcm1hdGlvbixcclxuICAgICAgYFJ1bm5pbmcgY29uc3RydWN0b3IgZm9yIHRoZSBbQnVzaW5lc3NQcm92aWRlckJhc2VdLmBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gaGFuZGxlIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaW4gdGhlIGFwcGxpY2F0aW9uLiBUaGUgZXJyb3Igc2hvdWxkIGltcGxlbWVudFxyXG4gICAqIHRoZSBzcGVjaWZpZWQgaW50ZXJmYWNlLiBUaGUgbWV0aG9kIHdpbGwgYWRkIGEgbmV3IFtTZXJ2aWNlTWVzc2FnZV0gdG8gdGhlXHJcbiAgICogc3BlY2lmaWVkIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICogQHBhcmFtIGVycm9yIEFuIHVuZXhwZWN0ZWQgYXBwbGljYXRpb24gZXJyb3IgdGhhdCBpbXBsZW1lbnRzIHRoZSBbRXJyb3JdIGludGVyZmFjZS5cclxuICAgKlxyXG4gICAqIGludGVyZmFjZSBFcnJvciB7XHJcbiAgICogIG5hbWU6IHN0cmluZztcclxuICAgKiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAqICBzdGFjaz86IHN0cmluZztcclxuICAgKiB9XHJcbiAgICovXHJcbiAgaGFuZGxlVW5leHBlY3RlZEVycm9yKGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IG5ldyBTZXJ2aWNlTWVzc2FnZShlcnJvci5uYW1lLCBlcnJvci5tZXNzYWdlKVxyXG4gICAgICAuV2l0aERpc3BsYXlUb1VzZXIodHJ1ZSlcclxuICAgICAgLldpdGhNZXNzYWdlVHlwZShNZXNzYWdlVHlwZS5FcnJvcilcclxuICAgICAgLldpdGhTb3VyY2UodGhpcy5zZXJ2aWNlTmFtZSk7XHJcblxyXG4gICAgY29uc3QgbG9nSXRlbSA9IGAke21lc3NhZ2UudG9TdHJpbmcoKX07ICR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKHRoaXMuc2VydmljZU5hbWUsIFNldmVyaXR5LkVycm9yLCBsb2dJdGVtKTtcclxuXHJcbiAgICB0aGlzLnNlcnZpY2VDb250ZXh0LmFkZE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBmaW5pc2hSZXF1ZXN0KHNvdXJjZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgIFNldmVyaXR5LkluZm9ybWF0aW9uLFxyXG4gICAgICBgUmVxdWVzdCBmb3IgWyR7c291cmNlTmFtZX1dIGJ5ICR7dGhpcy5zZXJ2aWNlTmFtZX0gaXMgY29tcGxldGUuYFxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnNlcnZpY2VDb250ZXh0Lmhhc0Vycm9ycygpKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgIHRoaXMuc2VydmljZU5hbWUsXHJcbiAgICAgICAgU2V2ZXJpdHkuSW5mb3JtYXRpb24sXHJcbiAgICAgICAgYFByZXBhcmluZyB0byB3cml0ZSBvdXQgdGhlIGVycm9ycy5gXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuc2VydmljZUNvbnRleHQuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5EaXNwbGF5VG9Vc2VyICYmIGYuTWVzc2FnZVR5cGUgPT09IE1lc3NhZ2VUeXBlLkVycm9yXHJcbiAgICAgICkuZm9yRWFjaChlID0+XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2codGhpcy5zZXJ2aWNlTmFtZSwgU2V2ZXJpdHkuRXJyb3IsIGUudG9TdHJpbmcoKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19