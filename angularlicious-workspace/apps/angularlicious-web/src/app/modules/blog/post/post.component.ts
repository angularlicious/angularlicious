import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '@angularlicious/foundation';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularliciousLoggingService, Severity } from '@angularlicious/logging';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent extends ComponentBase implements OnInit {
  postContent: string;
  _form: FormGroup;

  constructor(
    router: Router,
    loggingService: AngularliciousLoggingService,
    public formBuilder: FormBuilder
  ) {
    super('PostComponent', loggingService, router);
  }

  ngOnInit() {
    // simulate retrieval of content from data store;
    this.postContent = `hello editor from post component`;
  }

  buildForm() {
    this._form = this.formBuilder.group({});
  }

  onMarkdownChange(markdown: string) {
    this.postContent = markdown;
    console.log(`markdown: ${this.postContent}`);
  }

  submitForm() {
    this.loggingService.log(
      this.componentName,
      Severity.Information,
      `Form: {form | json}`
    );
    this.resetAlertNotifications();
  }
}
