import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class BootstrapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('Bootstrapping the application...');
  }
}
