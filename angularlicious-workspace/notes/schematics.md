# Schematics - Do You Need More Development Time?
If you have been developing applications for any length of time, you will soon discover that there are a lot of repetitive tasks in programming. Sometimes, it is the same code over and over again with a few variances like the name of the class. Sometimes, there is boilerplate code that has to be there for the application to work, and it may be error prone and time consuming to hand-craft this code everytime you need it. 

This is where tooling like the CLI comes to the rescue. Imagine if you had to create and configure all of the files to create a new Angular project/workspace? Do you think it will work the first time without any issues? What if you had many developers on the same team that had to create projects - would they do it all the same way? The current version of the Angular CLI takes advantage of Schematics to scaffold applications and parts of applications.

The process of ` Scaffolding ` code has been around for awhile. Basically, there is a template, input, and output of code in files. Using a template is like using a well-known recipe with a well-known output that is consistent and useful. Using scaffolding as a technique solves a few problems. It keeps things consistent. It is repeatable with known outputs. It can automate a set of complex operattions and it never forgets a step. It will use the same recipe over and over again. Besides the inputs and outputs, you will also need an ` engine ` to basically use the inputs along with templates to follow a well-defined `recipe` to output the desired result. This is code generation. I wonder how many man hours have been saved by the Angular CLI since it has been in use? How much time do you and/or your team want to save? Having more time means that you can focus on the implementation of the solution. This is the real value to your customers.

Time is a limited resource for any developer, team, and company. Making more time by eliminating things that use this time is something we can all do. We can now use existing Schematics from Angular, Nrwl.io and other teams to increase our efficiencies. And, we can also create our Schematics to do the same. Let's get started.

## Getting Started
There are tools to create your own schematics and there are schematics that you can use to ` scaffold ` (add or update) items to your project. We are going to use an @angular-devkit package to develop a new schematic collection.

Install the following package that will allow you to create a new Schematic collection. Use to create, call, and use your schematic. Run ` npm install ` to install required packages (if using version < 1.7)

```
npm install -g @angular-devkit/schematics-cli
schematics
npm install
```

```
schematics [CollectionName:]SchematicName [options, ...]

By default, if the collection name is not specified, use the internal collection provided
by the Schematics CLI.

Options:
    --debug             Debug mode. This is true by default if the collection is a relative
                        path (in that case, turn off with --debug=false).
    --allowPrivate      Allow private schematics to be run from the command line. Default to
                        false.
    --dry-run           Do not output anything, but instead just show what actions would be
                        performed. Default to true if debug is also true.
    --force             Force overwriting files that would otherwise be an error.
    --list-schematics   List all schematics from the collection, by name.
    --verbose           Show more information.

    --help              Show this message.

Any additional option is passed to the Schematics depending on
```

I'm going to create a new schematics project in my workspace. The reason for this is that in the end, the new schematic will be used to add or updates files in ` lib ` and ` app ` projects. Therefore, I'm going to treat the new schematic project just like another library that requires publishing to a package repository (i.e., npm). Although the structure of the project is a little different from a ` lib ` project type - I'm pretty sure that using the ` ng-packagr ` builder is a good place to start. 

        Note: I'm using the [Nrwl.io Nx](https://nrwl.io/nx) (v6) extension for my workspace environment.

The other reason for including a ` schematic ` collection project in the workspace environment is that I would like to verify and test the usage of the schematic in local apps and libs without having to go throught the entire workflow of publishing and consuming the schematic.

## Blank Schematic
You can create a schematic project - which is really a project that defines a collection of at least one schematic. 

When we use the command below, it will create a schematic collection (project) and a schematic using the provided name ` titanium `. In this example, I want a schematic collection called ` titanium ` (see the name in the package.json) - and I will probably add more schematics to the collection and updates the names and configuration accordingly.

```
schematics blank --name=titanium --dry-run --verbose
schematics blank --name=titanium --verbose
```

After you create a new blank schematic, you will get the following files created for you in the new project. Interestingly, a ` node_modules ` folder is added with a set of packages obviously used specificly for developing and running published schematics. In the ` src ` folder, all of the initial files for a single schematic named ` titanium ` is created. Using the ` blank ` schemtic by convention creates a project and a single schematic of the same name.

