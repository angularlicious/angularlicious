import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToHtmlPipe } from './pipes/md-to-html.pipe';
@NgModule({
  imports: [CommonModule],
  declarations: [MdToHtmlPipe],
  exports: [
    MdToHtmlPipe
  ]
})
export class ContentfulModule {}
