import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'angularlicious-event-source',
  templateUrl: './event-source.component.html',
  styleUrls: ['./event-source.component.css']
})
export class EventSourceComponent implements OnInit {

  @Output() onEventSourceComponentClick = new EventEmitter<boolean>();
  isClicked: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleButtonClick() {
    console.log(`Preparing to handle the button click in the child component.`)
    this.isClicked = true;

    console.log(`Preparing to emit the value from the child component.`);
    /**
     * The example emits a simple [boolean] value, however, the emitted value
     * can be of any type simple or complex. 
     * 
     * Make sure that the emitted value is strongly typed to allow the parent/container 
     * component to handle a well-known response. 
     */
    this.onEventSourceComponentClick.emit(this.isClicked);
  }
}
