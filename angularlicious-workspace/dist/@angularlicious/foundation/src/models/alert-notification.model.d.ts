export declare class AlertNotification {
    type: string;
    header: string;
    title: string;
    messages: Array<string>;
    showAlert: boolean;
    constructor(header: string, title: string, messages?: Array<string>, type?: string);
}
