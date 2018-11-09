import { ILogEntry } from "../i-log-entry";

export interface ILogWriter {
    execute(): void;
}