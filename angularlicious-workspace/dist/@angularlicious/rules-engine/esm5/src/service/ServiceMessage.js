/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to create a message for the current [ServiceContext].
 */
var /**
 * Use this class to create a message for the current [ServiceContext].
 */
ServiceMessage = /** @class */ (function () {
    /**
     *
     * @param name The name of the message.
     * @param message The display text of the message.
     * @param messageType: Indicates the type of message.
     * @param source: Indicates the source of the message.
     * @param displayToUser Use to indicate if the specified message should be displayed to the user.
     */
    function ServiceMessage(name, message, messageType, source, displayToUser) {
        if (displayToUser === void 0) { displayToUser = false; }
        this.Name = name;
        this.Message = message;
        if (message) {
            this.MessageType = /** @type {?} */ (messageType);
        }
        if (source) {
            this.Source = /** @type {?} */ (source);
        }
    }
    /**
     * Use this extension method to add the name of the message.
     * @param name The name of the service message.
     */
    /**
     * Use this extension method to add the name of the message.
     * @param {?} name The name of the service message.
     * @return {?}
     */
    ServiceMessage.prototype.WithName = /**
     * Use this extension method to add the name of the message.
     * @param {?} name The name of the service message.
     * @return {?}
     */
    function (name) {
        this.Name = name;
        return this;
    };
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param message The display text of the service message.
     */
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    ServiceMessage.prototype.WithMessage = /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    function (message) {
        this.Message = message;
        return this;
    };
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param messageType: Use to indicate the message type.
     */
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    ServiceMessage.prototype.WithMessageType = /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    function (messageType) {
        this.MessageType = messageType;
        return this;
    };
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param source: Use to indicate the source of the message.
     */
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    ServiceMessage.prototype.WithSource = /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    function (source) {
        this.Source = source;
        return this;
    };
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param displayToUser: A boolean value to indicate if the message can be displayed to the user.
     */
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    ServiceMessage.prototype.WithDisplayToUser = /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    function (displayToUser) {
        this.DisplayToUser = displayToUser;
        return this;
    };
    /**
     * Use this method return a string representing the ServiceMessage.
     */
    /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    ServiceMessage.prototype.toString = /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    function () {
        return "Name: " + this.Name + "; Message: " + this.Message + "; MessageType: " + this.MessageType.toString() + "; Source: " + this.Source + "; DisplayToUser: " + this.DisplayToUser;
    };
    return ServiceMessage;
}());
/**
 * Use this class to create a message for the current [ServiceContext].
 */
