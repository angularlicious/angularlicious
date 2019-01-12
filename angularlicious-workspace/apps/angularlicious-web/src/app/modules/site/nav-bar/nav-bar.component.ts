import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@angularlicious/firebase';
import { Subscription } from 'rxjs';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthProviderDialogComponent } from 'libs/security/src/lib/components/auth-provider-dialog/auth-provider-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent extends ComponentBase implements OnInit {
  
  user$: Subscription;
  user: User;
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    loggingService: AngularliciousLoggingService,
    router: Router,
    public dialog: MatDialog
  ) {
    super('NavBarComponent', loggingService, router)
  }

  ngOnInit() {
    this.user$ = this.authService.user$.subscribe(
      user => this.handleUserUpdate(user),
      error => this.handleServiceErrors(error),
      () => this.finishRequest(`Finished processing user update.`)
    );
  }

  login() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to load the provider(s) for authentication.`);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '400px';
    dialogConfig.height = '600px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {redirectUrl: ''};
    
    const dialogRef = this.dialog.open(AuthProviderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.loggingService.log(this.componentName, Severity.Information, `${result}`, ['security'])
    });
  }

  logout() {
    this.authService.logout();
  }

  handleUserUpdate(user: User) {
    this.user = user;
    this.isAuthenticated = this.authService.isAuthenticated;
  }
}
