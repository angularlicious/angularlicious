# Matterial Design

Create a new Angular project.

```ts
ng new matterial-design
CREATE matterial-design/README.md (1032 bytes)
CREATE matterial-design/angular.json (3638 bytes)
CREATE matterial-design/package.json (1321 bytes)
CREATE matterial-design/tsconfig.json (408 bytes)
CREATE matterial-design/tslint.json (2805 bytes)
CREATE matterial-design/.editorconfig (245 bytes)
CREATE matterial-design/.gitignore (503 bytes)
CREATE matterial-design/src/favicon.ico (5430 bytes)
CREATE matterial-design/src/index.html (302 bytes)
CREATE matterial-design/src/main.ts (370 bytes)
CREATE matterial-design/src/polyfills.ts (3194 bytes)
CREATE matterial-design/src/test.ts (642 bytes)
CREATE matterial-design/src/styles.css (80 bytes)
CREATE matterial-design/src/browserslist (375 bytes)
CREATE matterial-design/src/karma.conf.js (964 bytes)
CREATE matterial-design/src/tsconfig.app.json (170 bytes)
CREATE matterial-design/src/tsconfig.spec.json (256 bytes)
CREATE matterial-design/src/tslint.json (314 bytes)
CREATE matterial-design/src/assets/.gitkeep (0 bytes)
CREATE matterial-design/src/environments/environment.prod.ts (51 bytes)
CREATE matterial-design/src/environments/environment.ts (631 bytes)
CREATE matterial-design/src/app/app.module.ts (314 bytes)
CREATE matterial-design/src/app/app.component.css (0 bytes)
CREATE matterial-design/src/app/app.component.html (1141 bytes)
CREATE matterial-design/src/app/app.component.spec.ts (1025 bytes)
CREATE matterial-design/src/app/app.component.ts (220 bytes)
CREATE matterial-design/e2e/protractor.conf.js (752 bytes)
CREATE matterial-design/e2e/tsconfig.e2e.json (213 bytes)
CREATE matterial-design/e2e/src/app.e2e-spec.ts (312 bytes)
CREATE matterial-design/e2e/src/app.po.ts (208 bytes)
```

## Material Design
Add support for Material Design to the project. Use the `ng add` command to update the project resources.

```ts
ng add @angular/material
```

The result of using the `ng add` command will:
* add some new packages
* update existing files in the project.

```ts
ng add @angular/material
Installing packages for tooling via npm.
npm WARN @angular/material@6.4.7 requires a peer of @angular/cdk@6.4.7 but none is installed. You must install peer dependencies yourself.

+ @angular/material@6.4.7
added 2 packages from 1 contributor in 6.369s
Installed packages for tooling via npm.
UPDATE package.json (1385 bytes)
UPDATE angular.json (3884 bytes)
UPDATE src/app/app.module.ts (423 bytes)
UPDATE src/index.html (479 bytes)
UPDATE src/styles.css (165 bytes)
added 1 package in 5.726s
```

The version of the `@angular/sdk` will need to be updated to the version required by the `@angular/material@6.4.7` version. 

```ts
npm install -D @angular/cdk@6.4.7
npm notice save @angular/cdk is being moved from dependencies to devDependencies
+ @angular/cdk@6.4.7
updated 1 package in 6.58s
```

### package.json

```json
"@angular/material": "^6.4.7",
"@angular/cdk": "^6.4.7",
```

### angular.json

The `ng add` command will update the project build configuration to use following style. Your options include:

* deeppurple-amber
* indigo-pink
* pink-bluegrey
* purple-green

```json
"styles": [
    {
    "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
    },
    "src/styles.css"
]
```

### index.html

The `ng add` command will update the `index.html` file to reference `icons`, and a `font family`.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

### styles.css

The `ng add` command will add the following `css` to the project file.

```css
html, body { height: 100%; }
body { margin: 0; font-family: 'Roboto', sans-serif; }
```

### app.module

The `ng add` command will update the application's module to import `BrowserAnimationsModule`. 

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Material Schematic

Create a new component using the Material Schematic

