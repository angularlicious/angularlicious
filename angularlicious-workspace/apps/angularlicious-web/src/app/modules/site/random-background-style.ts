export class RandomBackGroundStyle {
  /**
   * Use to supply a list of background styles with image paths. Call
   * the retrieveBackgroundStyle() method to select a random item from
   * the list.
   * @param imageUrls an array of background styles
   *
   * Example: background-image: url('./assets/img/header.jpg');
   * HTML: style="background-image: url('./assets/img/header.jpg');"
   * NG: [ngStyle]="retrieveBackgroundStyle()"
   */
  constructor(private imageUrls: Array<string>) {}

  retrieveBackgroundStyle() {
    let bgStyle = {};
    if (this.imageUrls && this.imageUrls.length > 0) {
      const image = this.imageUrls[
        Math.floor(Math.random() * this.imageUrls.length)
      ];
      const imageUrl = `url(\'${image}\')`;
      bgStyle = {
        'background-image': imageUrl
      };
    } else {
      return bgStyle; // default style;
    }
    return bgStyle;
  }
}
