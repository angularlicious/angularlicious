import { ILogEntry } from "./i-log-entry";
import { Severity } from "./severity.enum";

export class LogEntry implements ILogEntry {
    application: string;
    source: string;    
    severity: Severity;
    message: string;
    timestamp: Date;
    tags?: string[];

    constructor(application: string, source: string, severity: Severity, message: string, tags?: string[] | null) {
        this.application = application;
        this.source = source;
        this.severity = severity;
        this.message = message;
        this.timestamp = new Date(Date.now());
        this.tags = tags;
    }
}