import { Component, Input, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertNotification } from '@angularlicious/foundation';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AlertComponent {
    constructor() {
        this.alertNotification = new AlertNotification('', '');
        // @Input() set showAlert(showAlert: boolean){this.hasMessage = showAlert || false; };
        this.hasMessage = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'angularlicious-alert',
                template: `<div *ngIf="hasMessage" class="alert {{alertNotification.type}}" role="alert">
  <div class="container">
    <div class="alert-icon">
      <i class="now-ui-icons ui-1_bell-53"></i>
    </div>
    <strong>{{alertNotification.header}}</strong> :: {{alertNotification.title}}
    <ul>
      <li *ngFor="let message of alertNotification.messages">{{message}}</li>
    </ul>
    <button type="button" class="close " data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">
        <i class="now-ui-icons ui-1_simple-remove"></i>
      </span>
    </button>
  </div>
</div>`
            },] },
];
/** @nocollapse */
AlertComponent.ctorParameters = () => [];
AlertComponent.propDecorators = {
    alertNotification: [{ type: Input }],
    hasMessage: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * ERROR in : Property binding ngForOf not used by any directive on an
 * embedded template. Make sure that the property name is spelled correctly
 * and all directives are listed in the "\@NgModule.declarations".
 *
 * SOLUTION: ADD THE [CommonModule] to the imports section of the module;
 */
class AngularliciousCoreModule {
}
AngularliciousCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [AlertComponent],
                exports: [AlertComponent],
                schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { AngularliciousCoreModule, AlertComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvc3JjL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvY29yZS9zcmMvYnVpbGQtbW90aW9uLWNvcmUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQWxlcnROb3RpZmljYXRpb24gfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FuZ3VsYXJsaWNpb3VzLWFsZXJ0JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlXCIgY2xhc3M9XCJhbGVydCB7e2FsZXJ0Tm90aWZpY2F0aW9uLnR5cGV9fVwiIHJvbGU9XCJhbGVydFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJhbGVydC1pY29uXCI+XHJcbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfYmVsbC01M1wiPjwvaT5cclxuICAgIDwvZGl2PlxyXG4gICAgPHN0cm9uZz57e2FsZXJ0Tm90aWZpY2F0aW9uLmhlYWRlcn19PC9zdHJvbmc+IDo6IHt7YWxlcnROb3RpZmljYXRpb24udGl0bGV9fVxyXG4gICAgPHVsPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IG1lc3NhZ2Ugb2YgYWxlcnROb3RpZmljYXRpb24ubWVzc2FnZXNcIj57e21lc3NhZ2V9fTwvbGk+XHJcbiAgICA8L3VsPlxyXG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxyXG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX3NpbXBsZS1yZW1vdmVcIj48L2k+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbGVydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYWxlcnROb3RpZmljYXRpb246IEFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XHJcbiAgLy8gQElucHV0KCkgc2V0IHNob3dBbGVydChzaG93QWxlcnQ6IGJvb2xlYW4pe3RoaXMuaGFzTWVzc2FnZSA9IHNob3dBbGVydCB8fCBmYWxzZTsgfTtcclxuICBASW5wdXQoKSBoYXNNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBOZ01vZHVsZSxcclxuICBOT19FUlJPUlNfU0NIRU1BLFxyXG4gIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogRVJST1IgaW4gOiBQcm9wZXJ0eSBiaW5kaW5nIG5nRm9yT2Ygbm90IHVzZWQgYnkgYW55IGRpcmVjdGl2ZSBvbiBhblxyXG4gKiBlbWJlZGRlZCB0ZW1wbGF0ZS4gTWFrZSBzdXJlIHRoYXQgdGhlIHByb3BlcnR5IG5hbWUgaXMgc3BlbGxlZCBjb3JyZWN0bHlcclxuICogYW5kIGFsbCBkaXJlY3RpdmVzIGFyZSBsaXN0ZWQgaW4gdGhlIFwiQE5nTW9kdWxlLmRlY2xhcmF0aW9uc1wiLlxyXG4gKlxyXG4gKiBTT0xVVElPTjogQUREIFRIRSBbQ29tbW9uTW9kdWxlXSB0byB0aGUgaW1wb3J0cyBzZWN0aW9uIG9mIHRoZSBtb2R1bGU7XHJcbiAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0FsZXJ0Q29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQWxlcnRDb21wb25lbnRdLFxyXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0lBMkJFO2lDQUhnRCxJQUFJLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzBCQUU5QyxLQUFLO0tBQ3BCOzs7O0lBRWhCLFFBQVEsTUFBSzs7O1lBekJkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztPQWVMO2FBQ047Ozs7O2dDQUVFLEtBQUs7eUJBRUwsS0FBSzs7Ozs7OztBQzFCUjs7Ozs7OztBQXVCQTs7O1lBTkMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixDQUFDO2FBQ3BEOzs7Ozs7Ozs7Ozs7Ozs7In0=