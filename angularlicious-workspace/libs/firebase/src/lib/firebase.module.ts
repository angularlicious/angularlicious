import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularliciousLoggingModule } from '@angularlicious/logging';
import { AngularliciousFoundationModule } from '@angularlicious/foundation';

export const firebaseRoutes: Route[] = [];

const firebaseOptions = {
 
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // AngularFireModule.initializeApp(window['firebase-config']),
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularliciousLoggingModule,
    AngularliciousFoundationModule
  ],
  providers: [
  ]
})
export class FirebaseModule {
  // static forRoot(optionsToken: FirebaseOptions): ModuleWithProviders {
  //   return {
  //     ngModule: FirebaseModule,
  //     providers: [
  //       {
  //         provide: FirebaseOptionsToken,
  //         useValue: optionsToken
  //       },
  //     ]
  //   };
  // }
}
