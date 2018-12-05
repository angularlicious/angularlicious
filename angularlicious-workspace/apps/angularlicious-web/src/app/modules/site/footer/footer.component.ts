import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyright: string;
  owner: string;

  constructor() {}

  ngOnInit() {
    const date = new Date();
    this.copyright = `${date.getFullYear()} Build Motion, LLC - All rights reserved.`;
  }
}
