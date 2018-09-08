import { Component } from '@angular/core';

@Component({
  selector: 'angularlicious-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularlicious';

  handleEvent(value: boolean) {
    console.log(`Container component handling the event from the child component.`);
    if(value) {
      // the button was clicked and the child component emitted a response;

      // Handle the event and response as required by the application.
      // (i.e., show a dialogue, show a loading icon, etc.`)
      this.title = `BUTTON WAS CLICKED.`
    }
  }
}
