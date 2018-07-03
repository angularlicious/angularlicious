/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AlertNotification } from '@angularlicious/foundation';
export class AlertComponent {
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
function AlertComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AlertComponent.prototype.alertNotification;
    /** @type {?} */
    AlertComponent.prototype.hasMessage;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXJsaWNpb3VzL2NvcmUvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50cy9hbGVydC9hbGVydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBcUIvRCxNQUFNO0lBSUo7aUNBSGdELElBQUksaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7MEJBRTlDLEtBQUs7S0FDcEI7Ozs7SUFFaEIsUUFBUSxNQUFLOzs7WUF6QmQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O09BZUw7YUFDTjs7Ozs7Z0NBRUUsS0FBSzt5QkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbGVydE5vdGlmaWNhdGlvbiB9IGZyb20gJ0Bhbmd1bGFybGljaW91cy9mb3VuZGF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYW5ndWxhcmxpY2lvdXMtYWxlcnQnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cImhhc01lc3NhZ2VcIiBjbGFzcz1cImFsZXJ0IHt7YWxlcnROb3RpZmljYXRpb24udHlwZX19XCIgcm9sZT1cImFsZXJ0XCI+XHJcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImFsZXJ0LWljb25cIj5cclxuICAgICAgPGkgY2xhc3M9XCJub3ctdWktaWNvbnMgdWktMV9iZWxsLTUzXCI+PC9pPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8c3Ryb25nPnt7YWxlcnROb3RpZmljYXRpb24uaGVhZGVyfX08L3N0cm9uZz4gOjoge3thbGVydE5vdGlmaWNhdGlvbi50aXRsZX19XHJcbiAgICA8dWw+XHJcbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbWVzc2FnZSBvZiBhbGVydE5vdGlmaWNhdGlvbi5tZXNzYWdlc1wiPnt7bWVzc2FnZX19PC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlIFwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XHJcbiAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwibm93LXVpLWljb25zIHVpLTFfc2ltcGxlLXJlbW92ZVwiPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhbGVydE5vdGlmaWNhdGlvbjogQWxlcnROb3RpZmljYXRpb24gPSBuZXcgQWxlcnROb3RpZmljYXRpb24oJycsICcnKTtcclxuICAvLyBASW5wdXQoKSBzZXQgc2hvd0FsZXJ0KHNob3dBbGVydDogYm9vbGVhbil7dGhpcy5oYXNNZXNzYWdlID0gc2hvd0FsZXJ0IHx8IGZhbHNlOyB9O1xyXG4gIEBJbnB1dCgpIGhhc01lc3NhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxufVxyXG4iXX0=