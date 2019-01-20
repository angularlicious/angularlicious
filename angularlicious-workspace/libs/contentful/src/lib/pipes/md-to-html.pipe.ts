import { Pipe, PipeTransform } from '@angular/core';
import { ContentfulService } from '../contentful.service';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {
  constructor(private contentful: ContentfulService) {}

  transform(value: string): any {
    if (value) {
      return this.contentful.markdownToHtml(value);
    }
  }
}