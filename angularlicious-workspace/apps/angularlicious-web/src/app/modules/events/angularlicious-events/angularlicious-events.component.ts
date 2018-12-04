import { Component, OnInit } from '@angular/core';

import { Event } from './../models/event.model';
@Component({
  selector: 'app-angularlicious-events',
  templateUrl: './angularlicious-events.component.html',
  styleUrls: ['./angularlicious-events.component.css']
})
export class AngularliciousEventsComponent implements OnInit {
  hasEvents: boolean;
  events: Array<Event> = new Array<Event>();

  constructor() {}

  ngOnInit() {
    this.retrieveEvents();
  }

  retrieveEvents() {

    const angularSummitClearWater2018 = new Event(
      'Angular Summit Conference',
      new Date(2018, 12, 2),
      'DECEMBER 2-5, 2018',
      'Clearwater, FL',
      `Angular Summit is the definitive conference for developers who use Angular and modern web development tools.
      AS 2018 is a two-day conference with a full-day optional training offering. Angular Summit is packed with the latest
      techniques and insights to help you build something great. Angular Summit is the ONLY Angular conference offering
      90-minute in-depth technical sessions. View the list of my presentations.`,
      `https://angularsummit.com/conference/clearwater/2018/12/speakers/matt_vaughn`
    );
    this.events.push(angularSummitClearWater2018);

    const brieBugBWBacon = new Event(
      'Rocky Mountain Angular Meetup :: Angular Panel Discussion',
      new Date(2018, 5, 20),
      'JUNE 20, 2018',
      'Denver, CO',
      `Angular panel discussion hosted by BrieBug and BWBacon. This is a recording of an Angular discussion panel 
      with four Angular developers from Denver, including David East, a Developer Advocate at Google.`,
      `http://blog.briebug.com/replay-rocky-mountain-angular-discussion-panel`
    );
    this.events.push(brieBugBWBacon);
    
    const chicago = new Event(
      '2018 Angular Summit',
      new Date(2018, 4, 8),
      'MAY 8-10, 2018',
      'Chicago, IL',
      `Angular Summit is the definitive conference for developers who use Angular and modern web development tools.
      AS 2018 is a two-day conference with a full-day optional training offering. Angular Summit is packed with the latest
      techniques and insights to help you build something great. Angular Summit is the ONLY Angular conference offering
      90-minute in-depth technical sessions.`,
      `https://angularsummit.com/conference/chicago/2018/05/home`
    );
    this.events.push(chicago);

    const denverdevdayMay42018 = new Event(
      'Denver Dev Day (May 2018)',
      new Date(2018, 4, 5),
      'MAY 4, 2018',
      'Denver, CO',
      `Welcome to Denver Dev Day, Colorado's premier, local community-organized developer event. With presentation 
      topics ranging from desktop, micro-services, and web development to patterns, the cloud, and soft skills, Denver 
      Dev Day is your awesome, free, day-long resource for developer learning.`,
      `https://denverdevday.github.io/may-2018/`
    );
    this.events.push(denverdevdayMay42018);


    // const item = new Event(
    //   'title',
    //   new Date(2018, 4, 8),
    //   'dateTime',
    //   'location',
    //   `details`,
    //   `link`);
    // this.events.push(item);

    const boulderPanelDiscussion = new Event(
      'Angular Boulder - Talk with a Panel of 5 Professional Angular Developers',
      new Date(2018, 0, 8),
      'JAN 8, 2018, 5:30PM to 7:30PM',
      'NetApp 1023 Walnut Street · Boulder, CO',
      `Anthony Martinelli, Adam Jacaruso, Matt Vaughn, Benjamin Soulier, & Tom Hopkins are our five Angular developers for the panel
      discussion this month. They will share their experiences and discuss their work flows, successes, challenges, words of wisdom, etc.
      from their work on Angular 2+ projects as well as field some of your questions.`,
      `https://www.meetup.com/angular-boulder/events/245766922/`
    );
    this.events.push(boulderPanelDiscussion);

    const microsoftDevDayNov2017 = new Event(
      'Denver Dev Day',
      new Date(2017, 10, 17),
      'NOV 17, 2017, 9AM to  5PM',
      'Microsoft, Denver Tech Center 7595 Technology Dr., Suite 400 Denver, CO 80237',
      `Welcome to Denver Dev Day, Colorado's premier, local community-organized developer event. With presentation topics ranging from
      desktop, micro-services, and web development to patterns, the cloud, and soft skills, Denver Dev Day is your awesome, free, day-long
      resource for developer learning.`,
      `https://denverdevday.github.io/nov-2017/`
    );
    this.events.push(microsoftDevDayNov2017);

    if (this.events.length > 0) {
      this.hasEvents = true;
    }
  }

  goToEvent(link: string) {
    // route/navigate to the specified link;
    if (link) {
      window.open(link, '_blank');
    } else {
      console.log(`There is no place to go...hmmm.`);
    }
  }
}
