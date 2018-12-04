import {
  Component,
  ElementRef,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as SimpleMDE from 'simplemde'; // MUST NPM INSTALL @types/simplemde@1.11.6
import { MarkdownEditorOptions } from '../markdownEditorOptions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'simplemde',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'editor.component.html'
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() markdown: any;
  @Output() markdownChange = new EventEmitter<string>();
  @ViewChild('simplemde') textarea: ElementRef;
  private simplemde: SimpleMDE;

  constructor(
    private editorOptions: MarkdownEditorOptions // injected by ng; constructor injection
  ) {}

  ngOnInit() {
    this.initializeEditor();
  }

  initializeEditor() {
    // verify that the editor options are valid;
    if (
      typeof this.editorOptions !== 'object' ||
      typeof this.editorOptions !== 'object'
    ) {
      console.log(`EditorComponent The editor options are not valid.`);
      throw new Error('The [MarkdownEditorOptions] is not an object.');
    }
    console.log(`EditorComponent: Preparing to initialize the editor.`);
    this.editorOptions.initialValue = this.markdown;
    this.simplemde = new SimpleMDE(this.editorOptions);
  }
  ngOnDestroy() {
    console.log(`EditorComponent: Preparing to destroy the editor.`);
    this.simplemde = null;
    console.log(`EditorComponent The editor is destroyed.`);
  }

  ngAfterViewInit() {
    console.log(`EditorComponent: Running ngAfterViewInit.`);

    if (this.simplemde != null) {
      this.simplemde.codemirror.on('change', () => {
        this.markdownChange.emit(this.simplemde.value());
      });
    } else {
      console.log(`EditorComponent: is null.`);
    }
  }
}