* [Learn More: https://material.angular.io/guide/schematics](https://material.angular.io/guide/schematics)


Use the command to create a `HomeComponent` using the `material-nav` schematic.
```ts
ng generate @angular/material:material-nav --name home
CREATE src/app/home/home.component.css (129 bytes)
CREATE src/app/home/home.component.html (959 bytes)
CREATE src/app/home/home.component.spec.ts (691 bytes)
CREATE src/app/home/home.component.ts (573 bytes)
UPDATE src/app/app.module.ts (789 bytes)
```

Update the `app.component.html` 

```html
<app-home></app-home>
```

Run the app.

```ts
ng serve --open
```

## Tab
Create a Material tab control and add (3) forms. The `MultiTabComponent` will be the `Container` and the form components will be the `Presentational` components.

```ts
ng generate component multiTab
CREATE src/app/multi-tab/multi-tab.component.css (0 bytes)
CREATE src/app/multi-tab/multi-tab.component.html (28 bytes)
CREATE src/app/multi-tab/multi-tab.component.spec.ts (643 bytes)
CREATE src/app/multi-tab/multi-tab.component.ts (280 bytes)
UPDATE src/app/app.module.ts (881 bytes)

ng generate component /multi-tab/userForm
CREATE src/app/multi-tab/user-form/user-form.component.css (0 bytes)
CREATE src/app/multi-tab/user-form/user-form.component.html (28 bytes)
CREATE src/app/multi-tab/user-form/user-form.component.spec.ts (643 bytes)
CREATE src/app/multi-tab/user-form/user-form.component.ts (280 bytes)
UPDATE src/app/app.module.ts (983 bytes)

ng generate component /multi-tab/contactForm
CREATE src/app/multi-tab/contact-form/contact-form.component.css (0 bytes)
CREATE src/app/multi-tab/contact-form/contact-form.component.html (31 bytes)
CREATE src/app/multi-tab/contact-form/contact-form.component.spec.ts (664 bytes)
CREATE src/app/multi-tab/contact-form/contact-form.component.ts (292 bytes)
UPDATE src/app/app.module.ts (1097 bytes)

ng generate component /multi-tab/preferencesForm
CREATE src/app/multi-tab/preferences-form/preferences-form.component.css (0 bytes)
CREATE src/app/multi-tab/preferences-form/preferences-form.component.html (35 bytes)
CREATE src/app/multi-tab/preferences-form/preferences-form.component.spec.ts (692 bytes)
CREATE src/app/multi-tab/preferences-form/preferences-form.component.ts (308 bytes)
UPDATE src/app/app.module.ts (1227 bytes)
```

## Previous Next Navigation
Enable custom navigation for a Material Design Tab control. There are times within the [Tabs] that you want to control navigation using other controls (i.e., think buttons) - or have a customized navigation based on the state/behavior of your form or tab display.

You may event want to think about using a [State Machine] pattern and defining the specified states and allowable transitions between each of the views (view == tab item). 

```ts
ng generate component /multi-tab/previousNext
CREATE src/app/multi-tab/previous-next/previous-next.component.css (0 bytes)
CREATE src/app/multi-tab/previous-next/previous-next.component.html (32 bytes)
CREATE src/app/multi-tab/previous-next/previous-next.component.spec.ts (671 bytes)
CREATE src/app/multi-tab/previous-next/previous-next.component.ts (296 bytes)
UPDATE src/app/app.module.ts (1379 bytes)
```

Update the `AppComponent` HTML to use the new Tab Component. 

```html
<app-multi-tab></app-multi-tab>
```

        Use the `ng server --open` command to view the changes.

### Container Component (contains Form, TabGroup, and Tabs)
Update the `Container` component to use the new form components and the navigation component.

```html
<form [formGroup]="form" *ngIf="form">
    <mat-tab-group #tabGroup>
        <mat-tab label=" User ">
          <app-user-form></app-user-form>
        </mat-tab>
        <mat-tab label=" Preferences ">
          <app-preferences-form></app-preferences-form>
        </mat-tab>
        <mat-tab label=" Contact ">
          <app-contact-form></app-contact-form>
        </mat-tab>
      </mat-tab-group>
      <app-previous-next [tabGroup]="tabGroup"></app-previous-next>
</form>
```

```html
<form [formGroup]="form" *ngIf="form">
    <!-- MATERIAL TAB GROUP HERE -->
</form>
```

Update the component with a `FormGroup` and setup the form using the `FormBuilder`. Import the `ReactiveFormsModule` in 
the application's `AppModule` so that we have access to all of the modules members to configure the form.

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-multi-tab',
  templateUrl: './multi-tab.component.html',
  styleUrls: ['./multi-tab.component.css']
})
export class MultiTabComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.form = this.formBuilder.group({});
  }
  openTab(event: any) {
    console.log('event: ' + {event});
  }
}
```

## Implementation Details

Now we need to create/use a new component to manage the navigation (transitions). To allow this component to work within the context of the Material Design Tab Group, you will pass in the tag reference to the `mat-tab-group` by name: `tabGroup`. The name is defined in the Tab control using the hashtag: `#tabGroup`. 

