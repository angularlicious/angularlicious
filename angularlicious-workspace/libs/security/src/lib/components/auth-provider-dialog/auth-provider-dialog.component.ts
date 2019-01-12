import { Component, OnInit, Inject } from '@angular/core';
import { AuthProviderData } from '../../models/authProviderData.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@angularlicious/firebase';
import { ComponentBase } from '@angularlicious/foundation';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AngularliciousLoggingService } from '@angularlicious/logging';

@Component({
  selector: 'angularlicious-auth-provider-dialog',
  templateUrl: './auth-provider-dialog.component.html',
  styleUrls: ['./auth-provider-dialog.component.css']
})
export class AuthProviderDialogComponent extends ComponentBase implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthProviderData,
    private authService: AuthService,
    router: Router,
    loggingService: AngularliciousLoggingService
  ) { 
    super('AuthProviderDialogComponent', loggingService , router);
  }

  ngOnInit() {
    this.authService.user$.subscribe(
      userUpdate => this.handleUserUpdate(userUpdate),
      error => this.handleServiceErrors(error),
      () => this.finishRequest(`Finished handling changes to user/security.`)
    );
  }

  onNoClick() : void {
    // TODO: ADD RETURN OBJECT TO THE close() METHOD; RETURNS VALUE TO THE SUBSCRIBER;
    this.dialogRef.close();
  }

  handleUserUpdate(user) {
    if(user && this.authService.isAuthenticated) {
      this.onNoClick();
    } else {
      // do something here; NEED TO DISPLAY SOME ERROR MESSAGES HERE;
    }
  }

  signInWithGoogle() {
    return this.authService.googleLogin();
  }

  signInWithGithub() {
    return this.authService.githubLogin();
  }

  signInWithTwitter() {
    return this.authService.twitterLogin();
  }

  signInWithEmail() {
    return this.authService.emailLogin();
  }
}
