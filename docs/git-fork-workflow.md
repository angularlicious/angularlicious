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

### Create a Fork

Use the following instructions to create a repository that is a fork from a public repository. In our scenario, we have a private Azure DevOps repository that is configured with upstream remotes for (pull/fetch) operations.

>More information at: https://help.github.com/articles/fork-a-repo/

### Sync From a Remote Upstream
We will use the `git fetch` command to get updates from the remote upstream. The `fetch` operation will bring down all updates to the local upstream branch. In order to get the changes in to the local branch/repository, you will have to perform a `merge` as described later.

>More information at: https://help.github.com/articles/syncing-a-fork/

Use the `git remote -v` command to view a list of all the available remotes for this repository. Typically, you would use the `git fetch upstream` command to fetch an update from the upstream remote. However, we have renamed our upstream remote - so the command is as follows:

```ts
git fetch buildmotion-angularlicious
```

After fetching from the upstream, you will want to checkout the target local branch that you want to update from the upstream. We need a target to actually bring in the changes received from the `fetch` command. 

```ts
git checkout development
```

Use the following command to merge the updates from the upstream **fetch** to the target local branch. In the following scenario, we are merging updates from the upstream into the local **development** branch.

syntax: `git merge <name-of-upstream-remote>/<name-of-branch>`

```ts
git merge buildmotion-angularlicious/master
```

After, the `git merge` command against the `upstream` called `buildmotion-angularlicious` will most likely require a few conflict resolutions. Depending on the frequency of fetching from the upstream, your mileage will vary. After resolving the conflicts, you will need to:

1. commit changes to the specified branch
2. push changes to the remote branch

### Develop/Experiment in Private Repository

### PR Request/Push Cherry Picked Chagnes to the Remote Upstream (if any)