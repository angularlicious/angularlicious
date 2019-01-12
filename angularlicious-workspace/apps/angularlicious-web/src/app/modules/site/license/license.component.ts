import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent extends ComponentBase implements OnInit {
  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('LicenseComponent', loggingService, router);
  }

  ngOnInit() {}
}
