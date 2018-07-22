import { Component, OnInit } from '@angular/core';
import { RandomBackGroundStyle } from '../random-background-style';

@Component({
  selector: 'app-intro',
  templateUrl: './app-intro.component.html',
  styleUrls: ['./app-intro.component.css']
})
export class AppIntroComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  retrieveBackgroundStyle() {
    // https://www.typescriptlang.org/docs/handbook/basic-types.html
    const imageNumbers: number[] = [1, 3, 4, 5, 6, 7, 8, 11];

    // use list of image numbers to create an array of style strings;
    const styles = new Array<string>();
    imageNumbers.forEach(i => {
      styles.push(`./assets/img/bg${i}.jpg`);
    });
    styles.push('./assets/img/chicago.jpg');
    return new RandomBackGroundStyle(styles).retrieveBackgroundStyle();
  }
}
