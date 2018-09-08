# @angularlicious/actions
@angularlicious/actions is a framework to build amazing business logic. It is built using Typescript and compliments the [Angular-Rules-Engine](https://www.npmjs.com/package/angular-rules-engine) on [npmjs.com](https://www.npmjs.com/package/angular-rules-engine.
) or [GitHub](https://github.com/angularlicious/angular-rules-engine).

        Note: v6.0.x requires Angular 6.x packages.

## Another Framework - Really??
The word ` framework ` is not bad. We all need structure in our lives. There is structure all around us in everything we do. Knowing what to expect or how to interact with things in real life is nothing new to us, we do it everyday without even thinking about it, right? Sometimes, we need a little coaxing and training. You all know the sandwich shop where you start by indicating the type of sandwich, the bread, toasted or not toasted, cheese, toppings, etc. compared to ordering a ` Big Mac ` at McDonald's. McDonald's doesn't ask you if you want your bun toasted or what kind of cheese you want - I guess you can say they are opinionated in how the build a sandwich. Of course, you can ask for ` no pickles ` and hope it comes out that way.

You may not like it at first, but you will soon learn the ways. You do not say ` large ` at Starbucks - you will soon be corrected with ` Venti `. It is just how it works. We work with it and we get what we want.

Opinionated frameworks are like these companies. We learn how to work with each one and know what to expect. Many things in real life are not much different from using a framework to provide some structure around a given process, like developing software.

So, let's not get hung up on the word ` framework ` thinking that it will just hinder our creativity and brilliance. It is only putting a little structure around what we already do - to allow us to focus on the important things while we create our next masterpiece. I encourage you to investigate the ` @angularlicious/actions ` framework, however, I encourage you more so to use well-known design patterns to implement your business logic. You and your team should have the benefit of a plan, process, and structure for implementing the most important code of the application. If you leave it up to the individual developer, you will get as many variations as there are developers and even more depending on how each deverloper *feels* on any given day. Do you really want to ` hope ` that your business code works - or would you rather have confidence of quantifiable quality of this code.

### What do you want when you develop your applications? 
We want to focus on the solution and the value of the application when it is in the hands of our users. We want to know what to expect and to have things familiar to us - so we can just simply write code that is:

* readable (beutiful code)
* maintainable
* extensible
* testable
* focused on the domain

In order to get ` jobs ` done in life, we use tools. We get familiar with them, hopefully become experts with them and then we create amazing things and/or we just get the job done! Regardless, if we are mowing lawns, baking cakes, writing an email, or building software. What if there was a `tool` that would help you to create amazing business code? What if it was as simple as implementing a well-known ` design pattern ` that has been around for decades; and has real-life examples, works in the real world, etc.

Good for us that a lot of smart people before us created the ` wheel ` - we do not need to do that. The design pattern is called ` template method `. We use this pattern all the time in real life. So, let's not be afraid of the scary name and the words ` design pattern `. Right now, you are probably thinking, "Ugh, not a design pattern!". Relax, you got this.

A design pattern is just a name given to something that is so repeatable and defined that it deserves a name. Learning design patterns isn't something that you only do by reading a book and you are done. First you learn the concept and then you have some higher-level of understanding and knowledge of how the pattern works. Then over time and using the pattern, you will begin to appreciate its goodness and how you can use the pattern with variations to implement your solutions. You will find that you are already using patterns, you just didn't realize there is an established name for it.

## Template Method - Design Pattern
It was mentioned ealier that this pattern exists everywhere in real life. It is really an abstraction, for example, we can say:

* make a cake
* make coffee
* deposit money
* shop for groceries
* make a taco

What do these things have in common? They are things that are performed, have some steps and/or procedures that usually occur in a defined and repeatable sequence. So we can make a cake by calling an ` Execute() ` method that returns a ` Cake `. But what happens internally is:

```javascript
public Execute() : cake {
    // 1. get ingredients
    retrieveIngredients();
    // 2. mix ingredients
    mixIngredients();
    // 3. fill cake pan
    fillCakePan();
    // 4. pre-heat oven
    preHeatOven();
    // 5. bake cake
    bakeCake();
    // 6. decorate cake
    decoreateCake();
    // 7. deliver cake
    return cake;
}
```



Isn't much easier to just say ` Execute() ` and the magic just happens? This is what the template method pattern does for us. We abstract all of the ` methods `, the ` sequence ` of steps by using a single method to execute the ` template `. You define the template for what you need done - it is that simple. Everytime, the cake ` Execute() ` method is called it will use the defined ` template ` to process the request. You get consistent and repeatable results. Is it really possible for ` business logic ` to be implemented using the pattern? 

## Use the Force, Luke!
Components with page lifecycle events, methods, and hooks are not a new thing. They have been around for a long time. I remember learning about JSPs in 2000 and using ASP.NET Web Forms in 2001. Each of these frameworks had a defined and specific way, some today would call this an ` opinion `, to implement web pages to display interesting things.

I know that I just said the word ` opinion `. When most people hear this word, it sometimes invokes negative feelings, or maybe we feel I have my own ` opinions ` so I do not have to listen to and/or believe opinions of others. Recently, I have heard technology people talk about some frameworks being opinionated, like [Angular](https://angular.io), and it is a good thing. Some opinions are very acceptable because they offer many benefits. Can you think of some Angular opinions that are beneficial?

* Uses ` Typescript ` to allow for type safety.
    * Allows us to write higher quality code with less defects.
* Provides ` structural elements ` to build applications (i.e., modules, components, directives, services).
    * Provides consistency in how things are used and arranged.
* Uses ` Dependency Injection ` to provide things to the other things that need it.
    * Reduces code complexity.
    * Increases the testability of our code - less dependencies.

There is a name for this pattern. It is called the ` template method ` pattern. It allows you to create an instance of something and call a single method to begin execution of a series/sequence of events and pipeline methods. The sequence is well-defined and always executes consistently. Therefore, many programmers rely on and use this pattern to create a specific flow that is reliable and consistent. 

The ` @angularlicious/actions ` framework is using the same ` template method ` design pattern that all of these component framework architects have been using for decades. It is a simple, and yet powerful pattern. We have the use of this pattern in UI display elements mentioned previously. However, there really has not been too much in terms of frameworks or tools for implementers of business logic. We have to agree that business logic is really the heart of the application. Without business logic we do not have an application - no matter how pretty the UI looks, right? 

When we think about business logic, we are trying to make determinations on what to do. We need to do things like persisting and retrieving data. We might have concerns about the current user - are they authenticated? Is the specified user authorized to do the specified operation? Are there specific business rules that need to be satisfied in order to allow the request to continue? What about data validation? Does the data collected by the application have to meet certain validation rules in order to allow the request to continue? What if you have a team of application developers. Are they allowed to implement code to cover these concerns according to how they feel that day? Is there a way for the entire team to have a structure, framework, or tool that would allow them to do all of these things consistently and ` still ` allow them to be flexible in their designs and coding tasks?

Why yes, there is! The ` @angularlicious/actions  ` framwork provides a consistent and maintainable mechanism for implementing business logic. More importantly, it provides the ability for 100% code coverage when you unit test. It is often a struggle for teams to unit their business logic. One of the main complaints is that it is too difficult. Why? This is due to the inconsistency of implementation and/or an architecture that was not designed to support unit testing from the beginning. If you are building an enterprise application and you have a team of developers, the application deserves a consistent implementation of business logic. This isn't the time for any developers to start singing, "I just gotta be me!". During my 2 decades of building enterprise applications, I have learned (sometimes, the hard way) that you need consistency. For example, I remember applications that had not only a consistent horizontal layered architecture with clear separation of concerns - they also had consistent vertical implementations of the domain. Sometimes more than a dozen vertical domains implemented consistently. As a developer, if you learned and understood the layered architecture, and you also learned and understood a single vertical domain implementation - you could work on any part of the application. It was that consistent. 

One of the consulting companies I worked for allowed me to use and define a framework for implementing business logic using the ` template method ` pattern. One of the other benefits, is that the implementations are consistent between other projects and applications. You have long-term consistency. This has allowed my current team that includes junior developers the opportunity to become productive faster.

## Why Use @angularlicious/actions?
Business logic is the heart of your application. It deserves as much attention if not more than the visible parts of the application. Many times, the architecture or design of the business layer will determine the success of the application. For most business or enterprise applications you will want to strive for the following: 

+ Testability: 
+ Extensibility: 
+ Maintainability:
+ Performance: 

There are many concerns for an application beyond just the business logic. Many Angular developers will also need to consider how to implement and integrate the following into their new Angular application. Most tutorials give you the "Hello World" and "Tour of Heroes" as examples of the technology. However, you still need to apply well-established principles and patterns to create an application that has the following: 

+ Logging
+ Exception Handling
+ Data Validation
+ Business Rules
+ Authorization (Permission-based)
+ Interaction with Angular Services
    + Custom Services
    + Core Angular Services (i.e., Http, Route)

` @angularlicious/actions ` is an NPM package that provides a framework for implementing business logic for Typescript applications. The action framework is an object-oriented set of classes that provide a mechanism to create testable, extensible, and maintainable business logic code. ` Business Actions ` developed using this framework provides a consistency in the implementation of business logic that allows developers to be more productive - as well as enabling developers to become familiar with the code base faster. 

The framework implements a [` Template Method Design Pattern `](http://www.dofactory.com/net/template-method-design-pattern) - which when combined with the [` Angular-Rules-Engine `](https://www.npmjs.com/package/angular-rules-engine) provides a productive and intuitive development environment to create complex business logic.

*NOTE*: The ` @angularlicious/actions ` framework is a port from the ` BuildMotion Framework ` - which is ****
a Microsoft .NET framework for building .NET Web APIs and Domain Services with a rich business 
logic layer. It uses ` actions ` and a ` rule engine ` to build extensible and maintainable 
business logic and rules. Available on Nuget at: [https://www.nuget.org/packages/BuildMotion/](https://www.nuget.org/packages/BuildMotion/) with thousands of downloads combined ([Vergosity](https://www.nuget.org/packages/BuildMotion.Framework/)/BuildMotion).

NPM: [https://www.npmjs.com/package/@angularlicious/actions](https://www.npmjs.com/package/@angularlicious/actions)

#### IAction
All actions implement the following ` interface `. The ` execute() ` method is used as the entry point to start the processing pipeline of an action.

```js
export interface IAction {
	execute();
}
```

The pipeline is a set of methods that execute in a predefined sequence. The framework requires the implementation of only (2) methods: processAction and validateActionResult.

1. start
2. audit
3. preValidateAction
4. evaluateRules
5. postValidateAction
6. preExecuteAction
7. processAction
8. postExecuteAction
9. validateActionResult
10. finish

As you can see from the code below, that the ` processAction ` will be performed if there are no rule violations. The ` evaluateRules() ` method will set the action's ` allowExecution ` boolean property to false if there are any failed rule evaluations. You can add additional logic in your application to set this property to indicate if the actual business logic contained in the ` processAction() ` method should be executed. 

```js
import {ValidationContext} from 'angular-rules-engine/validation/index';
import {ValidationContextState} from 'angular-rules-engine/validation/index';
import {IAction} from './IAction';
import { ActionResult } from './index';

/**
 * This is the framework Action class that provides the pipeline of pre/post
 * execution methods. This class implements the [Template Method] pattern.
 *
 * The pre-execute functions that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction(); 
 * 
 * The post-execution functions that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */ 
export class Action implements IAction {
    allowExecution = true;
    _validationContext: ValidationContext = new ValidationContext();
    actionResult: ActionResult = ActionResult.Unknown;

    constructor() {}

    get validationContext(): ValidationContext {
        return this._validationContext;
    }

	/**
	 * Use this method to execute a concrete action. A concrete action must implement
	 * the [processAction] and the [validateActionResult] functions to be a valid
	 * action. 
	 */
    execute() {
        console.log('Preparing to execute action.');
        this.processActionPipeline();
    }

    private processActionPipeline() {
        this.startAction();
        if (this.allowExecution) {
            this.processAction();
        }
        this.finishAction();
    };

    private startAction() {
        console.log('Starting action.');
        this.start();
        this.audit();
        this.preValidateAction();
        this.evaluateRules();
        this.postValidateAction();
        this.preExecuteAction();
    }

    private finishAction() {
        console.log('Finishing action.');
        this.postExecuteAction();
        this.validateActionResult();
        this.finish();
    }

	
    private processAction() {
        console.log('Processing action.');
        this.performAction();
    }

	/**
	 * All action must implement this function. This is where your
	 * [business logic] should be implemented. This function is called if
	 * there are no validation rule exceptions.
	 */
    performAction() {
        throw new Error('Not implemented. Requires implementation in concrete action.');
    }

	/**
	 * Override/Implement this function to perform an early operation in the action pipeline.
	 * This function belongs to the pre-execute functions of the action pipeline.
	 */
    start() {
        console.log('Starting action.');
    }

	/**
	 * Implement this function to perform any auditing features during the pre-exectuion of the
	 * business logic.
	 */
    audit() {
        console.log('Auditing action.');
    }

	/**
	 * Use this function to setup any validation rules before the validation happens. This
	 * function is called before [evaluateRules].
	 */
    preValidateAction() {
        console.log('Pre-validating action.');
    }

	/**
	 * Use this function to implement the execution of the validation and business rules. This
	 * function is called after [preValidateAction].
	 */
    evaluateRules(){
        console.log('Evaluating action rules.');
        let context = this.validateAction();
        if (context.isValid) {
            this.allowExecution = true;
            this.validationContext.state = ValidationContextState.Success;
        } else {
            this.allowExecution = false;
            this.validationContext.state = ValidationContextState.Failure;
        }
    }

	/**
	 * Use to determine or handle the results of the rule evalation. This
	 * function is called after the [evaluateRules].
	 */
    postValidateAction() {
        console.log('Post-Validation of action.');
    }

	/**
	 * Use this function to perform any setup before the action is executed. 
	 */
    preExecuteAction() {
        console.log('Pre-execution of action.');
    }

	/**
	 * Use this funciton to evaluate the action after the the business logic within
	 * the [performAction] has executed.
	 */
    postExecuteAction() {
        console.log('Post-execution of action');
    }

	/**
	 * This function requires implementation to determin the state and result of the action.
	 * Use this opportunity to validate the results. 
	 */
    validateActionResult(): ActionResult {
        throw new Error('Concrete actions required to implement this method.');
    }

	/**
	 * Use this function to perform any cleanup, logging, or disposing of resources used
	 * by the action. This is the last function called during the pipeline.
	 */
    finish() {
        console.log('Finish action.');
    }

	/**
	 * Implement this function to perform validation of business rules and data.
	 */
    validateAction() {
        console.log('Validating the action.');
        return this.validationContext;
    }
}
```

A typical implementation of an ` action ` would be a concrete business action that ` extends ` from a base action class. The base action class extends from the framework's ` action ` class. This structure allows for the concrete actions to focus on the specific business logic (using Single-Responsibility principle) while having common or shared implementation of the pipeline methods in the base class. 

As you can see from the code snippet below - the responsibility of the action is to get a ` TimeSpan ` between two different data objects. This ` GetTimeSpanAction ` action extends the base class ` ActionBase `. The code in this action is clean. Basically, we are elevating business logic from implementations in ` methods ` of a class to its own class. Implementing business logic with actions allow you to use all of the goodness of object-oriented programming, such as: inheritance, abstraction, encapsulation, and polymorphism. OOP allows for the use of common design patterns that simplify many programming efforts.

Note the implementation of the business rules in the ` preValidateAction ` method. This allows the rules to be setup and ready for evaluation when the ` evaluateRules() ` method is called using the framework's action pipeline. The solution now has a consistent mechanism to implement rules, evaluate rules, and retrieve rule results. Consistency improves quality and the ability to isolate issues using unit and specification tests. 

```js
export class GetTimeSpanAction extends ActionBase {

    response: TimeSpan;

    /**
     * Constructor for the action. 
     * @param startDate Required.
     * @param endDate Required.
     */
    constructor(
        private startDate: DateTime,
        private endDate: DateTime) {
        super(new LoggingService());
        this.actionName = 'GetTimeSpanAction';
    }

    /**
     * Use this action pipeline method to add validation or business rules to the ValidationContext before the 
     * [evaluateRules] action pipeline method is called. 
     */
    preValidateAction() {
        // both dates need to be valid and not null/undefined;
        this.validationContext.addRule(new rules.IsNotNullOrUndefined('StartDateIsNotNull', 'The start date is not valid. Cannot be null or undefined.', this.startDate, true));
        this.validationContext.addRule(new rules.IsNotNullOrUndefined('EndDateIsNotNull', 'The end date is not valid. Cannot be null or undefined.', this.endDate, true));
    }

    performAction() {
        const span = DateTime.between(this.startDate, this.endDate);
        console.log(`the timespan between ${this.startDate.toUniversalTime.toJsDate()} and ${this.endDate.toUniversalTime.toJsDate()} is ${span.minutes} minutes.`);
        this.response = span;
    }

    /**
     * Use this action pipeline method to validate the result of the action - based on rule violations.
     */
    validateActionResult(): ActionResult {
        this.loggingService.log(this.actionName, LoggingSeverity.Information, `Running [validateActionResult] for ${this.actionName}.`);
        if (this._validationContext.hasRuleViolations()) {
            this.businessProvider.loggingService.log(this.actionName, LoggingSeverity.Error, `The ${this.actionName} contains rule violations.`);
            this.actionResult = ActionResult.Fail;
        }
        this.actionResult = this.serviceContext.isGood() ? ActionResult.Success : ActionResult.Fail;
        return this.actionResult;
    }
}
```
The base class ` ActionBase ` provides the opportunity to implement shared/common functionality of all actions that extend from this class. It allows access to ` infrastructure ` concerns but doesn't dirty the concrete implementations of concrete actions. 

You can implement any of the ` @angularlicious/actions ` pipeline methods, like:

* validateAction()
* postValidateAction()
* postExecuteAction()

You can also implement shared helper functions/methods that each of the actions will have access to:

* compareLogItemEventDateTime()
* setRegulation()

The implementation of the ` Do() ` method is a nice extension-like method that allows for the injection of infrastructure services to all actions that extend from this base action class. It also has the added benefit of simplifying the signatures of the concrete actions to contain only the members that the action is concerned with. We all hate method signatures that contain useful but non-relevant information to the concern of the business logic. Things like:

* logging services
* data access
* connection strings
* user information
* ...

```js
export class ActionBase extends Action {
    loggingService: LoggingService;
    serviceContext: ServiceContext;
    businessProvider: BusinessProvider;
    actionName: string;

    // Use the following property(s) to provide contextual rule/regulation information in validation responses. 
    RuleSet: string = '';
    Regulation: Regulation = new Regulation();
    HasRegulation: boolean = false;//default for action implementation; set to true if a regulation is setup

    constructor(loggingService: LoggingService) {
        super();
        this.loggingService = loggingService;
    }

    /**
    * Use the [Do] method to perform the action.
    */
    Do(businessProvider: BusinessProvider) {
        this.businessProvider = businessProvider;
        this.serviceContext = businessProvider.serviceContext;
        this.loggingService = businessProvider.loggingService;

        this.execute(); //entry point into the pipeline of methods (template method pattern)
    }

    /**
     * A helper method to setup regulation information for actions that are processing federal regulartory rules.
     * @param regulationId: A unique identifier for the regulation.
     * @param regulationText: A description of the regulation.
     * @param url Use to indicate the regulation source online.
     */
    setRegulation(regulationId: string, regulationText: string, url: string = '') {
        if (regulationId && regulationText) {
            this.HasRegulation = true;
            this.Regulation.RegulationId = regulationId;
            this.Regulation.Regulation = regulationText;
            this.Regulation.Url = url;
        }
        else {
            this.loggingService.log(this.actionName, LoggingSeverity.Error, `Cannot setup regulation information without a valid identifier and regulation text.`);
        }
    }

    /**
    * This is a required implementation if you want to render/execute the rules tha{t j
    * are associated to the specified action.
    */
    validateAction(): ValidationContext {
        return this.validationContext.renderRules();
    }

    postValidateAction() {
        this.loggingService.log(this.actionName, 
            LoggingSeverity.Information, 
            `Preparing to determine if the action contains validation errors in ${this.actionName}`);

        if (this.validationContext.hasRuleViolations()) {
            this.loggingService.log(this.actionName, LoggingSeverity.Information, `The target contains validation errors in ${this.actionName}`);

            // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
            this.validationContext.results.forEach((e) => {
                if (!e.isValid && e.rulePolicy.isDisplayable) {
                    let serviceMessage = new Message(e.rulePolicy.name, e.rulePolicy.message, MessageType.Error);
                    serviceMessage.DisplayToUser = true;
                    serviceMessage.Source = this.actionName;
                    serviceMessage.RuleSet = this.RuleSet;
                    if (this.HasRegulation) {
                        serviceMessage.Regulation = this.Regulation;
                    }
                    this.serviceContext.Messages.push(serviceMessage);
                }
            });
        }
    }

    postExecuteAction() {
        if (this.actionResult === ActionResult.Fail) {
            this.serviceContext.Messages.forEach((e) => {
                if (e.MessageType === MessageType.Error) {
                    this.loggingService.log(this.actionName, LoggingSeverity.Error, e.toString());
                }
            });
        }
    }

    /**
     * Use this method to sort a LogItem by the [EventDateTime] property.
     * @param a
     * @param b 
     */
    protected compareLogItemEventDateTime(a: LogItem, b: LogItem) {
        if (a.EventDateTime < b.EventDateTime) {
            return -1;
        }
        if (a.EventDateTime > b.EventDateTime) {
            return 1;
        }
        return 0;
    }
}
```

Using the action shown above is easy. You instantiate the action, pass in the required parameters. Call the ` Do(this) ` method of the action and return the response. Notice how clean and consistent the code is for calling business actions implemented using the ` @angularlicious/actions ` NPM package. 

```js
getTimeSpan(startDate: DateTime, endDate: DateTime): TimeSpan {
    let action = new actions.GetTimeSpanAction(startDate, endDate);
    action.Do(this);
    return action.response;
}
```


## Testable
Each action is a single unit of responsibility that is 100% testable. 

## Extensible
The design pattern used to implement the business action allows for many extensibility endpoints. You can encapsulate common and/or shared behavior in a base class. You can provide custome implementations for each of the pipeline methods.

## Maintainable
Using a defined pattern and sequence of methods allows for a consistent implementation of business logic. Consistency allows for easier maintenance. Also, adding new features and/or functionaltiy to actions is easier because you can take advantage of OOP techniques.

## Performant
Business action classes are just Javascript in the end after transpilation. The framework takes advantage of ES6 elements as well as Typescript features to provide an OOP experience. A single business action should perform as well as any other Javascript function in the end. 

&copy; 2016-2018 Build Motion, LLC [www.angularlicious.com](http://www.angularlicious.com)
[Matt Vaughn on LinkedIn](https://www.linkedin.com/in/matt-vaughn-857a982?trk=profile-badge)
