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
    "alertNotification": [{ type: Input },],
    "hasMessage": [{ type: Input },],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvbGliL2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuY29tcG9uZW50LnRzIiwibmc6Ly9AYW5ndWxhcmxpY2lvdXMvY29yZS9saWIvYnVpbGQtbW90aW9uLWNvcmUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcmxpY2lvdXMtYWxlcnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlXCIgY2xhc3M9XCJhbGVydCB7e2FsZXJ0Tm90aWZpY2F0aW9uLnR5cGV9fVwiIHJvbGU9XCJhbGVydFwiPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFsZXJ0LWljb25cIj5cbiAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfYmVsbC01M1wiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8c3Ryb25nPnt7YWxlcnROb3RpZmljYXRpb24uaGVhZGVyfX08L3N0cm9uZz4gOjoge3thbGVydE5vdGlmaWNhdGlvbi50aXRsZX19XG4gICAgPHVsPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBtZXNzYWdlIG9mIGFsZXJ0Tm90aWZpY2F0aW9uLm1lc3NhZ2VzXCI+e3ttZXNzYWdlfX08L2xpPlxuICAgIDwvdWw+XG4gICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfc2ltcGxlLXJlbW92ZVwiPjwvaT5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWxlcnROb3RpZmljYXRpb246IEFsZXJ0Tm90aWZpY2F0aW9uID0gbmV3IEFsZXJ0Tm90aWZpY2F0aW9uKCcnLCAnJyk7XG4gIC8vIEBJbnB1dCgpIHNldCBzaG93QWxlcnQoc2hvd0FsZXJ0OiBib29sZWFuKXt0aGlzLmhhc01lc3NhZ2UgPSBzaG93QWxlcnQgfHwgZmFsc2U7IH07XG4gIEBJbnB1dCgpIGhhc01lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cbn1cbiIsImltcG9ydCB7XG4gIE5nTW9kdWxlLFxuICBOT19FUlJPUlNfU0NIRU1BLFxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogRVJST1IgaW4gOiBQcm9wZXJ0eSBiaW5kaW5nIG5nRm9yT2Ygbm90IHVzZWQgYnkgYW55IGRpcmVjdGl2ZSBvbiBhblxuICogZW1iZWRkZWQgdGVtcGxhdGUuIE1ha2Ugc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSBuYW1lIGlzIHNwZWxsZWQgY29ycmVjdGx5XG4gKiBhbmQgYWxsIGRpcmVjdGl2ZXMgYXJlIGxpc3RlZCBpbiB0aGUgXCJATmdNb2R1bGUuZGVjbGFyYXRpb25zXCIuXG4gKlxuICogU09MVVRJT046IEFERCBUSEUgW0NvbW1vbk1vZHVsZV0gdG8gdGhlIGltcG9ydHMgc2VjdGlvbiBvZiB0aGUgbW9kdWxlO1xuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQWxlcnRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWxlcnRDb21wb25lbnRdLFxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcmxpY2lvdXNDb3JlTW9kdWxlIHt9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQTJCRTtpQ0FIZ0QsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDOzswQkFFOUMsS0FBSztLQUNwQjs7OztJQUVoQixRQUFRLE1BQUs7OztZQXpCZCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7T0FlTDthQUNOOzs7OztrQ0FFRSxLQUFLOzJCQUVMLEtBQUs7Ozs7Ozs7QUMxQlI7Ozs7Ozs7QUF1QkE7OztZQU5DLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQzthQUNwRDs7Ozs7Ozs7Ozs7Ozs7OyJ9