```html
<mat-tab-group #tabGroup>
    <!-- YOUR TABS GO HERE -->
</mat-tab-group>
```

### TabGroup Reference for Navigation Component
Update the `PreviousNextComponent` HTML to pass in the `tabGroup` reference.

```html
<prev-next [tabGroup]="tabGroup" *ngIf="form"></prev-next>
```

The component will need an `@Input` setup for the `tabGroup` item to allow access to the `MatTabGroup` members.

```ts
@Input('tabGroup') tabGroup: MatTabGroup;
```

Next, we'll need to add the `previous` and `next` navigation button elements to the component's HTML.

```html
<mat-divider></mat-divider>
<button i18n mat-raised-button color="primary" class="prev-button">
  <mat-icon>arrow_back</mat-icon> Previous
</button>
&nbsp;
<button i18n mat-raised-button color="primary">
  Next
  <mat-icon>arrow_forward</mat-icon>
</button>
```

If the `TabGroup` is displaying the first item in the group, there is no previous item to navigate to. If you cannot navigate to an item, you shouldn't display a navigation button.

    * add a `*ngIf="!isFirstTab"` attribute to the `previous` button.

```html
<div>
    <mat-divider></mat-divider>
    <button i18n mat-raised-button color="primary" class="prev-button"
      *ngIf="!isFirstTab">
      <mat-icon>arrow_back</mat-icon> Previous
    </button>
    <button i18n mat-raised-button color="primary">
      Next
      <mat-icon>arrow_forward</mat-icon>
    </button>
</div>
```

The component will need an `isFirstTab` getter to determine if the tab group's active tab is the first item (i.e., index 0).

```ts
 /**
   * Use to determine if the selected tab is the [first] tab in tab group.
   */
  get isFirst() {
    return this.tabGroup.selectedIndex === 0;
  }
```

### Previous and Next Navigation

Add `click` event items to each button to target the `previous()` and `next()` event handler methods.

        Note that there is a check for `isLastTab` tab to determine if the `Next` button should display.

```html
<mat-divider></mat-divider>
<button i18n mat-raised-button color="primary" class="prev-button"
  *ngIf="!isFirstTab"
  (click)="previous($event)">
  <mat-icon>arrow_back</mat-icon> Previous
</button>
&nbsp;
<button i18n mat-raised-button color="primary"
*ngIf="!isLastTab"
(click)="next($event)">
  Next
  <mat-icon>arrow_forward</mat-icon>
</button>
```

The complete `PreviousNextComponent` code.

```ts
import { Component, OnInit, Input } from '@angular/core';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-previous-next',
  templateUrl: './previous-next.component.html',
  styleUrls: ['./previous-next.component.css']
})
export class PreviousNextComponent implements OnInit {

  @Input('tabGroup') tabGroup: MatTabGroup;


  constructor() { }

  ngOnInit() {
  }

  /**
   * Use to determine if the selected tab is the [first] tab in tab group.
   */
  get isFirstTab() {
    return this.tabGroup.selectedIndex === 0;
  }

  /**
   * Use to determine if the selected tab is the [last] tab in the tab group.
   */
  get isLastTab() {
    return this.tabGroup.selectedIndex === this.tabGroup._tabs.length - 1;
  }

  /**
   * Use to handle the click event for the [Previous] button.
   * @param event
   */
  previous(event) {
    this.scrollToTop();
    this.tabGroup.selectedIndex = this.tabGroup.selectedIndex - 1;
  }

  /**
   * Use to handle the click event for the [Next] button.
   * @param event
   */
  next(event) {
    this.scrollToTop();
    this.tabGroup.selectedIndex = this.tabGroup.selectedIndex + 1;
  }

  /**
   * Use to scroll to top of page/view.
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
```

# -------------------------- FUTURE ---------------------------

Things to note:

1. Change Detection: configure the change detection strategy in the `@Component` settings.

    ```ts
    changeDetection: ChangeDetectionStrategy.OnPush,
    ```