```
CREATE /titanium/package.json (535 bytes)
CREATE /titanium/README.md (635 bytes)
CREATE /titanium/src/collection.json (220 bytes)
CREATE /titanium/tsconfig.json (656 bytes)
CREATE /titanium/.gitignore (191 bytes)
CREATE /titanium/.npmignore (64 bytes)
CREATE /titanium/src/titanium/index.ts (314 bytes)
CREATE /titanium/src/titanium/index_spec.ts (466 bytes)
```

### package.json
The ` package.json ` contains the required information for publishing the package. Note that you will need to update and add a ` devDependency ` section to this file before publishing. I updated the name of my package - because I am going to add additional schematics to this collection and I also want to scope the collection.

Note that there is a ` schematics ` property that points to the ` collection.json ` file in the new project. 

```json
{
  "name": "@angularlicious/titanium",
  "version": "0.0.0",
  "description": "A schematics collection for Angularlicious projects.",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "npm run build && jasmine src/**/*_spec.js"
  },
  "keywords": [
    "schematics"
  ],
  "author": "",
  "license": "MIT",
  "schematics": "./src/collection.json",
  "dependencies": {
    "@angular-devkit/core": "^0.6.8",
    "@angular-devkit/schematics": "^0.6.8",
    "@types/jasmine": "^2.6.0",
    "@types/node": "^8.0.31",
    "jasmine": "^2.8.0",
    "typescript": "^2.5.2"
  }
}
```

### collection.json
The ` collection.json ` file is a manifest of schematics that are available to the consumer. The name of the first schematic in our list is the name provided when we created the project. You will most likely have a name for your ` schematic collection ` - typically, the project name (see name in the package.json). Therefore, the names for your specific schematics will be more descriptive and useful for consumers.

