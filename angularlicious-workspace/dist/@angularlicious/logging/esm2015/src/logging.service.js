/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class AngularliciousLoggingService {
    constructor() {
        this.applicationName = 'Angularlicio.us';
        this.serviceName = 'LoggingService';
    }
    /**
     * Use this method to send a log message with severity and source information
     * to the application's logger.
     *
     * If the application environment mode is [Production], the information will
     * be sent to a centralized repository.
     *
     * @param {?} source
     * @param {?} severity
     * @param {?} message
     * @return {?}
     */
    log(source, severity, message) {
        this.source = `${this.applicationName}.${source}`;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date();
        const /** @type {?} */ msg = `${this.message}`;
        // todo: add switch based on the severity to:
        // console.info
        // console.warn
        // console.error
        // console.log
        console.log(`${this.severity} from ${this.source}: ${msg} (${this.timestamp})`);
    }
}
AngularliciousLoggingService.decorators = [
    { type: Injectable },
];
function AngularliciousLoggingService_tsickle_Closure_declarations() {
    /** @type {?} */
    AngularliciousLoggingService.prototype.applicationName;
    /** @type {?} */
    AngularliciousLoggingService.prototype.serviceName;
    /** @type {?} */
    AngularliciousLoggingService.prototype.source;
    /** @type {?} */
    AngularliciousLoggingService.prototype.severity;
    /** @type {?} */
    AngularliciousLoggingService.prototype.message;
    /** @type {?} */
    AngularliciousLoggingService.prototype.timestamp;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2luZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2xvZ2dpbmcvIiwic291cmNlcyI6WyJzcmMvbG9nZ2luZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBTXJELE1BQU07OytCQUNjLGlCQUFpQjsyQkFDckIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7OztJQThCOUIsR0FBRyxDQUFDLE1BQWMsRUFBRSxRQUFrQixFQUFFLE9BQWU7UUFDckQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksTUFBTSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRTVCLHVCQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7O1FBTzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsR0FBRyxJQUFJLENBQUMsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FDbkUsQ0FBQztLQUNIOzs7WUFqREYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBsb2dnaW5nU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbG9nZ2luZy5zZXJ2aWNlLmNvbmZpZyc7XHJcbmltcG9ydCB7IFNldmVyaXR5IH0gZnJvbSAnLi9zZXZlcml0eS5lbnVtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzTG9nZ2luZ1NlcnZpY2Uge1xyXG4gIGFwcGxpY2F0aW9uTmFtZSA9ICdBbmd1bGFybGljaW8udXMnO1xyXG4gIHNlcnZpY2VOYW1lID0gJ0xvZ2dpbmdTZXJ2aWNlJztcclxuICBzb3VyY2U6IHN0cmluZztcclxuICBzZXZlcml0eTogU2V2ZXJpdHk7XHJcbiAgbWVzc2FnZTogc3RyaW5nO1xyXG4gIHRpbWVzdGFtcDogRGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIFtMb2dnaW5nU2VydmljZV0gY29uc3RydWN0b3IuXHJcbiAgICovXHJcbiAgLy8gY29uc3RydWN0b3IoXHJcbiAgLy8gICAgIC8vIEBPcHRpb25hbCgpIHByaXZhdGUgY29uZmlnOiBsb2dnaW5nU2VydmljZUNvbmZpZ1xyXG4gIC8vICAgICBhcHBsaWNhdGlvbk5hbWU6IHN0cmluZ1xyXG4gIC8vICkge1xyXG4gIC8vICAgICB0aGlzLmxvZyh0aGlzLnNlcnZpY2VOYW1lLCBTZXZlcml0eS5JbmZvcm1hdGlvbiwgYFN0YXJ0aW5nIGxvZ2dpbmcgc2VydmljZSBhdDogJHt0aGlzLnRpbWVzdGFtcH1gKTtcclxuICAvLyAgICAgaWYoYXBwbGljYXRpb25OYW1lKSB7XHJcbiAgLy8gICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTmFtZSA9IGFwcGxpY2F0aW9uTmFtZTtcclxuICAvLyAgICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHRvIHNlbmQgYSBsb2cgbWVzc2FnZSB3aXRoIHNldmVyaXR5IGFuZCBzb3VyY2UgaW5mb3JtYXRpb25cclxuICAgKiB0byB0aGUgYXBwbGljYXRpb24ncyBsb2dnZXIuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgYXBwbGljYXRpb24gZW52aXJvbm1lbnQgbW9kZSBpcyBbUHJvZHVjdGlvbl0sIHRoZSBpbmZvcm1hdGlvbiB3aWxsXHJcbiAgICogYmUgc2VudCB0byBhIGNlbnRyYWxpemVkIHJlcG9zaXRvcnkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gc291cmNlXHJcbiAgICogQHBhcmFtIHNldmVyaXR5XHJcbiAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgKi9cclxuICBsb2coc291cmNlOiBzdHJpbmcsIHNldmVyaXR5OiBTZXZlcml0eSwgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNvdXJjZSA9IGAke3RoaXMuYXBwbGljYXRpb25OYW1lfS4ke3NvdXJjZX1gO1xyXG4gICAgdGhpcy5zZXZlcml0eSA9IHNldmVyaXR5O1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMudGltZXN0YW1wID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICBjb25zdCBtc2cgPSBgJHt0aGlzLm1lc3NhZ2V9YDtcclxuXHJcbiAgICAvLyB0b2RvOiBhZGQgc3dpdGNoIGJhc2VkIG9uIHRoZSBzZXZlcml0eSB0bzpcclxuICAgIC8vIGNvbnNvbGUuaW5mb1xyXG4gICAgLy8gY29uc29sZS53YXJuXHJcbiAgICAvLyBjb25zb2xlLmVycm9yXHJcbiAgICAvLyBjb25zb2xlLmxvZ1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGAke3RoaXMuc2V2ZXJpdHl9IGZyb20gJHt0aGlzLnNvdXJjZX06ICR7bXNnfSAoJHt0aGlzLnRpbWVzdGFtcH0pYFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19