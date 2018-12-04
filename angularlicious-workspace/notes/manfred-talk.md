# Introduction

* there are many tasks that are difficult to do manually
* use Schematics to automate complex and/or boring tasks

# Schematics
Name of the tool, the project, and the code generator to do interesting things. It is experiemental and not production-ready.

Examples:
* Nrwl.io Nx: monorepo and workspace.
* NgRx and Schematics: generate the boiler-plate

## Atomic
Changes are staged in a ` Tree ` object that can be committed when the process is in a good state.

## Create a Schematic with a Schematic

Use the CLI tool to create a new schematic project. Install the CLI.

```
npm install -g @angular-devkit/schematics-cli
```


## Rules

1. Use the same versions as your CLI-generate project. Align the ` devDependencies `. Then ` npm install ` to update.

### Blank Project
The project is in ` npm package ` format. With a ` package.json `.

```
schematics blank ---name=hello-world
```

Build the schematic with the command: ` npm run build `. Test with:

* the ` .: ` syntax will always run in ` --dry-run ` mode.

```
schematics .:hello-world
```

1. `npm install hello-world` or ` npm link ..\hello-world `
2. schematics hello-world:hello-world --dry-run=false

syntax: schematics <name of collection>:<name of the schematic in the collection> ?optional --dry-run=true

The ` schematics ` call will always run with `--dry-run` with a default of true.

or use ` ng generate hello-world:hello-world `

Create a project with some sample code. Use to learn. Review the comments and project structure. 

```
schematics schematic --name-hello-world
```

## Questions

* The schema options provided by the CLI
    * name
    * appRoot
    * path
    * sourceDir

## Templates

* use <%= classify(name) %>
    * syntax: <%= <utility method>(<name of the option property>)>
* __path__
* __name@dasherize__
    * use a function called `dasherize` with the <option property as input>


Using templates
The source is the piped templates in the files folder. 

* filterTemplates: filters the templates
* template: executes the templates
    * with options and string utilities
    * use the `...` spread operator to pass the properties of the specified items (options and stringUtils)
    * the object is not passed, but the properties within the objects are passed to the template
*  move:
    *  moves things to the correct folder 
    *  replacing the placeholders within the file names.

```typescript
const templateSource = apply(url('./files'), [
        filterTemplates(options),
        template({
          ...stringUtils,
          ...options
        }),
        move(options.sourceDir)
      ]);
```

You can create a new rule by chaining existing rules.

* branchAndMerge: branches the tree in the memory
* mergeWith: merges changes

```typescript
 const rule = chain([
        branchAndMerge(chain([
          mergeWith(templateSource),
          
          addDeclarationToNgModule(options, options.export),
          injectServiceIntoAppComponent(options)
        ]))
      ]);

      return rule(host, context);
```

## Options
Use design and analysis to determine what the options schema will be.

* Examine the use cases, variations to determine what the otpions schema will look like. 
* Define the schema, types, defaults.
* Determine what items may be required or not. 
* Generate the smallest footprint of code as possible.

## Resources

* Tutorial
    * https://goo.lg/kGS6L5
* Angular-CRUD
    * https://www.npmjs.com/package/angular-crud