By convention, you will need a folder in the ` src ` directory that corresponds to each schematic defined in your schematics collection. The name of the schematic in the collection and the folder name should be the same.

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "titanium": {
      "description": "A sample schematic.",
      "factory": "./titanium/index#titanium"
    }
  }
}
```

When we created the project - we provided the name ` titanium `. This will create a collection of schematics with one item with the same name. The collection allows you to add as many related schematics as you require for your collection with descriptive names. 

For example, the collection of [Angular schematics](https://github.com/angular/angular-cli/tree/master/packages/schematics/angular) when we use the Angular CLI contains several schematics - that is what makes the CLI so useful and powerful, right?****


```json
{
  "schematics": {
    "ng-new": {
      "factory": "./ng-new",
      "schema": "./ng-new/schema.json",
      "description": "Create an Angular workspace.",
      "hidden": true
    },
    "workspace": {
      "factory": "./workspace",
      "schema": "./workspace/schema.json",
      "description": "Create an Angular workspace.",
      "hidden": true
    },
    "serviceWorker": {
      "aliases": [ "service-worker" ],
      "factory": "./service-worker",
      "description": "Initializes a service worker setup.",
      "schema": "./service-worker/schema.json"
    },
    "application": {
      "aliases": [ "app" ],
      "factory": "./application",
      "schema": "./application/schema.json",
      "description": "Create an Angular application."
    },
    "e2e": {
      "factory": "./e2e",
      "schema": "./e2e/schema.json",
      "description": "Create an Angular e2e application.",
      "hidden": true
    },
    "class": {
      "aliases": [ "cl" ],
      "factory": "./class",
      "description": "Create a class.",
      "schema": "./class/schema.json"
    },
    "component": {
      "aliases": [ "c" ],
      "factory": "./component",
      "description": "Create an Angular component.",
      "schema": "./component/schema.json"
    },
    "directive": {
      "aliases": [ "d" ],
      "factory": "./directive",
      "description": "Create an Angular directive.",
      "schema": "./directive/schema.json"
    },
    "enum": {
      "aliases": [ "e" ],
      "factory": "./enum",
      "description": "Create an enumeration.",
      "schema": "./enum/schema.json"
    },
    "guard": {
      "aliases": [ "g" ],
      "factory": "./guard",
      "description": "Create a guard.",
      "schema": "./guard/schema.json"
    },
    "interface": {
      "aliases": [ "i" ],
      "factory": "./interface",
      "description": "Create an interface.",
      "schema": "./interface/schema.json"
    },
    "module": {
      "aliases": [ "m" ],
      "factory": "./module",
      "description": "Create an Angular module.",
      "schema": "./module/schema.json"
    },
    "pipe": {
      "aliases": [ "p" ],
      "factory": "./pipe",
      "description": "Create an Angular pipe.",
      "schema": "./pipe/schema.json"
    },
    "service": {
      "aliases": [ "s" ],
      "factory": "./service",
      "description": "Create an Angular service.",
      "schema": "./service/schema.json"
    },
    "universal": {
      "factory": "./universal",
      "description": "Create an Angular universal app.",
      "schema": "./universal/schema.json"
    },
    "appShell": {
      "aliases": [ "app-shell" ],
      "factory": "./app-shell",
      "description": "Create an app shell.",
      "schema": "./app-shell/schema.json"
    },
    "library": {
      "aliases": ["lib"],
      "factory": "./library",
      "schema": "./library/schema.json",
      "description": "Generate a library project for Angular."
    }
  }
}
```

* factory: points to the entry-point of a specified schematic (usually an index.ts).
* schema: a JSON schema file for the schematic's options
* description: use to provide details about the specified schematic
* hidden

If we look at the Angular ` ng-new ` schematic's factory, we see that it is a Javascript function that takes in options (defined by the schema.json) and returns a ` Rule `. It is good to think about the context of using a schematic. Think of the ` schematic ` as a recipe that most likely has at least one step but mostly likely contains many steps to complete the process. 

When you want to use a schematic (a.k.a. the recipe), you are in effect saying that you want to do something - like create a cake. When you want to make a cake, you are going to need some required ingredients (flour, sugar, eggs, etc). When we use schematics, the ingredients are the inputs to the schematics - they are defined by the ` schema.json ` as options. Since, we will mostly likely use the Angular CLI to execute the schematic, we provide the inputs/options as command-line arguments.

* schematic: is a set of steps to make/do something (Rules) and structure (file and folder templates).
* options: are the required inputs and information provided to the schematic so that it can finish all the steps in the recipe/template.
* output: files and folders that represent the finished product of the schematic.

### Schematic Factory (Point-of-Entry)
The ` factory ` is entry point for the specified schematic. If you are using the ` index.ts ` file, you can provide the path or use the full-path with a file designation.

Also, note that the ` options ` for the factory are typed using the import statement and referencing the ` Schema ` interface. Nice to have strongly typed inputs for the schematic.

```typescript
import { Schema as NgNewOptions } from './schema';
```

The ` ng-new ` factory entry point looks a little complicated or maybe just unfamiliar. Just remember we only need to supply some input to a specific ` recipe ` and we'll get some goodness out of the oven a little later. For now, it is good enough to understand that it is the entry point and we use it to supply the needed inputs for the schematic to run.

```typescript
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
  apply,
  chain,
  empty,
  mergeWith,
  move,
  schematic,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  NodePackageLinkTask,
  RepositoryInitializerTask,
} from '@angular-devkit/schematics/tasks';
import { Schema as ApplicationOptions } from '../application/schema';
import { Schema as WorkspaceOptions } from '../workspace/schema';
import { Schema as NgNewOptions } from './schema';


