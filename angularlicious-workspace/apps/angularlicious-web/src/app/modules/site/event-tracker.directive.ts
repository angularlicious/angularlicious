import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[eventTracker]'
})
export class EventTrackerDirective {
  @Input('eventTracker') eventTracker: any;

  constructor() {}

  @HostListener('click', ['$event'])
  onClick($event) {
    this.sendEvent();
  }

  sendEvent() {
    // ga('send', 'event', 'Cards', 'Click');
    (<any>window).ga('send', 'event', {
      eventCategory: this.eventTracker.category,
      eventAction: this.eventTracker.action,
      eventLabel: this.eventTracker.label,
      eventValue: this.eventTracker.value
    });
  }
}
