import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // TODO: RETRIEVE THE EMAIL ADDRESS FROM THE URL: http://angularlicio.us/unsubscribe?email=matt@angularlicio.us
    // TODO: UPDATE THE DATABASE WITH THE UNSUBSCRIBE INFORMATION.
  }
}
