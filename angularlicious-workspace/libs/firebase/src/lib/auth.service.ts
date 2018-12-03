import { Injectable, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Subject, ReplaySubject } from 'rxjs';
import { ServiceBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceBase {
  private user: User;
  user$: Subject<User> = new ReplaySubject<User>(1);

  constructor(
    loggingService: AngularliciousLoggingService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    super(loggingService);
    this.serviceName = 'AuthService';

    this.initializeFirebase();

    auth.authState.subscribe(
      authState => this.handleAuthState(authState),
      error => console.log(error)
    );
  }

  initializeFirebase() {
  }

  handleAuthState(authState: firebase.User): void {
    if (authState) {
      this.firestore.doc<firebase.User>(`users/${authState.uid}`).valueChanges().subscribe(
        user => this.handleUserValueChanges(user),
        error => this.handleError(error),
        () => `Finished handling user changes.`
      );
    }
  }

  handleUserValueChanges(user: firebase.User) {
    if (user) {
      this.user = user;
      this.user$.next(this.user);
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    from(this.auth.auth.signInWithPopup(provider)).subscribe(
      credential => this.handleSignInResponse(credential),
      error => this.handleError(error),
      () => this.loggingService.log(this.serviceName, Severity.Information, `Finished handling response from ${provider} provider.`)
    );
  }

  private updateUser(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      providerId: user.providerId,
      isAnonymous: user.isAnonymous,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
    }

    userRef.set(data);
  }

  private handleSignInResponse(credential) {
    if (credential) {
      try {
        this.updateUser(credential.user);
      } catch (error) {
        this.loggingService.log(this.serviceName, Severity.Error, `handleSignInResponse: ${error}`);
        this.handleError(error);
      }
    }
  }
}
