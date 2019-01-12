import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentBase } from '@angularlicious/foundation';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent extends ComponentBase implements OnInit {
  constructor(loggingService: AngularliciousLoggingService, router: Router) {
    super('PlaylistComponent', loggingService, router);
  }

  ngOnInit() {}
}
