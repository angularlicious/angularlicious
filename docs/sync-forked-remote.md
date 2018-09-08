# Sync Remote Fork 

## Fork a Remote Repository

Create a new repository based on the target remote repository. Import or fork the remote repository. This remote repository has what we need as a base or foundation for the work to be done in the new development repository.

## Clone
Clone your new repository. This is the `working` repository that we will update any changes from the remote/forked repository. We will also want to push changes from our working repository up to this remote/forked repository. Show the love...

```ts
git clone https://build-hybridmobileapp-net.visualstudio.com/angularlicious-sandbox/_git/angularlicious-sandbox
```

Now that we have a working repository, we can view the remote repositories associated to it. 

```ts
git remote -v
origin	https://build-hybridmobileapp-net.visualstudio.com/angularlicious-sandbox/_git/angularlicious-sandbox (fetch)
origin	https://build-hybridmobileapp-net.visualstudio.com/angularlicious-sandbox/_git/angularlicious-sandbox (push)
```

In order to enable pulling changes from and pushing changes to the forked/remote repository, we need to adds an `upstream` remote repository to the working repository.

```ts
git remote add upstream https://github.com/angularlicious/angularlicious.git
```

To view the remotes, use:

```ts
git remote -v
origin	https://build-hybridmobileapp-net.visualstudio.com/angularlicious-sandbox/_git/angularlicious-sandbox (fetch)
origin	https://build-hybridmobileapp-net.visualstudio.com/angularlicious-sandbox/_git/angularlicious-sandbox (push)
upstream	https://github.com/angularlicious/angularlicious.git (fetch)
upstream	https://github.com/angularlicious/angularlicious.git (push)
```

## Push Changes to Remote/Forked Repository

```ts
git push upstream
```

## Synch Local Working from Remote/Forked Repository
```ts
git fetch upstream
git merge upstream/master
```