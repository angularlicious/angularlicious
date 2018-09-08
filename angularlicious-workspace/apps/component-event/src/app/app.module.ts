import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { EventSourceComponent } from './event-source/event-source.component';

@NgModule({
  declarations: [AppComponent, EventSourceComponent],
  imports: [BrowserModule, NxModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
