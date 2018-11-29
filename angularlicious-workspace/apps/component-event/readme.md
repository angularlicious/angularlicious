# Component Emitting Response to Container Component

The goal of this exercise is to allow a child (presentational) component to emit information to a (container) component. This allows the container component to process a well-known response from a child-component. 

## Create @Output EventEmitter
The presentational component will require an `EventEmitter` of any specified type. This value can be a simple value type or a complex object (think: response from a web api).

```typescript
@Output() onEventSourceComponentClick = new EventEmitter<boolean>();
```

## Container Component Subscribes to the Presentational Event

The Container component subscribes to the Presentational component event called `onEventSourceComponentClick`. It also provides the name of the method to handle the event: `handleEvent($event)`. You can create better names for you implementation context.

```html
<angularlicious-event-source (onEventSourceComponentClick)="handleEvent($event)"></angularlicious-event-source>
```

## Emit the @Output to Container Component

Now **when** the presentational component does something interesting (i.e., handle a response from a Web API or other business process), emit the value. This will allow any container component subscribed to the event to handle it when emitted.

```
this.onEventSourceComponentClick.emit(this.isClicked);
```

## Handle the Response from the Presentation Component

Whenever the presentational component emits the value or an update, the container component is able to process the value using the method specified in the HTML element - in this case, it is the `handleEvent(..)` methods.

```typescript
  handleEvent(value: boolean) {
    console.log(`Container component handling the event from the child component.`);
    if(value) {
      // the button was clicked and the child component emitted a response;

      // Handle the event and response as required by the application.
      // (i.e., show a dialogue, show a loading icon, etc.`)
      this.title = `BUTTON WAS CLICKED.`
    }
  }
```

## Source

### EventSourceComponent
```typescript
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
    this.onEventSourceComponentClick.emit(this.isClicked);
  }
}
```

### AppComponent (Container Component)

```typescript
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
```