# Git Fork and Workflow for Angularlicious

Currently, the `angularlicious` Github repository is located at [https://github.com/angularlicious](https://github.com/angularlicious). This is a public repository that contains resources produced by [http://www.buildmotion.com](http://www.buildmotion.com) owned by Matt Vaughn.  

The goal is to keep this repository pristine for the [http://www.angularlicio.us](http://www.angularlicio.us)/Angularlicious brand. However, I would like to use (fork) this repository for my personal development and for the continued development of the actual website without pushing any of the website code to the public Github.com [https://github.com/angularlicious](https://github.com/angularlicious) repository.

I currently have a private Git repository hosted on the Azure DevOps platform - [angularlicious-web-workspace](https://build-hybridmobileapp-net.visualstudio.com/_git/angularlicious-web-workspace). This repository also has a remote named `buildmotion-angularlicious` that is a fork of [https://github.com/buildmotion/angularlicious.git](https://github.com/buildmotion/angularlicious.git). The [https://github.com/buildmotion/angularlicious.git](https://github.com/buildmotion/angularlicious.git) repository is a staging repository between the public Angularlicious and the private BuildMotion repositories. 

The desired workflow is to develop and experiment in the private BuildMotion repository and then push/PR any desired changes to the public Github.com repositories. 

>(private) BuildMotion --> (public) BuildMotion/Angularlicious --> (public)Angularlicious/Angularlicious

```ts
git remote -v
buildmotion-angularlicious      https://github.com/buildmotion/angularlicious.git (fetch)
buildmotion-angularlicious      https://github.com/buildmotion/angularlicious.git (push)
origin  https://build-hybridmobileapp-net.visualstudio.com/angularlicious-web-workspace/_git/angularlicious-web-workspace (fetch)
origin  https://build-hybridmobileapp-net.visualstudio.com/angularlicious-web-workspace/_git/angularlicious-web-workspace (push)
```

## Goals

The following goals need to be achieved using a well-defined, safe, and conventional Git workflow for managing the repositories. 

1. use the private repository forked from the public Github to develop and experiment with the Angularlicious framework/libraries.
2. create and manage web applications in the private repository that are never pushed to the public Github remote.
3. Periodically, refresh the private repository (basically update) from the public remote - so that the private repository has the latest version of the Angularlicious framework/library.
4. Allow for the public Angularlicious Github.com repository to be developed and improved independently of any other BuildMotion web application and/or library projects. 
5. Continue using a monorepo approach with an Angular/Nx Workspace environment.

## Workflow

```ts
git fetch upstream
git fetch buildmotion-angularlicious
```