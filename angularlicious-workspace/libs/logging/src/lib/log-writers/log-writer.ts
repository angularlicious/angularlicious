import { ILogWriter } from "./i-log-writer";
import { Injectable } from "@angular/core";
import { ValidationContext, IsTrue, IsNotNullOrUndefined, StringIsNotNullEmptyRange } from "@angularlicious/rules-engine";
import { ILogEntry } from "../i-log-entry";

// @Injectable()
 export abstract class LogWriter implements ILogWriter {
    hasWriter: boolean;// = false;
    targetEntry: ILogEntry;

    /**
     * Use this method to execute the write process for the
     * specified [Log Entry] item.
     */
    execute(): void {
        this.setup();
        if (this.validateEntry()) {
            this.write();
        }
        this.finish();
    }

    /**
     * Use to perform an setup or configuration of the [writer]. 
     * The [setup] method runs on all executions of the writer - and
     * is called before the [write] method.
     */
    public abstract setup(): void;

    /**
     * Use to validate the [log entry] before attempting to write
     * using the specified [log writer]. 
     * 
     * Returns a [false] boolean to indicate the item is not valid.
     */
    public validateEntry(): boolean {
        const validationContext = new ValidationContext();
        validationContext.addRule(
          new IsTrue(
            'LogWriterExists',
            'The log writer is not configured.',
            this.hasWriter
          )
        );
        validationContext.addRule(
          new IsNotNullOrUndefined(
            'EntryIsNotNull',
            'The entry cannot be null.',
            this.targetEntry
          )
        );
        validationContext.addRule(
          new StringIsNotNullEmptyRange(
            'SourceIsRequired',
            'The entry source is not valid.',
            this.targetEntry.source,
            1,
            100
          )
        );
        validationContext.addRule(
          new StringIsNotNullEmptyRange('MessageIsValid', 'The message is required for the [Log Entry].', this.targetEntry.message, 1, 2000)
        );
        validationContext.addRule(
          new IsNotNullOrUndefined(
            'TimestampIsRequired',
            'The timestamp must be a valid DateTime value.',
            this.targetEntry.timestamp
          )
        );
    
        return validationContext.renderRules().isValid;
      }

    /**
     * Use to implement the actual write of the [Log Entry].
     */
    public abstract write(): void;

    /**
     * Use to finish the process or clean-up any resources.
     */
    public finish(): void {

    }
}