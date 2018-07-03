/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AlertTypes } from './alert-types.constants';
var AlertNotification = /** @class */ (function () {
    function AlertNotification(header, title, messages, type) {
        this.type = AlertTypes.Information;
        this.messages = new Array();
        this.showAlert = false;
        if (type) {
            this.type = type;
        }
        this.header = header;
        this.title = title;
        if (messages) {
            this.messages = messages;
        }
        if (this.header && this.title) {
            this.showAlert = true; // used to trigger the display of the notification.
        }
    }
    return AlertNotification;
}());
export { AlertNotification };
function AlertNotification_tsickle_Closure_declarations() {
    /** @type {?} */
    AlertNotification.prototype.type;
    /** @type {?} */
    AlertNotification.prototype.header;
    /** @type {?} */
    AlertNotification.prototype.title;
    /** @type {?} */
    AlertNotification.prototype.messages;
    /** @type {?} */
    AlertNotification.prototype.showAlert;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbm90aWZpY2F0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24vIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL2FsZXJ0LW5vdGlmaWNhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXJELElBQUE7SUFPRSwyQkFDRSxNQUFjLEVBQ2QsS0FBYSxFQUNiLFFBQXdCLEVBQ3hCLElBQWE7b0JBVkEsVUFBVSxDQUFDLFdBQVc7d0JBR1gsSUFBSSxLQUFLLEVBQVU7eUJBQ2pDLEtBQUs7UUFRZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7U0FDMUI7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0tBQ0Y7NEJBNUJIO0lBNkJDLENBQUE7QUEzQkQsNkJBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWxlcnRUeXBlcyB9IGZyb20gJy4vYWxlcnQtdHlwZXMuY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBBbGVydE5vdGlmaWNhdGlvbiB7XHJcbiAgdHlwZTogc3RyaW5nID0gQWxlcnRUeXBlcy5JbmZvcm1hdGlvbjsgLy8gYWxlcnQtd2FybmluZywgYWxlcnQtc3VjY2VzcywgYWxlcnQtaW5mbywgYWxlcnQtZGFuZ2VyXHJcbiAgaGVhZGVyOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBtZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgc2hvd0FsZXJ0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgaGVhZGVyOiBzdHJpbmcsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZXM/OiBBcnJheTxzdHJpbmc+LFxyXG4gICAgdHlwZT86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgaWYgKHR5cGUpIHtcclxuICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIGlmIChtZXNzYWdlcykge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMudGl0bGUpIHtcclxuICAgICAgdGhpcy5zaG93QWxlcnQgPSB0cnVlOyAvLyB1c2VkIHRvIHRyaWdnZXIgdGhlIGRpc3BsYXkgb2YgdGhlIG5vdGlmaWNhdGlvbi5cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19