2. Component implements a set of [interfaces]
   * AfterContentChecked
   * OnChanges
   * OnDestroy

    ```ts
    export class PrevNextComponent implements OnInit, AfterContentChecked, OnChanges, OnDestroy {
    ```

3. Use an `@Input` to provide access to the Material Design TabGroup

    ```ts
    @Input('tabGroup') tabGroup: MatTabGroup;
    ```

```ts
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  AfterContentChecked
} from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'prev-next',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './prev-next.component.html',
  styleUrls: ['./prev-next.component.scss']
})
export class PrevNextComponent implements OnInit, AfterContentChecked, OnChanges, OnDestroy {
  @Input('tabGroup') tabGroup: MatTabGroup;
  subscription: Subscription;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tabGroup != null && this.subscription == null) {
      this.subscription = this.tabGroup.selectedIndexChange.subscribe(event => {
        this._changeDetectorRef.detectChanges();
      });
    }
  }

  ngAfterContentChecked() {
    // Tabs are ready, refresh display.
    this._changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  isFirstTab() {
    return this.tabGroup.selectedIndex == 0;
  }

  isLastTab() {
    return this.tabGroup.selectedIndex == this.tabGroup._tabs.length - 1;
  }

  previous() {
    this.scrollUp();
    this.tabGroup.selectedIndex = this.tabGroup.selectedIndex - 1;
  }

  next() {
    this.scrollUp();
    this.tabGroup.selectedIndex = this.tabGroup.selectedIndex + 1;
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }
}
```

#### SimpleChanges

./node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts
```ts
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SimpleChange } from '../change_detection/change_detection_util';
/**
 * Defines an object that associates properties with
 * instances of `SimpleChange`.
 *
 * @see `OnChanges`
 *
 */
export interface SimpleChanges {
    [propName: string]: SimpleChange;
}
/**
 * @description
 * A lifecycle hook that is called when any data-bound property of a directive changes.
 * Define an `ngOnChanges()` method to handle the changes.
 *
 * @see `DoCheck`
 * @see `OnInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define an on-changes handler for an input property.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 */
export interface OnChanges {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     * @param changes The changed properties.
     */
    ngOnChanges(changes: SimpleChanges): void;
}
/**
 * @description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `ngOnInit()` method to handle any additional initialization tasks.
 *
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 *
 */
export interface OnInit {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ngOnInit(): void;
}
/**
 * A lifecycle hook that invokes a custom change-detection function for a directive,
 * in addition to the check performed by the default change-detector.
 *
 * The default change-detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs. You can use this
 * hook to check for and respond to changes by some other means.
 *
 * When the default change detector detects changes, it invokes `ngOnChanges()` if supplied,
 * regardless of whether you perform additional change detection.
 * Typically, you should not use both `DoCheck` and `OnChanges` to respond to
 * changes on the same input.
 *
 * @see `OnChanges`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to invoke it own change-detection cycle.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 */
export interface DoCheck {
    /**
       * A callback method that performs change-detection, invoked
       * after the default change-detector runs.
       * See `KeyValueDiffers` and `IterableDiffers` for implementing
       * custom change checking for collections.
       *
       */
    ngDoCheck(): void;
}
/**
 * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
 * Use for any custom cleanup that needs to occur when the
 * instance is destroyed.
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to define its own custom clean-up method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 */
export interface OnDestroy {
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * after a directive, pipe, or service instance is destroyed.
     */
    ngOnDestroy(): void;
}
/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * all content of a directive.
 * Define an `ngAfterContentInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterViewInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own content initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 *
 */
export interface AfterContentInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    ngAfterContentInit(): void;
}
/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking all content of a directive.
 *
 * @see `AfterViewChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 *
 */
export interface AfterContentChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed checking all of the directive's
     * content.
     */
    ngAfterContentChecked(): void;
}
/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * a component's view.
 * Define an `ngAfterViewInit()` method to handle any additional initialization tasks.
 *
 * @see `OnInit`
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own view initialization method.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 *
 */
export interface AfterViewInit {
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     *
     */
    ngAfterViewInit(): void;
}
/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking a component's view for changes.
 *
 * @see `AfterContentChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 */
export interface AfterViewChecked {
    /**
     * A callback method that is invoked immediately after the
     * default change detector has completed one change-check cycle
     * for a component's view.
     */
    ngAfterViewChecked(): void;
}
```