export default function (options: NgNewOptions): Rule {
  if (!options.name) {
    throw new SchematicsException(`Invalid options, "name" is required.`);
  }

  if (!options.directory) {
    options.directory = options.name;
  }

  const workspaceOptions: WorkspaceOptions = {
    name: options.name,
    version: options.version,
    newProjectRoot: options.newProjectRoot || 'projects',
  };
  const applicationOptions: ApplicationOptions = {
    projectRoot: '',
    name: options.name,
    inlineStyle: options.inlineStyle,
    inlineTemplate: options.inlineTemplate,
    prefix: options.prefix,
    viewEncapsulation: options.viewEncapsulation,
    routing: options.routing,
    style: options.style,
    skipTests: options.skipTests,
    skipPackageJson: false,
  };

  return chain([
    mergeWith(
      apply(empty(), [
        schematic('workspace', workspaceOptions),
        schematic('application', applicationOptions),
        move(options.directory || options.name),
      ]),
    ),
    (_host: Tree, context: SchematicContext) => {
      let packageTask;
      if (!options.skipInstall) {
        packageTask = context.addTask(new NodePackageInstallTask(options.directory));
        if (options.linkCli) {
          packageTask = context.addTask(
            new NodePackageLinkTask('@angular/cli', options.directory),
            [packageTask],
          );
        }
      }
      if (!options.skipGit) {
        const commit = typeof options.commit == 'object'
          ? options.commit
          : (!!options.commit ? {} : false);

        context.addTask(
          new RepositoryInitializerTask(
            options.directory,
            commit,
          ),
          packageTask ? [packageTask] : [],
        );
      }
    },
  ]);
}
```

### Schematic Options (Nothing is really Optional)
The Angular CLI provides a simple mechanism to create a new project. 

```
ng new my-next-amazing-app
```

We typically provide a ` name ` as it is required. But there are many options. The [JSON schema for the ` ng-new ` schematic](angular-cli/packages/schematics/angular/ng-new/schema.json) is a good example. 

Options:

```json
{
  "$schema": "http://json-schema.org/schema",
  "id": "SchematicsAngularNgNew",
  "title": "Angular Ng New Options Schema",
  "type": "object",
  "properties": {
    "directory": {
      "type": "string",
      "description": "The directory name to create the workspace in."
    },
    "name": {
      "description": "The name of the workspace.",
      "type": "string",
      "format": "html-selector",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    },
    "skipInstall": {
      "description": "Skip installing dependency packages.",
      "type": "boolean",
      "default": false
    },
    "linkCli": {
      "description": "Link CLI to global version (internal development only).",
      "type": "boolean",
      "default": false,
      "visible": false
    },
    "skipGit": {
      "description": "Skip initializing a git repository.",
      "type": "boolean",
      "default": false,
      "alias": "g"
    },
    "commit": {
      "description": "Initial repository commit information.",
      "oneOf": [
        { "type": "boolean" },
        {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "message": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "email"
          ]
        }
      ],
      "default": true
    },
    "newProjectRoot": {
      "description": "The path where new projects will be created.",
      "type": "string",
      "default": "projects"
    },
    "inlineStyle": {
      "description": "Specifies if the style will be in the ts file.",
      "type": "boolean",
      "default": false,
      "alias": "s"
    },
    "inlineTemplate": {
      "description": "Specifies if the template will be in the ts file.",
      "type": "boolean",
      "default": false,
      "alias": "t"
    },
    "viewEncapsulation": {
      "description": "Specifies the view encapsulation strategy.",
      "enum": ["Emulated", "Native", "None"],
      "type": "string"
    },
    "version": {
      "type": "string",
      "description": "The version of the Angular CLI to use.",
      "visible": false
    },
    "routing": {
      "type": "boolean",
      "description": "Generates a routing module.",
      "default": false
    },
    "prefix": {
      "type": "string",
      "format": "html-selector",
      "description": "The prefix to apply to generated selectors.",
      "default": "app",
      "alias": "p"
    },
    "style": {
      "description": "The file extension to be used for style files.",
      "type": "string",
      "default": "css"
    },
    "skipTests": {
      "description": "Skip creating spec files.",
      "type": "boolean",
      "default": false,
      "alias": "S"
    }
  },
  "required": [
    "version"
  ],
  "additionalProperties": false
}
```

Please note that each of the option items has a ` type ` property. Strongly typed configurations and applications will save bacon - namely yours. Additionally, another good practice is to create a type definition of the options schema. Doing this allows us to import and use the definition to type the options input in the factory of the schematic.

Here is the [type defintion](https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/ng-new/schema.d.ts) of the ` ng-new ` options schema.

```typescript
export interface Schema {
  /**
   * The directory name to create the workspace in.
   */
  directory?: string;
  /**
   * The name of the workspace.
   */
  name: string;
  /**
   * Skip installing dependency packages.
   */
  skipInstall?: boolean;
  /**
   * Link CLI to global version (internal development only).
   */
  linkCli?: boolean;
  /**
   * Skip initializing a git repository.
   */
  skipGit?: boolean;
  /**
   * Initial repository commit information.
   */
  commit?: { name: string, email: string, message?: string } | boolean;
  /**
   * The path where new projects will be created.
   */
  newProjectRoot?: string;
  /**
   * The version of the Angular CLI to use.
   */
  version?: string;
  /**
   * Specifies if the style will be in the ts file.
   */
  inlineStyle?: boolean;
  /**
   * Specifies if the template will be in the ts file.
   */
  inlineTemplate?: boolean;
  /**
   * Specifies the view encapsulation strategy.
   */
  viewEncapsulation?: ('Emulated' | 'Native' | 'None');
  /**
   * Generates a routing module.
   */
  routing?: boolean;
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string;
  /**
   * The file extension to be used for style files.
   */
  style?: string;
  /**
   * Skip creating spec files.
   */
  skipTests?: boolean;
}
```

## How Does a Schematic Work?
There are (2) main parts of how Schematics work. First, you need an `engine` that can process a Schematic using input as options and creating output in the form of files and folders representing the defined recipe in the schematic. The implementation of the Schematics engine may be described as a rule engine. It executes a rule, that can also execute another rule and so on. Individual rules by themselves are not very interesting. However, when you combine a set of rules that will run in a defined sequence (recipe); and the execution of the rules is consistent with well-known outputs (Tree and SchematicContext) - you get a powerful mechanism to perform Scaffolding magic.

The other main item is the Schematic itself. What it does is really up to the implementation details. Schematics are defined with a schema for options, a factory class as a point of entry, and templates for files and folders. The processing engine can target a single Schematic; or in advanced scenarios may schematics may be added as the input or ouput of other Schematics. Combining the use of several schematics is a very powerful feature.

### Schematic Factory (Where Things are Made)
All schematics require an entry-point. This is where the factory class provides a consistent point of entry. The factory signature provides the mechanism to provide cutomized options for the schematic. The implementor of the schematic will define what the available options are for the specified schematic. Individual options may be defined with default values and configured as required.

The default factory for our new schematic is shown below. We have some new members to get familiar with:

1. Rule
2. Tree
3. SchematicContext

The options for the schematic are defined by the ` schema.json ` file. However, note that the type in the function signature for the ` options ` is ` any `. 

```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function titanium(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```

The first thing to do is to create some options for our schematic. We will need a ` schema.json ` file. Create the new file in the root of the schematic folder. I found an npm package that takes a JSON schema file and creates a type definition file.

```
npm install -g json-schema-to-typescript
```

Here is the command to create the type definition.
```
json2ts schema.json > schema.d.ts
```

The output of the process is a new ` schema.d.ts ` file with the contents below. If you update the schema.json, you will need to use a utility like this update the type definitiion - or you can include it in your build/script process.

```typescript
export interface AngularliciousTitaniumOptionsSchema {
  /**
   * The directory name to create the workspace in.
   */
  directory?: string;
  /**
   * The name of the workspace.
   */
  name: string;
}
```

Update the factory for the schematic to use the typed options. Import the type by referencing the ` schema ` (schema.d.ts) and update the signature of the function so that the ` options ` is using ` AngularliciousTitaniumOptionsSchema ` instead of ` any `.

```typescript
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { AngularliciousTitaniumOptionsSchema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function titanium(options: AngularliciousTitaniumOptionsSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
```

### Rule
Simply, a rule is a Javascript function that takes a ` Tree ` as input and returns a ` Tree ` as output. Rules contain the logic and are responsible for applying the changes to your project.

The return type of the factory is a ` Rule ` - this type contains a ` Tree ` and a ` SchematicContext `. These (2) items are described in more detail below. A rule is something that is evaluated - they are used to make some determination. I would imagine that most schematics will have more than a single Rule and evaluation. There will be many. Therefore, when there are many steps, and each step is a rule and returns a ` Rule `; complex operations can be ` chained ` together to produce the desired result. 

Most likely all rules will have to evaluate to ` true ` without any errors or exceptions before moving on to the next rule in the chain. A schematic will produce an in-memory ` Tree ` that represents all of the changes made by the specified schematic. At the end of processing all of the ` Rules `, all of the changes are comitted and we get new and updated files in our project from the schematic output (Tree). Think of it like comitting a transaction. If there are any errors along the way, there is an exit without making any file changes to the project and without leaving the project in an unstable state. Basically, do no harm when there are exceptions during the execution of a Schematic. 

The definition of the ` Rule ` member is located in the ` interface.ts ` in the `@angular-devkit` package.

https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/src/engine/interface.ts

* A rule can return either of (3) things
  * Another ` Tree ` from another rule.
  * An ` Observable<Tree>; only the first item returned is used.
  * void: nothing; uses the same tree that was passed in as input.

```typescript
/**
 * A source is a function that generates a Tree from a specific context. A rule transforms a tree
 * into another tree from a specific context. In both cases, an Observable can be returned if
 * the source or the rule are asynchronous. Only the last Tree generated in the observable will
 * be used though.
 *
 * We obfuscate the context of Source and Rule because the schematic implementation should not
 * know which types is the schematic or collection metadata, as they are both tooling specific.
 */
export declare type Source = (context: SchematicContext) => Tree | Observable<Tree>;
export declare type Rule = (tree: Tree, context: SchematicContext) => Tree | Observable<Tree> | void;
```

### Tree
Examine the ` Tree ` interface below. It appears to represent information related to the directory, paths, and items (files) for our application/project target of the Schematic. A schematic will create new files or folders; and may even update existing ones. Therefore, during the execution of the Schematic it is processing a set of ` Rule ` items - each one doing a specific thing. Meanwhile, the process chains the completed ` Rule `, including the ` Tree ` and ` SchematicContext ` to each subsequent rule. At the end of the processing, there should be an in-memory representation of the final output of applying all of the rules. If the command to execute a schematic is done without the ` --dry-run ` option and there are no errors, it should replace the current (real) tree (files and folders) with the new and/or updated ones from the in-memory representation created during the execution of the schematic.

https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics/src/tree/interface.ts

```typescript
export interface Tree {
  branch(): Tree;
  merge(other: Tree, strategy?: MergeStrategy): void;

  readonly root: DirEntry;

  // Readonly.
  read(path: string): Buffer | null;
  exists(path: string): boolean;
  get(path: string): FileEntry | null;
  getDir(path: string): DirEntry;
  visit(visitor: FileVisitor): void;

  // Change content of host files.
  overwrite(path: string, content: Buffer | string): void;
  beginUpdate(path: string): UpdateRecorder;
  commitUpdate(record: UpdateRecorder): void;

  // Structural methods.
  create(path: string, content: Buffer | string): void;
  delete(path: string): void;
  rename(from: string, to: string): void;

  apply(action: Action, strategy?: MergeStrategy): void;
  readonly actions: Action[];
}
```

### SchematicContext
Contains information necessary for Schematics to execute some rules, for example when using another schematics, as we need the engine and collection.
****
```typescript
export declare type SchematicContext = TypedSchematicContext<{}, {}>;

/**
 * A SchematicContext. Contains information necessary for Schematics to execute some rules, for
 * example when using another schematics, as we need the engine and collection.
 */
export interface TypedSchematicContext<CollectionMetadataT extends object, SchematicMetadataT extends object> {
    readonly debug: boolean;
    readonly engine: Engine<CollectionMetadataT, SchematicMetadataT>;
    readonly logger: logging.LoggerApi;
    readonly schematic: Schematic<CollectionMetadataT, SchematicMetadataT>;
    readonly strategy: MergeStrategy;
    addTask<T>(task: TaskConfigurationGenerator<T>, dependencies?: Array<TaskId>): TaskId;
}
```

## What Do You Want to Do Today?
So far, we have the infrastructure for our Schematic. But it isn't doing anything. We can add files and folders as templates to the schematic.

1. Create a new folder in the specified Schematic root: files

This allows for a set of folders and files that can be used as templates for the specified schematic. When you create a schematics project the ` tsconfig.json ` configuration excludes

```json
  "exclude": [
    "src/*/files/**/*"
  ]
```

## Resources

[Angular.io Introduction to Schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2)

[NPM Schematics](https://www.npmjs.com/package/@angular-devkit/schematics)

[Schematics.ts](https://github.com/angular/angular-cli/blob/master/packages/angular_devkit/schematics_cli/bin/schematics.ts)