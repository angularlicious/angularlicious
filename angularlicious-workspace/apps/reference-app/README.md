# Angularlicious Reference App

![](./assets/reference-app.png)

The purpose of this application is to demonstrate the use of the Angularlicious libraries/packages. 

* Cross-Cutting Concerns ([Presentation Slides](https://github.com/angularlicious/angular-cross-cutting-concerns-course/tree/master/presentations))
    * configuration
    * error handling
    * logging
    * notifications
    * HTTP/Data Access
* Business Logic Processing ([Github, Presentation, samples](https://github.com/buildmotion/better-business-logic-with-typescript))
    * actions
    * business rules
    * data validation
* Feature Libraries [Github, Guides](https://github.com/angularlicious/custom-angular-libraries-course)
    * Contentful: uses 3rd-party [https://www.contentful.com](https://www.contentful.com) API to manage JSON-based content.
    * Firebase: uses Firebase for authentication and user management
    * Markdown Editor: a library for managing markdown content.
* Security
    * manages login
    * password changes
    * password reset
    * account creation
    * account verification
  
The reference application takes advantage of the [Nrwl.io Nx Workspace](https://nrwl.io/nx). This is just an enhanced workspace environment that allows for `--publisable` libraries. 