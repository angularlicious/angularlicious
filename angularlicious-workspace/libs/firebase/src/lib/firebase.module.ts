import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseOptions = {
  apiKey: "AIzaSyDirRCd-S_2G9upW1dOAGSnisVLxY2ewFM",
  authDomain: "angularlicious-auth.firebaseapp.com",
  databaseURL: "https://angularlicious-auth.firebaseio.com",
  projectId: "angularlicious-auth",
  storageBucket: "angularlicious-auth.appspot.com",
  messagingSenderId: "104315615877"
}

export const firebaseRoutes: Route[] = [];
@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ]
})
export class FirebaseModule {}
