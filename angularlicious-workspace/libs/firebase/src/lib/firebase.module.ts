import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularliciousLoggingModule } from '@angularlicious/logging';
import { AngularliciousFoundationModule } from '@angularlicious/foundation';

export const firebaseRoutes: Route[] = [];

const firebaseOptions = {
  apiKey: 'AIzaSyCBh0mZ95iKKx2Jt_f4bVEChUWWXw26ulw',
  authDomain: 'angularlicious.firebaseapp.com',
  databaseURL: 'https://angularlicious.firebaseio.com',
  projectId: 'angularlicious',
  storageBucket: 'angularlicious.appspot.com',
  messagingSenderId: '296251746847'
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularliciousLoggingModule,
    AngularliciousFoundationModule
  ],
  providers: []
})
export class FirebaseModule {}
