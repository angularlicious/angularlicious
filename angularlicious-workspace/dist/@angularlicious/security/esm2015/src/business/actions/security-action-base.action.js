/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ActionBase } from '@angularlicious/foundation';
export class SecurityActionBase extends ActionBase {
    constructor() {
        super();
    }
    /**
     * Use the [Do] method to perform the action.
     * @param {?} businessProvider
     * @return {?}
     */
    Do(businessProvider) {
        // Provide the [SecurityBusinessProviderService], [ServiceContext], and [LoggingService] to action;
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;
        this.execute();
    }
}
function SecurityActionBase_tsickle_Closure_declarations() {
    /** @type {?} */
    SecurityActionBase.prototype.businessProvider;
    /** @type {?} */
    SecurityActionBase.prototype.loggingService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktYWN0aW9uLWJhc2UuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL3NlY3VyaXR5LyIsInNvdXJjZXMiOlsic3JjL2J1c2luZXNzL2FjdGlvbnMvc2VjdXJpdHktYWN0aW9uLWJhc2UuYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFeEQsTUFBTSx5QkFBMEIsU0FBUSxVQUFVO0lBSWhEO1FBQ0UsS0FBSyxFQUFFLENBQUM7S0FDVDs7Ozs7O0lBS0QsRUFBRSxDQUFDLGdCQUFpRDs7UUFFbEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBRXRELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vYnVzaW5lc3Mvc2VjdXJpdHktYnVzaW5lc3MtcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvbG9nZ2luZyc7XHJcbmltcG9ydCB7IEFjdGlvbkJhc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlBY3Rpb25CYXNlIGV4dGVuZHMgQWN0aW9uQmFzZSB7XHJcbiAgYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZTtcclxuICBsb2dnaW5nU2VydmljZTogQW5ndWxhcmxpY2lvdXNMb2dnaW5nU2VydmljZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoZSBbRG9dIG1ldGhvZCB0byBwZXJmb3JtIHRoZSBhY3Rpb24uXHJcbiAgICovXHJcbiAgRG8oYnVzaW5lc3NQcm92aWRlcjogU2VjdXJpdHlCdXNpbmVzc1Byb3ZpZGVyU2VydmljZSkge1xyXG4gICAgLy8gUHJvdmlkZSB0aGUgW1NlY3VyaXR5QnVzaW5lc3NQcm92aWRlclNlcnZpY2VdLCBbU2VydmljZUNvbnRleHRdLCBhbmQgW0xvZ2dpbmdTZXJ2aWNlXSB0byBhY3Rpb247XHJcbiAgICB0aGlzLmJ1c2luZXNzUHJvdmlkZXIgPSBidXNpbmVzc1Byb3ZpZGVyO1xyXG4gICAgdGhpcy5zZXJ2aWNlQ29udGV4dCA9IGJ1c2luZXNzUHJvdmlkZXIuc2VydmljZUNvbnRleHQ7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlID0gYnVzaW5lc3NQcm92aWRlci5sb2dnaW5nU2VydmljZTtcclxuXHJcbiAgICB0aGlzLmV4ZWN1dGUoKTtcclxuICB9XHJcbn1cclxuIl19