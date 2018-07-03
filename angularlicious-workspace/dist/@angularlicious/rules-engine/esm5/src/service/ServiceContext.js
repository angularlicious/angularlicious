/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { MessageType } from './MessageType';
/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
var /**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
ServiceContext = /** @class */ (function () {
    function ServiceContext() {
        /**
         * A list of service messages added by the application during the processing of the
         * specified service request.
         */
        this.Messages = new Array();
    }
    /**
     * Use this method to add a new message to the [ServiceContext].
     */
    /**
     * Use this method to add a new message to the [ServiceContext].
     * @param {?} message
     * @return {?}
     */
    ServiceContext.prototype.addMessage = /**
     * Use this method to add a new message to the [ServiceContext].
     * @param {?} message
     * @return {?}
     */
    function (message) {
        this.Messages.push(message);
    };
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     */
    /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     * @return {?}
     */
    ServiceContext.prototype.hasErrors = /**
     * Use to determine if the current [ServiceContext] contains any messages with type of [Error].
     * @return {?}
     */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            var /** @type {?} */ errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
            if (errorMessages.length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     */
    /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     * @return {?}
     */
    ServiceContext.prototype.isGood = /**
     * Use to determine if the current [ServiceContext] does not contain any errors.
     * @return {?}
     */
    function () {
        if (this.Messages && this.Messages.length > 0) {
            var /** @type {?} */ errorMessages = this.Messages.filter(function (f) { return f.MessageType === MessageType.Error; });
            if (errorMessages.length > 0) {
                return false;
            }
        }
        return true;
    };
    return ServiceContext;
}());
/**
 * Use this class to manage the context of a single service call. This
 * class will contain a list of any service messages added during the processing
 * of a service request.
 */
export { ServiceContext };
function ServiceContext_tsickle_Closure_declarations() {
    /**
     * A list of service messages added by the application during the processing of the
     * specified service request.
     * @type {?}
     */
    ServiceContext.prototype.Messages;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZUNvbnRleHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2UvU2VydmljZUNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQU81Qzs7Ozs7QUFBQTs7Ozs7O3dCQUtvQyxJQUFJLEtBQUssRUFBa0I7O0lBRTdEOztPQUVHOzs7Ozs7SUFDSCxtQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQXVCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsa0NBQVM7Ozs7SUFBVDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3hDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFuQyxDQUFtQyxDQUN6QyxDQUFDO1lBQ0YsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDZDtJQUVEOztPQUVHOzs7OztJQUNILCtCQUFNOzs7O0lBQU47UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMscUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUN4QyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBbkMsQ0FBbUMsQ0FDekMsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7eUJBbERIO0lBbURDLENBQUE7Ozs7OztBQTNDRCwwQkEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlTWVzc2FnZSB9IGZyb20gJy4vU2VydmljZU1lc3NhZ2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gJy4vTWVzc2FnZVR5cGUnO1xyXG5cclxuLyoqXHJcbiAqIFVzZSB0aGlzIGNsYXNzIHRvIG1hbmFnZSB0aGUgY29udGV4dCBvZiBhIHNpbmdsZSBzZXJ2aWNlIGNhbGwuIFRoaXNcclxuICogY2xhc3Mgd2lsbCBjb250YWluIGEgbGlzdCBvZiBhbnkgc2VydmljZSBtZXNzYWdlcyBhZGRlZCBkdXJpbmcgdGhlIHByb2Nlc3NpbmdcclxuICogb2YgYSBzZXJ2aWNlIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmljZUNvbnRleHQge1xyXG4gIC8qKlxyXG4gICAqIEEgbGlzdCBvZiBzZXJ2aWNlIG1lc3NhZ2VzIGFkZGVkIGJ5IHRoZSBhcHBsaWNhdGlvbiBkdXJpbmcgdGhlIHByb2Nlc3Npbmcgb2YgdGhlXHJcbiAgICogc3BlY2lmaWVkIHNlcnZpY2UgcmVxdWVzdC5cclxuICAgKi9cclxuICBNZXNzYWdlczogQXJyYXk8U2VydmljZU1lc3NhZ2U+ID0gbmV3IEFycmF5PFNlcnZpY2VNZXNzYWdlPigpO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gYWRkIGEgbmV3IG1lc3NhZ2UgdG8gdGhlIFtTZXJ2aWNlQ29udGV4dF0uXHJcbiAgICovXHJcbiAgYWRkTWVzc2FnZShtZXNzYWdlOiBTZXJ2aWNlTWVzc2FnZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRvIGRldGVybWluZSBpZiB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdIGNvbnRhaW5zIGFueSBtZXNzYWdlcyB3aXRoIHR5cGUgb2YgW0Vycm9yXS5cclxuICAgKi9cclxuICBoYXNFcnJvcnMoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5NZXNzYWdlcyAmJiB0aGlzLk1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHRoaXMuTWVzc2FnZXMuZmlsdGVyKFxyXG4gICAgICAgIGYgPT4gZi5NZXNzYWdlVHlwZSA9PT0gTWVzc2FnZVR5cGUuRXJyb3JcclxuICAgICAgKTtcclxuICAgICAgaWYgKGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IFtTZXJ2aWNlQ29udGV4dF0gZG9lcyBub3QgY29udGFpbiBhbnkgZXJyb3JzLlxyXG4gICAqL1xyXG4gIGlzR29vZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLk1lc3NhZ2VzICYmIHRoaXMuTWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2VzID0gdGhpcy5NZXNzYWdlcy5maWx0ZXIoXHJcbiAgICAgICAgZiA9PiBmLk1lc3NhZ2VUeXBlID09PSBNZXNzYWdlVHlwZS5FcnJvclxyXG4gICAgICApO1xyXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuIl19