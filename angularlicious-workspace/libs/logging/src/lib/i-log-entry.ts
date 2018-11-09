import { Severity } from "./severity.enum";

export interface ILogEntry {
    source: string;
    application: string;
    severity: Severity;
    message: string;
    timestamp: Date;
    tags?: string[];
}