export { ServiceMessage };
function ServiceMessage_tsickle_Closure_declarations() {
    /**
     * Use to specify the name of the message.
     * @type {?}
     */
    ServiceMessage.prototype.Name;
    /**
     * Use to specify the message.
     * @type {?}
     */
    ServiceMessage.prototype.Message;
    /**
     * Use to specifiy
     * @type {?}
     */
    ServiceMessage.prototype.MessageType;
    /**
     * Use to indicate the source of the message.
     * @type {?}
     */
    ServiceMessage.prototype.Source;
    /**
     * Use to indicate if the specified message should be displayed to the user.
     * @type {?}
     */
    ServiceMessage.prototype.DisplayToUser;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZU1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBOzs7QUFBQTtJQXdDRTs7Ozs7OztPQU9HO0lBQ0gsd0JBQ0UsSUFBWSxFQUNaLE9BQWUsRUFDZixXQUF5QixFQUN6QixNQUFlLEVBQ2YsYUFBOEI7UUFBOUIsOEJBQUEsRUFBQSxxQkFBOEI7UUFFOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxXQUFXLHFCQUFHLFdBQTBCLENBQUEsQ0FBQztTQUMvQztRQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsTUFBTSxxQkFBRyxNQUFnQixDQUFBLENBQUM7U0FDaEM7S0FDRjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsaUNBQVE7Ozs7O0lBQVIsVUFBUyxJQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsb0NBQVc7Ozs7O0lBQVgsVUFBWSxPQUFlO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsd0NBQWU7Ozs7O0lBQWYsVUFBZ0IsV0FBd0I7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxtQ0FBVTs7Ozs7SUFBVixVQUFXLE1BQWM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCwwQ0FBaUI7Ozs7O0lBQWpCLFVBQWtCLGFBQXNCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjtJQUVEOztPQUVHOzs7OztJQUNILGlDQUFROzs7O0lBQVI7UUFDRSxNQUFNLENBQUMsV0FBUyxJQUFJLENBQUMsSUFBSSxtQkFDdkIsSUFBSSxDQUFDLE9BQU8sdUJBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsa0JBQzNDLElBQUksQ0FBQyxNQUFNLHlCQUNPLElBQUksQ0FBQyxhQUFlLENBQUM7S0FDMUM7eUJBNUhIO0lBNkhDLENBQUE7Ozs7QUF4SEQsMEJBd0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVzc2FnZVR5cGUgfSBmcm9tICcuL01lc3NhZ2VUeXBlJztcclxuXHJcbi8qKlxyXG4gKiBVc2UgdGhpcyBjbGFzcyB0byBjcmVhdGUgYSBtZXNzYWdlIGZvciB0aGUgY3VycmVudCBbU2VydmljZUNvbnRleHRdLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VNZXNzYWdlIHtcclxuICBcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuICovXHJcbiAgTmFtZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmeSB0aGUgbWVzc2FnZS4gKi9cclxuICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBzcGVjaWZpeSAgKi9cclxuICBNZXNzYWdlVHlwZTogTWVzc2FnZVR5cGU7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBpbmRpY2F0ZSB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIFNvdXJjZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuICovXHJcbiAgRGlzcGxheVRvVXNlcjogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB0aGUgW1NlcnZpY2VNZXNzYWdlXS5cclxuICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgZGlzcGxheSB0ZXh0IG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogSW5kaWNhdGVzIHRoZSB0eXBlIG9mIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIHNvdXJjZTogSW5kaWNhdGVzIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlUb1VzZXI6IEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZSBpcyBkaXNwbGF5YWJsZS5cclxuICAgKi9cclxuXHJcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nLCBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLCBzb3VyY2U/OiBzdHJpbmcpO1xyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZ1xyXG4gICk7XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyIFVzZSB0byBpbmRpY2F0ZSBpZiB0aGUgc3BlY2lmaWVkIG1lc3NhZ2Ugc2hvdWxkIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci4gXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlOiBzdHJpbmcsXHJcbiAgICBtZXNzYWdlVHlwZT86IE1lc3NhZ2VUeXBlLFxyXG4gICAgc291cmNlPzogc3RyaW5nLFxyXG4gICAgZGlzcGxheVRvVXNlcjogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVR5cGUgPSBtZXNzYWdlVHlwZSBhcyBNZXNzYWdlVHlwZTtcclxuICAgIH1cclxuICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2UgYXMgc3RyaW5nO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBhZGQgdGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTmFtZSA9IG5hbWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBtZXNzYWdlIHRleHQgdG8gdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgc2VydmljZSBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIFdpdGhNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5NZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtNZXNzYWdlVHlwZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIG1lc3NhZ2UgdHlwZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZVR5cGUobWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlKSB7XHJcbiAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbU291cmNlXSBvZiB0aGUgU2VydmljZU1lc3NhZ2UgaXRlbS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoU291cmNlKHNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLlNvdXJjZSA9IHNvdXJjZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgZXh0ZW5zaW9uIG1ldGhvZCB0byBzZXQgdGhlIFtEaXNwbGF5VG9Vc2VyXSBpbmRpY2F0b3Igb2YgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBBIGJvb2xlYW4gdmFsdWUgdG8gaW5kaWNhdGUgaWYgdGhlIG1lc3NhZ2UgY2FuIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlci5cclxuICAgKi9cclxuICBXaXRoRGlzcGxheVRvVXNlcihkaXNwbGF5VG9Vc2VyOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLkRpc3BsYXlUb1VzZXIgPSBkaXNwbGF5VG9Vc2VyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBtZXRob2QgcmV0dXJuIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgU2VydmljZU1lc3NhZ2UuXHJcbiAgICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gYE5hbWU6ICR7dGhpcy5OYW1lfTsgTWVzc2FnZTogJHtcclxuICAgICAgdGhpcy5NZXNzYWdlXHJcbiAgICB9OyBNZXNzYWdlVHlwZTogJHt0aGlzLk1lc3NhZ2VUeXBlLnRvU3RyaW5nKCl9OyBTb3VyY2U6ICR7XHJcbiAgICAgIHRoaXMuU291cmNlXHJcbiAgICB9OyBEaXNwbGF5VG9Vc2VyOiAke3RoaXMuRGlzcGxheVRvVXNlcn1gO1xyXG4gIH1cclxufVxyXG4iXX0=