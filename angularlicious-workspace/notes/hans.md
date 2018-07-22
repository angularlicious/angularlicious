# Notes from ngHouston (Youtube)
Be carefule when using schematics as to not overwrite or remove code that is not intended. 

* collection.json
    * factory: points to the factory function using a route-like syntax
    * ex: "factory": "./my-component/index#myComponent"
    * syntax: "factory": "./<name of the schematic>/index#<name of the factory method>"

* rule
    * how to change a file system into another
    * trees are a collection of folders/files in memory with additional features.

* options
    * come from the tooling
    * an object whatever is required as user input

* build
    * You can run build in watch mode with -w switch

* tree
    * create: use to create a file


## Usage of Schematics
Use the ` schematics ` to run the schematic in debug mode.

* projects with more than one developer
* Personal templates
* corporations/enterprise development
    * adding license/copyright information
    * ensuring consistency and code styles
    * creates new routes, menu items, etc. based on when new pages are added to the application (automation); ` ng generate page `
* ng cli 1.4 or later is using schematics

## Extend Existing Schematics (Component)

```typescript
return chain([ // calls the first rule;
    // a list of rules
    (tree: Tree) => {
        // the action of the rule:
        tree.create(options.name, 'hello world');
        return tree;
    }, // next rule called here...
    externalSchematic('@angular/schematics', 'component', {
        // consider passing in [options] for the schematic
        sourceDir: '/app',
        name: 'ng-longmont-component'
    }), // next rule called here...
    externalSchematic('@angular/schematics', 'component', {
        ...options,
        changeDetection: 'OnPush',
        skipImport: true // skips importing the component when a module is not there;
    }), // next rule called here...
    branchAndMerge(
        externalSchematic('@angular/schematics', 'component', {
        ...options,
        changeDetection: 'OnPush',
        skipImport: true // skips importing the component when a module is not there;
        }),
        MergeStrategy.Overwrite
    );
]);
```

The above requires the npm install of @schematics/angular and rxjs.
* install required packages
* use `schematics .:my-component --dry-run=false

## SchematicContext
* has a `logger` similar to console logging.

## Use Tree for Refactoring
* read
* overwrite

## Debugging
node --inspect-brk $(which schematics) ../my-component:my-component --name=hello

1. add break point and run the node command.

* @angular-devkit: tools and libraries to decouple libraries used by the ng CLI
    * schematics
    * refactoring (future)
* @schematics/angular: the schematics that the core ng team supports.

## Where do you start??
See the Hans blog post...for more documentation. Before end of January 2018. 