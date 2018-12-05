(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angularlicious/foundation')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/core', ['exports', '@angular/common', '@angular/core', '@angularlicious/foundation'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.core = {}),global.ng.common,global.ng.core,global.foundation));
}(this, (function (exports,common,core,foundation) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AlertComponent = /** @class */ (function () {
        function AlertComponent() {
            this.alertNotification = new foundation.AlertNotification('', '');
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
            { type: core.Component, args: [{
                        selector: 'angularlicious-alert',
                        template: "<div *ngIf=\"hasMessage\" class=\"alert {{alertNotification.type}}\" role=\"alert\">\n  <div class=\"container\">\n    <div class=\"alert-icon\">\n      <i class=\"now-ui-icons ui-1_bell-53\"></i>\n    </div>\n    <strong>{{alertNotification.header}}</strong> :: {{alertNotification.title}}\n    <ul>\n      <li *ngFor=\"let message of alertNotification.messages\">{{message}}</li>\n    </ul>\n    <button type=\"button\" class=\"close \" data-dismiss=\"alert\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">\n        <i class=\"now-ui-icons ui-1_simple-remove\"></i>\n      </span>\n    </button>\n  </div>\n</div>"
                    }] }
        ];
        /** @nocollapse */
        AlertComponent.ctorParameters = function () { return []; };
        AlertComponent.propDecorators = {
            alertNotification: [{ type: core.Input }],
            hasMessage: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [AlertComponent],
                        exports: [AlertComponent],
                        schemas: [core.NO_ERRORS_SCHEMA, core.CUSTOM_ELEMENTS_SCHEMA]
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

    exports.AngularliciousCoreModule = AngularliciousCoreModule;
    exports.AlertComponent = AlertComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angularlicious-core.umd.js.map