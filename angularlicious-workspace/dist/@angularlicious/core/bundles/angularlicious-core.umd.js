(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angularlicious/foundation'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@angularlicious/core', ['exports', '@angular/core', '@angularlicious/foundation', '@angular/common'], factory) :
    (factory((global.angularlicious = global.angularlicious || {}, global.angularlicious.core = {}),global.ng.core,null,global.ng.common));
}(this, (function (exports,core,foundation,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AlertComponent = (function () {
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
                    },] },
        ];
        /** @nocollapse */
        AlertComponent.ctorParameters = function () { return []; };
        AlertComponent.propDecorators = {
            "alertNotification": [{ type: core.Input },],
            "hasMessage": [{ type: core.Input },],
        };
        return AlertComponent;
    }());

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
    var AngularliciousCoreModule = (function () {
        function AngularliciousCoreModule() {
        }
        AngularliciousCoreModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [AlertComponent],
                        exports: [AlertComponent],
                        schemas: [core.NO_ERRORS_SCHEMA, core.CUSTOM_ELEMENTS_SCHEMA]
                    },] },
        ];
        return AngularliciousCoreModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.AngularliciousCoreModule = AngularliciousCoreModule;
    exports.AlertComponent = AlertComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9jb3JlL2xpYi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvbGliL2J1aWxkLW1vdGlvbi1jb3JlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWxlcnROb3RpZmljYXRpb24gfSBmcm9tICdAYW5ndWxhcmxpY2lvdXMvZm91bmRhdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FuZ3VsYXJsaWNpb3VzLWFsZXJ0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiaGFzTWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQge3thbGVydE5vdGlmaWNhdGlvbi50eXBlfX1cIiByb2xlPVwiYWxlcnRcIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJhbGVydC1pY29uXCI+XG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2JlbGwtNTNcIj48L2k+XG4gICAgPC9kaXY+XG4gICAgPHN0cm9uZz57e2FsZXJ0Tm90aWZpY2F0aW9uLmhlYWRlcn19PC9zdHJvbmc+IDo6IHt7YWxlcnROb3RpZmljYXRpb24udGl0bGV9fVxuICAgIDx1bD5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbWVzc2FnZSBvZiBhbGVydE5vdGlmaWNhdGlvbi5tZXNzYWdlc1wiPnt7bWVzc2FnZX19PC9saT5cbiAgICA8L3VsPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2UgXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX3NpbXBsZS1yZW1vdmVcIj48L2k+XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBBbGVydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xuICAvLyBASW5wdXQoKSBzZXQgc2hvd0FsZXJ0KHNob3dBbGVydDogYm9vbGVhbil7dGhpcy5oYXNNZXNzYWdlID0gc2hvd0FsZXJ0IHx8IGZhbHNlOyB9O1xuICBASW5wdXQoKSBoYXNNZXNzYWdlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG59XG4iLCJpbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgTk9fRVJST1JTX1NDSEVNQSxcbiAgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQnO1xuXG4vKipcbiAqIEVSUk9SIGluIDogUHJvcGVydHkgYmluZGluZyBuZ0Zvck9mIG5vdCB1c2VkIGJ5IGFueSBkaXJlY3RpdmUgb24gYW5cbiAqIGVtYmVkZGVkIHRlbXBsYXRlLiBNYWtlIHN1cmUgdGhhdCB0aGUgcHJvcGVydHkgbmFtZSBpcyBzcGVsbGVkIGNvcnJlY3RseVxuICogYW5kIGFsbCBkaXJlY3RpdmVzIGFyZSBsaXN0ZWQgaW4gdGhlIFwiQE5nTW9kdWxlLmRlY2xhcmF0aW9uc1wiLlxuICpcbiAqIFNPTFVUSU9OOiBBREQgVEhFIFtDb21tb25Nb2R1bGVdIHRvIHRoZSBpbXBvcnRzIHNlY3Rpb24gb2YgdGhlIG1vZHVsZTtcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0FsZXJ0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0FsZXJ0Q29tcG9uZW50XSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUEsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIkFsZXJ0Tm90aWZpY2F0aW9uIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIk5PX0VSUk9SU19TQ0hFTUEiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUEyQkU7cUNBSGdELElBQUlBLDRCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7OzhCQUU5QyxLQUFLO1NBQ3BCOzs7O1FBRWhCLGlDQUFROzs7WUFBUixlQUFhOztvQkF6QmRDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsc0JBQXNCO3dCQUNoQyxRQUFRLEVBQUUsbW5CQWVMO3FCQUNOOzs7OzswQ0FFRUMsVUFBSzttQ0FFTEEsVUFBSzs7NkJBMUJSOzs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O29CQWlCQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3dCQUN2QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7d0JBQzlCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQzt3QkFDekIsT0FBTyxFQUFFLENBQUNDLHFCQUFnQixFQUFFQywyQkFBc0IsQ0FBQztxQkFDcEQ7O3VDQXRCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9