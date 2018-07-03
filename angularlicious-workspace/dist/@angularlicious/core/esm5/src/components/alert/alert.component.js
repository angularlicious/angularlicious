/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AlertNotification } from '@angularlicious/foundation';
var AlertComponent = /** @class */ (function () {
    function AlertComponent() {
        this.alertNotification = new AlertNotification('', '');
        // @Input() set showAlert(showAlert: boolean){this.hasMessage = showAlert || false; };
        this.hasMessage = false;
    }
    /**
     * @return {?}
     */
    AlertComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    AlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'angularlicious-alert',
                    template: "<div *ngIf=\"hasMessage\" class=\"alert {{alertNotification.type}}\" role=\"alert\">\n  <div class=\"container\">\n    <div class=\"alert-icon\">\n      <i class=\"now-ui-icons ui-1_bell-53\"></i>\n    </div>\n    <strong>{{alertNotification.header}}</strong> :: {{alertNotification.title}}\n    <ul>\n      <li *ngFor=\"let message of alertNotification.messages\">{{message}}</li>\n    </ul>\n    <button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">\n        <i class=\"now-ui-icons ui-1_simple-remove\"></i>\n      </span>\n    </button>\n  </div>\n</div>"
                },] },
    ];
    /** @nocollapse */
    AlertComponent.ctorParameters = function () { return []; };
    AlertComponent.propDecorators = {
        alertNotification: [{ type: Input }],
        hasMessage: [{ type: Input }]
    };
    return AlertComponent;
}());
export { AlertComponent };
function AlertComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AlertComponent.prototype.alertNotification;
    /** @type {?} */
    AlertComponent.prototype.hasMessage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztJQXlCN0Q7aUNBSGdELElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MEJBRTlDLEtBQUs7S0FDcEI7Ozs7SUFFaEIsaUNBQVE7OztJQUFSLGVBQWE7O2dCQXpCZCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG1uQkFlTDtpQkFDTjs7Ozs7b0NBRUUsS0FBSzs2QkFFTCxLQUFLOzt5QkExQlI7O1NBdUJhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFsZXJ0Tm90aWZpY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhbmd1bGFybGljaW91cy1hbGVydCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiaGFzTWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQge3thbGVydE5vdGlmaWNhdGlvbi50eXBlfX1cIiByb2xlPVwiYWxlcnRcIj5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQtaWNvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2JlbGwtNTNcIj48L2k+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxzdHJvbmc+e3thbGVydE5vdGlmaWNhdGlvbi5oZWFkZXJ9fTwvc3Ryb25nPiA6OiB7e2FsZXJ0Tm90aWZpY2F0aW9uLnRpdGxlfX1cclxuICAgIDx1bD5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBtZXNzYWdlIG9mIGFsZXJ0Tm90aWZpY2F0aW9uLm1lc3NhZ2VzXCI+e3ttZXNzYWdlfX08L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2UgXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdWktMV9zaW1wbGUtcmVtb3ZlXCI+PC9pPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG4gIC8vIEBJbnB1dCgpIHNldCBzaG93QWxlcnQoc2hvd0FsZXJ0OiBib29sZWFuKXt0aGlzLmhhc01lc3NhZ2UgPSBzaG93QWxlcnQgfHwgZmFsc2U7IH07XHJcbiAgQElucHV0KCkgaGFzTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG59XHJcbiJdfQ==