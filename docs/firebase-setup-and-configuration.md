# Firebase Setup and Configuration

Use these instructions to setup and configure Firebase for an Angular application. 

        Create a new account or use your existing Google account to sign-up.


Next, add a new project to your account. 


![](assets-auth/firebase-project.png)


## Firestore Quickstart

More information at: [https://github.com/firebase/quickstart-js/tree/master/firestore](https://github.com/firebase/quickstart-js/tree/master/firestore)

Authentication | Sign-in method: Allow Anonymous authentication.

    * set to true/allow


## Angular Project
Use an existing Angular `workspace` or create a new project for the application.

Install packages. 

* firebase
* @angulare/fire [https://www.npmjs.com/package/@angular/fire](https://www.npmjs.com/package/@angular/fire)

```ts
npm install firebase @angular/fire --save
```

The result.

```ts
+ @angular/fire@5.0.2
+ firebase@5.5.5
```

### Create an Application for Firebase Auth

We will get everything working/functional in a single web application. Later, we'll refactor to use `library` projects. 

```ts
ng g app firebase-auth --routing --style=scss --dry-run
```

The output when you remove the `--dry-run` is:

```ts
ng g app firebase-auth --routing --style=scss
CREATE apps/firebase-auth-e2e/protractor.conf.js (752 bytes)
CREATE apps/firebase-auth-e2e/src/app.e2e-spec.ts (310 bytes)
CREATE apps/firebase-auth-e2e/src/app.po.ts (219 bytes)
CREATE apps/firebase-auth-e2e/tsconfig.e2e.json (244 bytes)
CREATE apps/firebase-auth/src/environments/environment.prod.ts (51 bytes)
CREATE apps/firebase-auth/src/environments/environment.ts (631 bytes)
CREATE apps/firebase-auth/src/favicon.ico (5430 bytes)
CREATE apps/firebase-auth/src/index.html (321 bytes)
CREATE apps/firebase-auth/src/main.ts (370 bytes)
CREATE apps/firebase-auth/src/polyfills.ts (3194 bytes)
CREATE apps/firebase-auth/src/test.ts (642 bytes)
CREATE apps/firebase-auth/src/assets/.gitkeep (0 bytes)
CREATE apps/firebase-auth/src/styles.scss (80 bytes)
CREATE apps/firebase-auth/browserslist (375 bytes)
CREATE apps/firebase-auth/karma.conf.js (967 bytes)
CREATE apps/firebase-auth/tsconfig.app.json (254 bytes)
CREATE apps/firebase-auth/tsconfig.spec.json (315 bytes)
CREATE apps/firebase-auth/tslint.json (269 bytes)
CREATE apps/firebase-auth/src/app/app.module.ts (485 bytes)
CREATE apps/firebase-auth/src/app/app.component.html (607 bytes)
CREATE apps/firebase-auth/src/app/app.component.spec.ts (1114 bytes)
CREATE apps/firebase-auth/src/app/app.component.ts (230 bytes)
CREATE apps/firebase-auth/src/app/app.component.scss (0 bytes)
UPDATE angular.json (23269 bytes)
UPDATE package.json (6254 bytes)
UPDATE nx.json (816 bytes)

> angularlicious-workspace@0.0.0 format D:\development\github\buildmotion-angularlicious\angularlicious-workspace
> nx format:write "--untracked" "--quiet"

apps\firebase-auth-e2e\src\app.e2e-spec.ts 686ms
apps\firebase-auth-e2e\src\app.po.ts 16ms
apps\firebase-auth\src\app\app.component.spec.ts 64ms
apps\firebase-auth\src\app\app.component.ts 8ms
apps\firebase-auth\src\app\app.module.ts 15ms
apps\firebase-auth\src\environments\environment.prod.ts 8ms
apps\firebase-auth\src\environments\environment.ts 20ms
apps\firebase-auth\src\main.ts 12ms
apps\firebase-auth\src\polyfills.ts 30ms
apps\firebase-auth\src\test.ts 16ms
```

### Get the Firebase Configuration


```ts

<script src="https://www.gstatic.com/firebasejs/5.5.5/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDirRCd-S_2G9upW1dOAGSnisVLxY2ewFM",
    authDomain: "angularlicious-auth.firebaseapp.com",
    databaseURL: "https://angularlicious-auth.firebaseio.com",
    projectId: "angularlicious-auth",
    storageBucket: "angularlicious-auth.appspot.com",
    messagingSenderId: "104315615877"
  };
  firebase.initializeApp(config);
</script>
```

### Add Modules to the Application

Add `core` and `shared` modules to the application.

```ts
ng generate module modules/core --project=firebase-auth
ng generate module modules/shared --project=firebase-auth
```

```ts
ng generate module modules/core --project=firebase-auth
CREATE apps/firebase-auth/src/app/modules/core/core.module.spec.ts (259 bytes)
CREATE apps/firebase-auth/src/app/modules/core/core.module.ts (188 bytes)
ng generate module modules/shared --project=firebase-auth
CREATE apps/firebase-auth/src/app/modules/shared/shared.module.spec.ts (275 bytes)
CREATE apps/firebase-auth/src/app/modules/shared/shared.module.ts (190 bytes)
```

## Firebase Library

Creae a new library.

```ts
ng generate lib firebase --publishable --routing  --dry-run
```

Output from the `generate lib` command.

```ts
ng generate lib firebase --publishable --routing
CREATE libs/firebase/karma.conf.js (968 bytes)
CREATE libs/firebase/ng-package.json (179 bytes)
CREATE libs/firebase/ng-package.prod.json (147 bytes)
CREATE libs/firebase/package.json (168 bytes)
CREATE libs/firebase/src/test.ts (700 bytes)
CREATE libs/firebase/src/index.ts (52 bytes)
CREATE libs/firebase/tsconfig.lib.json (784 bytes)
CREATE libs/firebase/tsconfig.spec.json (260 bytes)
CREATE libs/firebase/tslint.json (269 bytes)
CREATE libs/firebase/src/lib/firebase.module.ts (349 bytes)
CREATE libs/firebase/src/lib/firebase.component.spec.ts (642 bytes)
CREATE libs/firebase/src/lib/firebase.component.ts (273 bytes)
CREATE libs/firebase/src/lib/firebase.service.spec.ts (386 bytes)
CREATE libs/firebase/src/lib/firebase.service.ts (137 bytes)
CREATE libs/firebase/src/lib/firebase.module.spec.ts (372 bytes)
UPDATE angular.json (24477 bytes)
UPDATE package.json (6254 bytes)
UPDATE tsconfig.json (504 bytes)
UPDATE nx.json (858 bytes)

> angularlicious-workspace@0.0.0 format D:\development\github\buildmotion-angularlicious\angularlicious-workspace
> nx format:write "--untracked" "--quiet"

libs\firebase\src\index.ts 601ms
libs\firebase\src\lib\firebase.module.spec.ts 52ms
libs\firebase\src\lib\firebase.module.ts 28ms
libs\firebase\src\test.ts 32ms
```

Add a service to the lib.

```ts
ng generate service auth --project=firebase
CREATE libs/firebase/src/lib/auth.service.spec.ts (362 bytes)
CREATE libs/firebase/src/lib/auth.service.ts (133 bytes)
```

asdfa

* AngularFireModule
* AngularFireAuthModule
* AngularFireDatabaseModule
* AngularFirestoreModule

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const firebaseOptions = {
  apiKey: "AIzaSyDirRCd-S_2G9upW1dOAGSnisVLxY2ewFM",
  authDomain: "angularlicious-auth.firebaseapp.com",
  databaseURL: "https://angularlicious-auth.firebaseio.com",
  projectId: "angularlicious-auth",
  storageBucket: "angularlicious-auth.appspot.com",
  messagingSenderId: "104315615877"
}

export const firebaseRoutes: Route[] = [];
@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    AngularFireModule.initializeApp(firebaseOptions),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ]
})
export class FirebaseModule {}
```

asdfasd

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseModule } from '@angularlicious/firebase';

@NgModule({
  imports: [
    CommonModule,
    FirebaseModule
  ],
  declarations: []
})
export class SharedModule { }
```

asdfas

```ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CoreModule {

  /**
 * Use the check to determine if the [CoreModule] has been loaded in the parentModule (AppModule root).
 */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        `CoreModule is already loaded. Import it in the AppModule only.`
      );
    }
  }
}
```

asdf

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';

import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    SharedModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
