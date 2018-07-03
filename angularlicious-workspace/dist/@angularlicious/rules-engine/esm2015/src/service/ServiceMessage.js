/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Use this class to create a message for the current [ServiceContext].
 */
export class ServiceMessage {
    /**
     *
     * @param {?} name The name of the message.
     * @param {?} message The display text of the message.
     * @param {?=} messageType
     * @param {?=} source
     * @param {?=} displayToUser Use to indicate if the specified message should be displayed to the user.
     */
    constructor(name, message, messageType, source, displayToUser = false) {
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
     * @param {?} name The name of the service message.
     * @return {?}
     */
    WithName(name) {
        this.Name = name;
        return this;
    }
    /**
     * Use this extension method to add the message text to the ServiceMessage item.
     * @param {?} message The display text of the service message.
     * @return {?}
     */
    WithMessage(message) {
        this.Message = message;
        return this;
    }
    /**
     * Use this extension method to set the [MessageType] of the ServiceMessage item.
     * @param {?} messageType
     * @return {?}
     */
    WithMessageType(messageType) {
        this.MessageType = messageType;
        return this;
    }
    /**
     * Use this extension method to set the [Source] of the ServiceMessage item.
     * @param {?} source
     * @return {?}
     */
    WithSource(source) {
        this.Source = source;
        return this;
    }
    /**
     * Use this extension method to set the [DisplayToUser] indicator of the ServiceMessage.
     * @param {?} displayToUser
     * @return {?}
     */
    WithDisplayToUser(displayToUser) {
        this.DisplayToUser = displayToUser;
        return this;
    }
    /**
     * Use this method return a string representing the ServiceMessage.
     * @return {?}
     */
    toString() {
        return `Name: ${this.Name}; Message: ${this.Message}; MessageType: ${this.MessageType.toString()}; Source: ${this.Source}; DisplayToUser: ${this.DisplayToUser}`;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZU1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhcmxpY2lvdXMvcnVsZXMtZW5naW5lLyIsInNvdXJjZXMiOlsic3JjL3NlcnZpY2UvU2VydmljZU1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLE1BQU07Ozs7Ozs7OztJQWdESixZQUNFLElBQVksRUFDWixPQUFlLEVBQ2YsV0FBeUIsRUFDekIsTUFBZSxFQUNmLGdCQUF5QixLQUFLO1FBRTlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsV0FBVyxxQkFBRyxXQUEwQixDQUFBLENBQUM7U0FDL0M7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLE1BQU0scUJBQUcsTUFBZ0IsQ0FBQSxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7OztJQU1ELFFBQVEsQ0FBQyxJQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7O0lBTUQsV0FBVyxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOzs7Ozs7SUFNRCxlQUFlLENBQUMsV0FBd0I7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNiOzs7Ozs7SUFNRCxVQUFVLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ2I7Ozs7OztJQU1ELGlCQUFpQixDQUFDLGFBQXNCO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFLRCxRQUFRO1FBQ04sTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksY0FDdkIsSUFBSSxDQUFDLE9BQ1Asa0JBQWtCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGFBQzNDLElBQUksQ0FBQyxNQUNQLG9CQUFvQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDMUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9NZXNzYWdlVHlwZSc7XHJcblxyXG4vKipcclxuICogVXNlIHRoaXMgY2xhc3MgdG8gY3JlYXRlIGEgbWVzc2FnZSBmb3IgdGhlIGN1cnJlbnQgW1NlcnZpY2VDb250ZXh0XS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZSB7XHJcbiAgXHJcbiAgLyoqIFVzZSB0byBzcGVjaWZ5IHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLiAqL1xyXG4gIE5hbWU6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIHNwZWNpZnkgdGhlIG1lc3NhZ2UuICovXHJcbiAgTWVzc2FnZTogc3RyaW5nO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gc3BlY2lmaXkgICovXHJcbiAgTWVzc2FnZVR5cGU6IE1lc3NhZ2VUeXBlO1xyXG4gIFxyXG4gIC8qKiBVc2UgdG8gaW5kaWNhdGUgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS4gKi9cclxuICBTb3VyY2U6IHN0cmluZztcclxuICBcclxuICAvKiogVXNlIHRvIGluZGljYXRlIGlmIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLiAqL1xyXG4gIERpc3BsYXlUb1VzZXI6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIFtTZXJ2aWNlTWVzc2FnZV0uXHJcbiAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIGRpc3BsYXkgdGV4dCBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gbWVzc2FnZVR5cGU6IEluZGljYXRlcyB0aGUgdHlwZSBvZiBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBzb3VyY2U6IEluZGljYXRlcyB0aGUgc291cmNlIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5VG9Vc2VyOiBJbmRpY2F0ZXMgaWYgdGhlIG1lc3NhZ2UgaXMgZGlzcGxheWFibGUuXHJcbiAgICovXHJcblxyXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgbWVzc2FnZT86IHN0cmluZywgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSwgc291cmNlPzogc3RyaW5nKTtcclxuICAvKipcclxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHRoZSBbU2VydmljZU1lc3NhZ2VdLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIG1lc3NhZ2VUeXBlPzogTWVzc2FnZVR5cGUsXHJcbiAgICBzb3VyY2U/OiBzdHJpbmdcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICogQHBhcmFtIG1lc3NhZ2VUeXBlOiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2YgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gc291cmNlOiBJbmRpY2F0ZXMgdGhlIHNvdXJjZSBvZiB0aGUgbWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlciBVc2UgdG8gaW5kaWNhdGUgaWYgdGhlIHNwZWNpZmllZCBtZXNzYWdlIHNob3VsZCBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuIFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZVR5cGU/OiBNZXNzYWdlVHlwZSxcclxuICAgIHNvdXJjZT86IHN0cmluZyxcclxuICAgIGRpc3BsYXlUb1VzZXI6IGJvb2xlYW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgdGhpcy5OYW1lID0gbmFtZTtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICB0aGlzLk1lc3NhZ2VUeXBlID0gbWVzc2FnZVR5cGUgYXMgTWVzc2FnZVR5cGU7XHJcbiAgICB9XHJcbiAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgIHRoaXMuU291cmNlID0gc291cmNlIGFzIHN0cmluZztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gYWRkIHRoZSBuYW1lIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBzZXJ2aWNlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aE5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk5hbWUgPSBuYW1lO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIGFkZCB0aGUgbWVzc2FnZSB0ZXh0IHRvIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBkaXNwbGF5IHRleHQgb2YgdGhlIHNlcnZpY2UgbWVzc2FnZS5cclxuICAgKi9cclxuICBXaXRoTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbTWVzc2FnZVR5cGVdIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZSBpdGVtLlxyXG4gICAqIEBwYXJhbSBtZXNzYWdlVHlwZTogVXNlIHRvIGluZGljYXRlIHRoZSBtZXNzYWdlIHR5cGUuXHJcbiAgICovXHJcbiAgV2l0aE1lc3NhZ2VUeXBlKG1lc3NhZ2VUeXBlOiBNZXNzYWdlVHlwZSkge1xyXG4gICAgdGhpcy5NZXNzYWdlVHlwZSA9IG1lc3NhZ2VUeXBlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2UgdGhpcyBleHRlbnNpb24gbWV0aG9kIHRvIHNldCB0aGUgW1NvdXJjZV0gb2YgdGhlIFNlcnZpY2VNZXNzYWdlIGl0ZW0uXHJcbiAgICogQHBhcmFtIHNvdXJjZTogVXNlIHRvIGluZGljYXRlIHRoZSBzb3VyY2Ugb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICovXHJcbiAgV2l0aFNvdXJjZShzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5Tb3VyY2UgPSBzb3VyY2U7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZSB0aGlzIGV4dGVuc2lvbiBtZXRob2QgdG8gc2V0IHRoZSBbRGlzcGxheVRvVXNlcl0gaW5kaWNhdG9yIG9mIHRoZSBTZXJ2aWNlTWVzc2FnZS5cclxuICAgKiBAcGFyYW0gZGlzcGxheVRvVXNlcjogQSBib29sZWFuIHZhbHVlIHRvIGluZGljYXRlIGlmIHRoZSBtZXNzYWdlIGNhbiBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIuXHJcbiAgICovXHJcbiAgV2l0aERpc3BsYXlUb1VzZXIoZGlzcGxheVRvVXNlcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5EaXNwbGF5VG9Vc2VyID0gZGlzcGxheVRvVXNlcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlIHRoaXMgbWV0aG9kIHJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIFNlcnZpY2VNZXNzYWdlLlxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgcmV0dXJuIGBOYW1lOiAke3RoaXMuTmFtZX07IE1lc3NhZ2U6ICR7XHJcbiAgICAgIHRoaXMuTWVzc2FnZVxyXG4gICAgfTsgTWVzc2FnZVR5cGU6ICR7dGhpcy5NZXNzYWdlVHlwZS50b1N0cmluZygpfTsgU291cmNlOiAke1xyXG4gICAgICB0aGlzLlNvdXJjZVxyXG4gICAgfTsgRGlzcGxheVRvVXNlcjogJHt0aGlzLkRpc3BsYXlUb1VzZXJ9YDtcclxuICB9XHJcbn1cclxuIl19