/**
 * Use to define an event for th event calendar.
 */
export class Event {
  title: string;
  date: Date;
  dateTime: string;
  location: string;
  details: string;
  link: string;

  // "fields": {
  //   "title": "Rocky Mountain Angular Meetup :: Panel Discussion and Happy Hour",
  //   "date": "2018-06-20T00:00+06:00",
  //   "location": "Battery 621  621 Kalamath Street  Denver, CO 80204",
  //   "details": "Many of the Rocky Mountain Angular group members have expressed that they want to have some more casual networking events, in addition to the informational presentations. BrieBug has partnered with BWBacon in the Battery 621 building to sponsor an awesome Angular Q+A Panel and Happy Hour event on June 20th! \n\nMatt Vaughn - Web Page Developer\nBuilding web applications from VBScript/ASP (1998) to Angular 5 (2018). Currently focused on Angular: applications, custom libraries, tools, development environment, and applying enterprise patterns and practices in the front end. Builder of code generation and scaffolding tools for .NET applications, Web APIs, and Microservices. GitHub open source projects include [angular-rules-engine](https://github.com/buildmotion/angular-rules-engine \"angular-rules-engine\") and [angular-actions](https://github.com/buildmotion/angular-actions \"angular-actions\").",
  //   "link": "https://www.meetup.com/RockyMountainAngular/events/251276711/?rv=ea1&_xtd=gatlbWFpbF9jbGlja9oAJDhiMzAwN2E0LTZjZDktNDBmNy1hOTdjLWFlMjEzODdkYTYyZQ"
  // }
  
  constructor(
    title: string,
    date: Date,
    dateTime: string,
    location: string,
    details: string,
    link: string
  ) {
    this.title = title;
    this.date = date;
    this.dateTime = dateTime;
    this.location = location;
    this.details = details;
    this.link = link;
  }
}
