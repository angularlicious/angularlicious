import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends ComponentBase implements OnInit {
  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('AboutComponent', loggingService, router);
  }

  ngOnInit() {}
}
