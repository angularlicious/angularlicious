import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertNotification } from '@angularlicious/foundation';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            }] }
];
/** @nocollapse */
AlertComponent.ctorParameters = () => [];
AlertComponent.propDecorators = {
    alertNotification: [{ type: Input }],
    hasMessage: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AngularliciousCoreModule, AlertComponent };

//# sourceMappingURL=angularlicious-core.js.map