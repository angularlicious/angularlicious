# Firebase Setup and Configuration

asdf


![](assets-auth/firebase-project.png)

asdf

![](assets-auth/creating-project.png)

asdf

![](assets-auth/firebase-dashboard.png)

## Firestore Quickstart

More information at: [https://github.com/firebase/quickstart-js/tree/master/firestore](https://github.com/firebase/quickstart-js/tree/master/firestore)

Authentication | Sign-in method: Allow Anonymous authentication.

    * set to true/allow

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

### 