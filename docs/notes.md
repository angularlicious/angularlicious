# Workspace Notes

## Upgrade to Angular 6

```text
npm install @angular/cli@latest -g
```

## Upgrade Nrwl.io

```text
ng update @Nrwl/schematics
npm run update
```

## Lib Workspace Setup

We will create a workspace using Nrwl.io Nx extensions with the primary goal of publishing multiple libraries. If you are using an Angular or the Nrwl.io Nx workspace, you will see that it allows for libraries and applications (web apps) to be in the same work environment - now conveniently called a `workspace`. I think developer productivity and workflow are the main advantages for using a workspace.

* How do I publish a single library to NPM?
* How do I build and publish libraries that have dependencies on my other custom libraries?
* How do I configure external dependencies (i.e., other npm packages) for my library?
* How do I create a manifest of items that will be exposed to consumers of my library?
* How do I document my library's items and/or API?
* How do I publish my library so that it can be consumed in different module formats (i.e., think Angular Package Format)?
* How can I confirm that consumers can use my library?
* How do I limit the usage of my library to only authorized consumers?
* How can I use @scope to reference my custom libraries in my applications (web apps)?

* Setup a development environment to build and test my libraries.
* Publish a single library to NPM?
* Build and publish libraries that have dependencies on my other custom libraries?
* Configure external dependencies (i.e., other npm packages) for my library?
* Create a manifest of items that will be exposed to consumers of my library?
* Document my library's items and/or API?
* Publish my library so that it can be consumed in different module formats (i.e., think Angular Package Format)?
* Confirm that consumers can use my library?
* Limit the usage of my library to only authorized consumers?
* Use @scope to reference my custom libraries in my applications (web apps)?

```text
create-nx-workspace <YOUR-WORKSPACE-NAME> --npm-scope=<YOUR-SCOPE-NAME>
create-nx-workspace angularlicious-workspace --npm-scope=angularlicious
```

Notice, that the command includes the `--npm-scope`flag. This will configure the workspace to use the @scope identifier as a global reference to your libraries. It is also a good mechanism to organize libraries that are related and/or published by the same organization. Even a single person, can be an organization when it comes to organizing your libraries for publication.

Create some libs for the workspace.

```text
ng generate lib <library name here>
```

## Create Some Packages (err... I mean libs)

I'm still not sure why the change happened in the Angular community to start calling these things `libs`.

I'm pretty sure the transition was around December 2017 and early 2018. Regardless, we need to create some packages that are publishable to NPM. From this point forward, I will use the term "lib" to mean a library or package that can be consumed by an application. It may or may not contain a ES6 module or Angular module (@NgModule).

```text
npm install -D ng-packagr@latest
npm install -D sync-glob@latest
```

## Create A Build Process Script

We need a new script to kick off the build process for the libraries. The `rules-engine`does not have any dependencies. We can run the `ng-packagr`command all day long and it will build and output to the specified destination directories.

```json
"package:actions": "ng-packagr -p libs/actions/package.json && npm run copy:actions",
"package:rules-engine": "ng-packagr -p libs/rules-engine/package.json && npm run copy:rules-engine",
"copy:actions": "sync-glob 'dist/@angularlicious/actions/' node_modules/@angularlicious/actions",
"copy:rules-engine": "sync-glob 'dist/@angularlicious/rules-engine/' node_modules/@angularlicious/rules-engine",
```

### Library Package.json

If you are building a lib that will be published to NPM, the lib will need a `package.json`file. This file contains required information by the package manager repository (i.e., think NPM). NPM requires the name of the package to be unique. It must have a version number. This version number cannot be a version that has already been published to NPM before.

If you package (I mean `lib`) has any dependencies, they must be declared in the `peerDependencies`section of the `package.json`file. This is important. Consumers of the package will need to know what other packages are required in order for the specified library to work. NPM will list any of the peer dependencies when you perform the install command. You will need to manually do an `npm install -S <peer dependency package name here>`on each dependency.

        As a reminder, you will need an NPM account to publish your libraries.

During the build process, any references to external dependencies will be resolved. Most of these are very common in Angular applications. Therefore, the packages will be installed and available to the build process from the `node_modules`folder.

### Library Dependencies

If you are creating

## Resources

* [Announcing Nrwl Nx 6.0](https://blog.Nrwl.io/announcing-Nrwl-nx-6-0-29b963d87d8e)