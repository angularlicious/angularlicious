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
  isAuthenticated: boolean;

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
      this.isAuthenticated = true;
      this.user$.next(this.user);
    } else {
      this.user = null;
      this.isAuthenticated = false;
      this.user$.next(this.user);
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailLogin() {
    const provider = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
  }

  logout() {
    //TODO: NEED TO HANDLE REDIRECT TO THE HOME/INDEX OR OTHER DEFINED PAGE;
    return this.oAuthLogout();
  }

  private oAuthLogin(provider) {
    from(this.auth.auth.signInWithPopup(provider)).subscribe(
      credential => this.handleSignInResponse(credential),
      error => this.handleError(error),
      () => this.loggingService.log(this.serviceName, Severity.Information, `Finished handling response from ${provider} provider.`)
    );
  }

  private oAuthLogout() {
    from(this.auth.auth.signOut()).subscribe(
      result => this.handleSignOutResponse(result),
      error => this.handleError(error),
      () => this.loggingService.log(this.serviceName, Severity.Information, `Finished handling process of logging out.`)
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
        this.isAuthenticated = true;
      } catch (error) {
        this.loggingService.log(this.serviceName, Severity.Error, `handleSignInResponse: ${error}`);
        this.handleError(error);
      }
    }
  }

  private handleSignOutResponse(result: any) {
    this.user = null;
    this.isAuthenticated = false;
    this.user$.next(this.user);
  }
}
