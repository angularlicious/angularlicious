
# Angular Rules Engine
The Angular Rules Engine is a Javascript/Typescript based rule engine that allows applications to implement simple or sophisticated business rules as well as data validation. It contains a set of common rules ready for use; as well as a framework and set of classes for you to create any custom rule you need for your application.

## Version 6.0.x Released
This version supports all formats listed in the Angular Package Format. 

* [GitHub.com](https://github.com/angularlicious/actions)
* [NPM](https://www.npmjs.com/package/actions)

## There is a reference application on Github.com: [angular-rules-engine-EXAMPLE](https://github.com/angularlicious/angular-rules-engine-EXAMPLE)
The reference applcation demonstrates how to setup and use the rule engine. Check out the implementation of the simple and complex rules. 

## Why use this rule engine?
+ Provides a consistent way to implement business and validation rules and provide a consistent mechanism to retrieve the results.
+ You can use the existing library of rules already implemented. 
   - AreEqual
   - AreNotEqual
   - IsFalse
   - IsTrue
   - IsNullOrUndefined
   - IsNotNullOrUndefined
   - Max
   - Min
   - Range
   - StringIsNotNullEmptyRange
+ You can create a reusable library of rules and use them in one or more applications.
+ Combine default and one or more custom rules to create a `CompositeRule` - a rule that contains other rules (rule set).
+ Each rule has a `Priority` property to execute rule sets in a specified sequence. 
+ Take advantage of Typescript classes to quickly create `simple` or `composite` (nested) rules using the API that is part of the framework.
+ Use the `ValidationContext` to simply add, execute, and retrieve rule results.
+ Code faster using Fluent API style syntax - be more productive.
+ Using the `CompositeRule` base class, you can  create a rule that contains other rules of either `simple` or `composite` types. The rule execution algorithm manages the complexity - now you can create rules and reuse rules to match your business logic. 

# Motivation
Two core principles of good software design are [Separation of Concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns) and [Single Responsibility](https://en.wikipedia.org/wiki/Single_responsibility_principle). Business rules and validation are an integral part of most business applications. There are rules and validations that must occur during processing of business logic. Most applications will combine the business logic with rules and data validation - when this happens, testing and maintaining applications becomes more difficult.

A business rule engine allows the application to have a good Separation of Concerns (SOR). The Angular Rules Engine allows you to:

+ Quickly start using out-of-the-box rules that are already implemented.
+ Create custom rules that are either simple or composite.
+ Create rules that can be reused throughout the application. Code reuse eliminates copy/paste of common rules.
+ Use a single ValidationContext to add rules, execute rules, and evaluate the rule results. 
+ Use a consistent pattern and mechanism to implement your business rules and data validation.

### Future:
These are features that are already in the works:
+ Support for Xor rules.
+ Early exit on rule evaluations on first rule violation.
+ Early exit on rule evaluations on first true evalation. 

# Getting Started :: New Angular 2 Application
1. Create a new Angular 2 project using the Angular CLI
2. Use NPM to install the package: `npm install --save angular-rules-engine`
3. Run npm install. This will retrive the package and add it to the node_modules folder. Any dependencies used by the package will also be downloaded and installed. 

## Getting Started :: Using the Angular-Rules-Engine
There are only (4) steps to use the angular-rules-engine.

1. Initialize a new `ValidationContext`.
2. Add rules to the context.
3. Render the rules.
4. Evaluate the rule results.

## ValidationContext
The ValidationContext is the container object for rules. It allows the developer to add, execute and retrieve the results of the evaluated rules. 

+ Add rules by calling the [addRule()] function. 
+ Execute rules by calling the [renderRules()] function.
+ Retrieve the results (a list of RuleResult items) using the [results] public property.

The following code snippet shows import statements and initialization of the `ValidationContext` as a field member in the class. 

```js
import {ValidationContext} from '../validation/index';
import {ValidationContextState} from '../validation/index';
...
export class myClass {
    validationContext: ValidationContext = new ValidationContext();

    // implementation details here; 
}
```

The following shows the entire `ValidatonContext` class with its implementation details. It is straightforward, you make the calls in the following sequence:

1. `addRule(..)`: Add rules that you want to evaluate.
2. `renderRules()`: Renders all rules added to the ValidationContext.
3. Determine the state of the validation by using either: `hasRuleViolations()` or `isValid()`. Each returns a boolean value indicating the status of the validation context. 

```js
export class ValidatonContext implements IValidationContext {
    state: ValidationContextState = ValidationContextState.NotEvaluated;
    results: Array<RuleResult> = new Array<RuleResult>();
    rules: Array<RulePolicy> = new Array<RulePolicy>();
    source: string;

    /**
    * Use this method to add a new rule to the ValidationContext. 
    */
    addRule(rule: RulePolicy) {
        if (this.source) {
            rule.source = this.source;
        }
        this.rules.push(rule);
        return this;
    }
  
    /**
    * Use this method to execute the rules added to the [ValidationContext].
    */
    renderRules(): ValidatonContextBase {
        this.results = new Array<RuleResult>();
        if (this.rules && this.rules.length < 1) {
            return this;
        }
        this.rules.sort(r => r.priority).forEach(r => this.results.push(r.execute()));
        return this;
    }

    /**
    * Use to determin if the validation context has any rule violations.
    */
    hasRuleViolations(): boolean {
        var hasViolations = false;
        if (this.rules && this.rules.filter(r => r.isValid === false)) {
            hasViolations = true;
        }
        return hasViolations;
    }

    /**
        * *Use to indicate if the validation context is valid - no rule violations.
        * @returns {}: returns a boolean.
        */
    get isValid(): boolean {
        var isRuleValid: boolean = true;
        if (this.rules) {
            var invalidRulesCount = this.rules.filter(r => r.isValid === false).length;
            if (invalidRulesCount > 0) {
                isRuleValid = false;
            }
        }
        return isRuleValid;
    }
}
  
```

## Adding Rules to the ValidationContext
Using an initialized [ValidationContext] object, you can add rules using a Fluent API syntax. The following example uses existing rules. 

A rule requires:

+ Name: the name of the rule.
+ Message: the text to display if the rule fails.

```js
  this.validationContext
      .withSource(this.actionName)
      .addRule(new rules.AreEqual('ThingsAreEqual', 'The things are not equal.', 'this', 'that', false))
      .addRule(new rules.IsTrue('ThisIsTrue', 'This is not true', this.isDone, true))
      .addRule(new rules.IsTrue('Really?', 'Is it really true?', false))
      .addRule(new rules.StringIsNotNullEmptyRange('StringIsGood', 'The string is not valid.', 'Hi', 3, 10));
```

## Executing Rules
When you have added one or more rules to an instance of `ValidationContext`, you are ready to execute the rules. The 
`renderRules()` method will return the `ValidationContext` - each of the rules are evaluated against their specified 
targets. You are now ready to evaluate the rule results. 

```js
this.validationContext.renderRules();
```

## Evaluation Rule Results
After the rules are executed, you can examine the rule results. Each rendered rule will have a result - either valid or not valid, 
based on the rule, criteria, and target value(s). 

Many times it is useful to filter or extract the failed rules from the `ValidationContext`. The following code snippet shows how 
you would extract failed rules that are marked as displayable (i.e., `e.rulePolicy.isDisplayable`) into a list of `ServiceMessage` items.

```js
// Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
this.validationContext.results.forEach( (e) => {
    if(!e.isValid && e.rulePolicy.isDisplayable) {
        let serviceMessage = new ServiceMessage(e.rulePolicy.name, e.rulePolicy.message, MessageType.Error);
        this.serviceContext.addMessage(serviceMessage);
    }
} );
```

## RulePolicy
The [RulePolicy] is the base class for all rule types. The angular-rules-engine contains (2) types of rule implementations:
1. Simple
2. Composite. 

These rule types form the basis of all rules in the rule engine. The rule engine uses the Composite Design Pattern - [click here for more information about this pattern](https://en.wikipedia.org/wiki/Composite_pattern). All rules have the following properties of information. 

+ **isValid**: Use to indicate the status of the rule after evaluation.
+ **message**: Use to provide a message for failed rules. 
+ **name**: Use to create a name that identifies the specified rule.
+ **priority**: Use to assign a numeric value to the rule. Rules are sorted by priority and executed in the same sort sequence. 
+ **result**: The output of an executed rule. It contains the result and `RulePolicy` information.
+ **isDisplayable**: Use to indicate if the rule result is displayable to the caller. Default value is `false`. You must explicitly provide a [true] value for this when initializing a new rule. 
+ **renderType**: Currently the only option is `RenderType.EvaluateAllRules`. 
+ **severity**: Use to indicate the severity (Exception, Warning, or Information) if the rule evaluation is not valid.
+ **source**: Use to indicate the source or location of the rule.

The following `RulePolicy` class is base class for all rule types. Each of the default rules contained in this npm package extends either the SimpleRule or the CompositeRule - and each of these classes extend from the `RulePolicy` class. The allows all rules to have common behavior and execution strategies.

[RulePolicy :: Code](https://github.com/angularlicious/angular-rules-engine/blob/89d878581823817851afbc1e56f819bafa04ecaf/src/rules/RulePolicy.ts)

```js
export class RulePolicy implements IRuleComponent {
    isValid: boolean = true;
    message: string;
    name: string;
    priority: number;
    result: RuleResult;
    isDisplayable: boolean;
    renderType: RenderType = RenderType.EvaluateAllRules;
    severity: Severity = Severity.Exception;
    source: string;

    constructor(name: string, message: string, isDisplayable: boolean);
    constructor(name: string, message: string, isDisplayable: boolean = false, severity: Severity = Severity.Exception, priority: number = 0) {
        this.name = name;
        this.message = message;
        this.isDisplayable = isDisplayable;
        this.priority = priority;
        this.severity = severity;
    }

    execute(): RuleResult {
        console.log('Begin execution of RulePolicy: ' + this.name);
        return this.render();
    }

    /**
     * Each rule must implement this function and return a valid [RuleResult].
     */
    render(): RuleResult {
        throw new Error('Each concrete rule must implement this function and return a valid Result.');
    }
}
```
## IRuleComponent
This interface is just infrastructure for the rule engine. It provides the contract that all rules will contain an `execute()` method - this provides a consistent mechanism to begin the process of all rules that implement this interface. 

```js
export interface IRuleComponent {
    execute(): RuleResult;
}
```
## RuleResult
The output of an executed rule is a `RuleResult` object that contains the rule (`rulePolicy`), an indicator for the rule's state (`isValid`), and a message to be used if the rule has failed. 

```js
import {RulePolicy} from './index';
import {CompositeRule} from './index';

export class RuleResult {
    isValid: boolean = false;
    rulePolicy: RulePolicy;
    message: string;
    target: any;

    constructor(rulePolicy: RulePolicy, target: any);
    constructor(rulePolicy: CompositeRule);
    constructor(rulePolicy: RulePolicy, target?: any) {
        if (rulePolicy != null) {
            this.rulePolicy = rulePolicy;
            this.isValid = rulePolicy.isValid;
            this.message = rulePolicy.message;
        }
        this.target = target;
    }
}
```

## Simple Rules
The main difference between `SimpleRule` and a `CompositeRule` is how they are rendered during their execution. A simple rule has a single evaluation with a single result.

```js
import {RulePolicy} from './RulePolicy';

/**
 * Use this class as a base [extends] class for simple rules. A simple contains
 * a single rule and target to evaluate.
 *
 * If you require a rule that will contain more than one rule, you should
 * use extend the [CompositeRule] class.
 */
export class SimpleRule extends RulePolicy {

    /**
     * The constructor for the simple rule.
     * @param name: The name of the rule.
     * @param message: The message to display if the rule is violated.
     */
    constructor(name: string, message: string, isDisplayable: boolean) {
        super(name, message, isDisplayable);
    }
}
```

The following code is the `IsTrue` rule. This rule evaluates the target and creates a new
`RuleResult` in the `render()` method. Basically, the result is based on the evaluation of the target value. This `render()` method returns a single result. This is much different from a composite rule discussed later that has to return a `RuleResult` for each rule in a list of rules. 

```js
export class IsTrue extends SimpleRule {
    target: boolean;

    constructor(name: string, message: string, target: boolean, isDisplayable: boolean = true) {
        super(name, message, isDisplayable);
        this.target = target;
    }

    render() {
        this.isValid = true;
        if (this.target === false) {//if(not true)-->false;
            this.isValid = false;
        }
        return new RuleResult(this, this.target);
    }
}
```

## Composite Rules
A composite rule is a rule that contains a list of rules to be evaluated. A rule in this list can be a rule that extends from either `SimpleRule ` or `CompositeRule`. This allows for a more complex implementation of rules - it is a very powerful pattern. You can have a rule that contains a list of rules, where one of those rules may be a `CompositeRule`, where one of those rules in the composite rule is a composite side-by-side with other simple and complex rules. 

You are creating a rule-tree where all rules will have to evalute to valid for the container rule to be valid. This pattern allows a developer to create new custom rules and then use those rules with the default rules to orchestrate a rule implementation against a target object or value. 

The `CompositeRule` extends from `RulePolicy` which has the responsible of calling `render()` on each rule. In case of a composite rule, this method will iterate through the list of rules and call the the `execute()` method of each rule. Then the results are processed to determine if *any* of the rules failed. 

```js
import {RulePolicy} from './RulePolicy';
import {RuleResult} from './RuleResult';

export class CompositeRule extends RulePolicy {
    hasErrors: boolean = false;
    results: Array<RuleResult> = new Array<RuleResult>();
    rules: Array<RulePolicy> = new Array<RulePolicy>();

    constructor(name: string, message: string, isDisplayable: boolean) {
        super(name, message, isDisplayable);
    }

    render(): RuleResult {
        this.rules.sort(s => s.priority).forEach(r => this.results.push(r.execute()));
        return this.processResults();
    }

    public hasRules(): boolean {
        if (this.rules && this.rules.length > 0) {
            return true;
        }
        return false;
    }

    processResults(): RuleResult {
        if (this.results.filter(r => (r.isValid === false)).length > 0) {
            this.isValid = false;
            this.hasErrors = true;
        }
        return new RuleResult(this);
    }
}
```

The following shows an implementation of a composite rule. Basically, this rule is using (2) default rules, both of which are also
composite rules. All rules within each composite must evalute to true for this rule to be valid. 

```js
import dCompareResult = require('typescript-dotnet-commonjs/System/CompareResult');
import CompareResult = dCompareResult.CompareResult;
import dCompare = require('typescript-dotnet-commonjs/System/Compare');
import Compare = dCompare;

import {CompositeRule} from './index';
import {RuleResult} from './RuleResult';
import {Primitive} from './index';
import {IsNotNullOrUndefined} from './index';
import {Range} from './index';

/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maxiumum length. 
 */
export class StringIsNotNullEmptyRange extends CompositeRule {
    maxLength: number;
    minLength: number;
    target: Primitive;

    /**
     * The constructor for the [StringIsNotNullEmptyRangeRule].
     * @param name: The name of the rule.
     * @param message: The message to display when the rule is violated.
     * @param target: The target that the rule(s) will be evaluated against.
     * @param minLength: The minimum allowed length of the target value.
     * @param maxLength: The maximum allowed length of the target value.
     */
    constructor(name: string, message: string, target: Primitive, minLength: number, maxLength: number, isDisplayable: boolean = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.minLength = minLength;
        this.maxLength = maxLength;

        this.configureRules();
    }

    /**
     * A helper method to configure/add rules to the validation context. 
     */
    configureRules() {
        this.rules.push(new IsNotNullOrUndefined('StringIsNotNull', 'The string target is null or undefined.', this.target));
        if (this.target != null) {
            this.rules.push(new Range('TargetLengthIsWithinRange', 'The string value is not within the specified range.', this.target.toString().length, this.minLength, this.maxLength));
        }
    }
}
```

The `Range` rule used in the composite rule above uses (2) simple rules to form the composite. Each rule has to evaluate to true for the entire rule to be valid. 

```js
import dCompareResult = require('typescript-dotnet-commonjs/System/CompareResult');
import CompareResult = dCompareResult.CompareResult;
import dCompare = require('typescript-dotnet-commonjs/System/Compare');
import Compare = dCompare;

import {CompositeRule} from './index';
import {RuleResult} from './RuleResult';
import {Primitive} from './index';
import {IsNotNullOrUndefined} from './index';
import {Min} from './index';
import {Max} from './index';

/**
 * Use this rule to determine if the specified target is within the specified range (start and end) values.
 *
 * The range values are inclusive.
 *
 * Ex: 1 is within 1 and 3. The target is valid.
 * Ex: 2 is within 1 and 3. The target is valid.
 * Ex: 0 is not within 1 and 3. The target is not valid.
 * Ex: 4 is not within 1 and 3. The target is not valid.
 */
export class Range extends CompositeRule {
    end: number;
    start: number;
    target: Primitive;

    /**
     * Constructor for the [Range] rule. 
     * @param name: The name of the rule.
     * @param message: A message to display if the rule is violated.
     * @param target: The target object that the rules will be applied to.
     * @param start: The start range value - the lowest allowed boundary value.
     * @param end: The end range value - the highest allowed boundary value.
     * @param isDisplayable: Indicates if the rule violation may be displayed or visible to the caller or client.
     */
    constructor(name: string, message: string, target: Primitive, start: number, end: number, isDisplayable: boolean = false) {
        super(name, message, isDisplayable);
        this.target = target;
        this.start = start;
        this.end = end;
        this.isDisplayable = isDisplayable;

        this.rules.push(new IsNotNullOrUndefined('TargetIsNotNull', 'The target is null or undefined.', this.target));

        if (this.target != null) {
            this.rules.push(new Min('MinValue', 'The value must be equal to or greater than the start range value.', this.target, this.start));
            this.rules.push(new Max('MaxValue', 'The value must be equal to or less than the end range value.', this.target, this.end));
        }
    }
}
```

## Conclusion
There are lots of details in the implementation of a rule engine. However, remember that you only need to initialize a `ValidationContext`, add rules, and then call the `renderRules()` to evaluate the rule set and provide a list of `RuleResult` items. It is that simple. Happy rule rendering.

&copy; 2016-2017, Build Motion, LLC [www.angularlicious.com](http://www.angularlicious.com)