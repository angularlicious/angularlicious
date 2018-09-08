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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcmxpY2lvdXMtY29yZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0Bhbmd1bGFybGljaW91cy9jb3JlL2xpYi9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIm5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvbGliL2J1aWxkLW1vdGlvbi1jb3JlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFsZXJ0Tm90aWZpY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXJsaWNpb3VzL2ZvdW5kYXRpb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhbmd1bGFybGljaW91cy1hbGVydCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiaGFzTWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQge3thbGVydE5vdGlmaWNhdGlvbi50eXBlfX1cIiByb2xlPVwiYWxlcnRcIj5cclxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnQtaWNvblwiPlxyXG4gICAgICA8aSBjbGFzcz1cIm5vdy11aS1pY29ucyB1aS0xX2JlbGwtNTNcIj48L2k+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxzdHJvbmc+e3thbGVydE5vdGlmaWNhdGlvbi5oZWFkZXJ9fTwvc3Ryb25nPiA6OiB7e2FsZXJ0Tm90aWZpY2F0aW9uLnRpdGxlfX1cclxuICAgIDx1bD5cclxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBtZXNzYWdlIG9mIGFsZXJ0Tm90aWZpY2F0aW9uLm1lc3NhZ2VzXCI+e3ttZXNzYWdlfX08L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2UgXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cclxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdWktMV9zaW1wbGUtcmVtb3ZlXCI+PC9pPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFsZXJ0Tm90aWZpY2F0aW9uOiBBbGVydE5vdGlmaWNhdGlvbiA9IG5ldyBBbGVydE5vdGlmaWNhdGlvbignJywgJycpO1xyXG4gIC8vIEBJbnB1dCgpIHNldCBzaG93QWxlcnQoc2hvd0FsZXJ0OiBib29sZWFuKXt0aGlzLmhhc01lc3NhZ2UgPSBzaG93QWxlcnQgfHwgZmFsc2U7IH07XHJcbiAgQElucHV0KCkgaGFzTWVzc2FnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgTk9fRVJST1JTX1NDSEVNQSxcclxuICBDVVNUT01fRUxFTUVOVFNfU0NIRU1BXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQnO1xyXG5cclxuLyoqXHJcbiAqIEVSUk9SIGluIDogUHJvcGVydHkgYmluZGluZyBuZ0Zvck9mIG5vdCB1c2VkIGJ5IGFueSBkaXJlY3RpdmUgb24gYW5cclxuICogZW1iZWRkZWQgdGVtcGxhdGUuIE1ha2Ugc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSBuYW1lIGlzIHNwZWxsZWQgY29ycmVjdGx5XHJcbiAqIGFuZCBhbGwgZGlyZWN0aXZlcyBhcmUgbGlzdGVkIGluIHRoZSBcIkBOZ01vZHVsZS5kZWNsYXJhdGlvbnNcIi5cclxuICpcclxuICogU09MVVRJT046IEFERCBUSEUgW0NvbW1vbk1vZHVsZV0gdG8gdGhlIGltcG9ydHMgc2VjdGlvbiBvZiB0aGUgbW9kdWxlO1xyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBbGVydENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0FsZXJ0Q29tcG9uZW50XSxcclxuICBzY2hlbWFzOiBbTk9fRVJST1JTX1NDSEVNQSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJsaWNpb3VzQ29yZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiQWxlcnROb3RpZmljYXRpb24iLCJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiTk9fRVJST1JTX1NDSEVNQSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQTJCRTtxQ0FIZ0QsSUFBSUEsNEJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7OEJBRTlDLEtBQUs7U0FDcEI7Ozs7UUFFaEIsaUNBQVE7OztZQUFSLGVBQWE7O29CQXpCZEMsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxzQkFBc0I7d0JBQ2hDLFFBQVEsRUFBRSxtbkJBZUw7cUJBQ047Ozs7OzBDQUVFQyxVQUFLO21DQUVMQSxVQUFLOzs2QkExQlI7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7b0JBaUJDQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1CQUFZLENBQUM7d0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQzt3QkFDOUIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO3dCQUN6QixPQUFPLEVBQUUsQ0FBQ0MscUJBQWdCLEVBQUVDLDJCQUFzQixDQUFDO3FCQUNwRDs7dUNBdEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=