import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class AngularRulesEngineComponent extends ComponentBase
  implements OnInit {
  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('AngularRulesEngineComponent', loggingService, router);
  }

  ngOnInit() {}
}
