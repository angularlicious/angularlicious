/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/observeOn';
import 'rxjs/add/operator/toPromise';
import { HttpBaseService } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { HttpRequestMethod } from '@angularlicious/foundation';
export class SecurityApiService extends HttpBaseService {
    /**
     * @param {?} http
     * @param {?} httpService
     * @param {?} loggingService
     */
    constructor(http, httpService, loggingService) {
        super(http, loggingService);
        this.httpService = httpService;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    registerSubscriber(subscriber) {
        const /** @type {?} */ requestUrl = 'api/subscriber/register';
        const /** @type {?} */ message = `${this.serviceName} preparing to call: ${requestUrl}`;
        this.loggingService.log(this.serviceName, Severity.Information, message);
        const /** @type {?} */ body = JSON.stringify(subscriber);
        const /** @type {?} */ options = this.httpService.createRequestOptions(HttpRequestMethod.POST, this.httpService.createHeader(false), requestUrl, body);
        return this.httpService.get(options);
        /**TEMPORARY IMPLEMENTATION */
        // const response = new ServiceResponse();
        // response.IsSuccess = true;
        // response.Message = `Fake message from ${this.serviceName}`;
        // response.Data = true;
        // const subject: BehaviorSubject<any> = new BehaviorSubject(response);
        // return subject.asObservable();
        /**TEMPORARY IMPLEMENTATION */
    }
}
SecurityApiService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SecurityApiService.ctorParameters = () => [
    { type: HttpClient },
    { type: HttpBaseService },
    { type: AngularliciousLoggingService }
];
function SecurityApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    SecurityApiService.prototype.httpService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHktYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvc2VjdXJpdHkvIiwic291cmNlcyI6WyJzcmMvYnVzaW5lc3Mvc2VjdXJpdHktYXBpLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBVSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8seUJBQXlCLENBQUM7QUFDakMsT0FBTyw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLDZCQUE2QixDQUFDO0FBSXJDLE9BQU8sRUFBRSxlQUFlLEVBQW1CLE1BQU0sNEJBQTRCLENBQUM7QUFDOUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRWpGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRy9ELE1BQU0seUJBQTBCLFNBQVEsZUFBZTs7Ozs7O0lBQ3JELFlBQ0UsSUFBZ0IsRUFDVCxhQUNQLGNBQTRDO1FBRTVDLEtBQUssQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFIckIsZ0JBQVcsR0FBWCxXQUFXO0tBSW5COzs7OztJQUVELGtCQUFrQixDQUFDLFVBQXNCO1FBQ3ZDLHVCQUFNLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQztRQUM3Qyx1QkFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyx1QkFBdUIsVUFBVSxFQUFFLENBQUM7UUFDdkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpFLHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUNuRCxpQkFBaUIsQ0FBQyxJQUFJLEVBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUNwQyxVQUFVLEVBQ1YsSUFBSSxDQUNMLENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7OztLQVV0Qzs7O1lBaENGLFVBQVU7Ozs7WUFiRixVQUFVO1lBUVYsZUFBZTtZQUNmLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivb2JzZXJ2ZU9uJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci90b1Byb21pc2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSHR0cEJhc2VTZXJ2aWNlLCBTZXJ2aWNlUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2UsIFNldmVyaXR5IH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcnO1xyXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvc3Vic2NyaWJlci5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBSZXF1ZXN0TWV0aG9kIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2VjdXJpdHlBcGlTZXJ2aWNlIGV4dGVuZHMgSHR0cEJhc2VTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICBwdWJsaWMgaHR0cFNlcnZpY2U6IEh0dHBCYXNlU2VydmljZSxcclxuICAgIGxvZ2dpbmdTZXJ2aWNlOiBBbmd1bGFybGljaW91c0xvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihodHRwLCBsb2dnaW5nU2VydmljZSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3RlclN1YnNjcmliZXIoc3Vic2NyaWJlcjogU3Vic2NyaWJlcik6IE9ic2VydmFibGU8U2VydmljZVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCByZXF1ZXN0VXJsID0gJ2FwaS9zdWJzY3JpYmVyL3JlZ2lzdGVyJztcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLnNlcnZpY2VOYW1lfSBwcmVwYXJpbmcgdG8gY2FsbDogJHtyZXF1ZXN0VXJsfWA7XHJcbiAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgbWVzc2FnZSk7XHJcblxyXG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHN1YnNjcmliZXIpO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuaHR0cFNlcnZpY2UuY3JlYXRlUmVxdWVzdE9wdGlvbnMoXHJcbiAgICAgIEh0dHBSZXF1ZXN0TWV0aG9kLlBPU1QsXHJcbiAgICAgIHRoaXMuaHR0cFNlcnZpY2UuY3JlYXRlSGVhZGVyKGZhbHNlKSxcclxuICAgICAgcmVxdWVzdFVybCxcclxuICAgICAgYm9keVxyXG4gICAgKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChvcHRpb25zKTtcclxuXHJcbiAgICAvKipURU1QT1JBUlkgSU1QTEVNRU5UQVRJT04gKi9cclxuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gbmV3IFNlcnZpY2VSZXNwb25zZSgpO1xyXG4gICAgLy8gcmVzcG9uc2UuSXNTdWNjZXNzID0gdHJ1ZTtcclxuICAgIC8vIHJlc3BvbnNlLk1lc3NhZ2UgPSBgRmFrZSBtZXNzYWdlIGZyb20gJHt0aGlzLnNlcnZpY2VOYW1lfWA7XHJcbiAgICAvLyByZXNwb25zZS5EYXRhID0gdHJ1ZTtcclxuICAgIC8vIGNvbnN0IHN1YmplY3Q6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChyZXNwb25zZSk7XHJcbiAgICAvLyByZXR1cm4gc3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIC8qKlRFTVBPUkFSWSBJTVBMRU1FTlRBVElPTiAqL1xyXG4gIH1cclxufVxyXG4iXX0=