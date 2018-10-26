import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire'

const firebaseOptions = {
  apiKey: "AIzaSyDirRCd-S_2G9upW1dOAGSnisVLxY2ewFM",
  authDomain: "angularlicious-auth.firebaseapp.com",
  databaseURL: "https://angularlicious-auth.firebaseio.com",
  projectId: "angularlicious-auth",
  storageBucket: "angularlicious-auth.appspot.com",
  messagingSenderId: "104315615877"
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    AngularFireModule.initializeApp(firebaseOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
