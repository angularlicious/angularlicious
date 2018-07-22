import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteModule } from '../site/site.module';
import { SharedModule } from '../shared/shared.module';

import { AngularliciousEventsComponent } from './angularlicious-events/angularlicious-events.component';

@NgModule({
  imports: [CommonModule, SharedModule, SiteModule],
  declarations: [AngularliciousEventsComponent],
  exports: [AngularliciousEventsComponent]
})
export class EventsModule {}
