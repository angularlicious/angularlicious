import { Component, Input, OnInit } from '@angular/core';

import { AlertNotification } from '@angularlicious/foundation';

@Component({
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
})
export class AlertComponent implements OnInit {
  @Input() alertNotification: AlertNotification = new AlertNotification('', '');
  // @Input() set showAlert(showAlert: boolean){this.hasMessage = showAlert || false; };
  @Input() hasMessage: boolean = false;
  constructor() {}

  ngOnInit() {}
}
