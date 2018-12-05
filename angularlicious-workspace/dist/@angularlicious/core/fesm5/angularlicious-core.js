import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertNotification } from '@angularlicious/foundation';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                }] }
    ];
    /** @nocollapse */
    AlertComponent.ctorParameters = function () { return []; };
    AlertComponent.propDecorators = {
        alertNotification: [{ type: Input }],
        hasMessage: [{ type: Input }]
    };
    return AlertComponent;
}());

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
var AngularliciousCoreModule = /** @class */ (function () {
    function AngularliciousCoreModule() {
    }
    AngularliciousCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [AlertComponent],
                    exports: [AlertComponent],
                    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
                },] }
    ];
    return AngularliciousCoreModule;
}());

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