import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostComponent } from './post/post.component';

import { SiteModule } from './../site/site.module';
import { SharedModule } from './../shared/shared.module';
import { MarkdownEditorModule } from '@angularlicious/markdown-editor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownEditorModule,
    ReactiveFormsModule,
    SharedModule,
    SiteModule
  ],
  declarations: [PostComponent]
})
export class BlogModule {}
