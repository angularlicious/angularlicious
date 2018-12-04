export class ApiErrorMessage {
    id?: string;
    statusCode?: string;
    message: string;
    isDisplayable: boolean;
  
    /**
     * Use to create a new [ApiErrorMessage]
     * @param message The error from the API.
     * @param displayable Use to indicate if the error should be displayed to the user.
     * @param id An optional identifier for the error.
     * @param statusCode An optional status code for the specified error.
     */
    constructor(
      message: string,
      displayable: boolean,
      id: string | null,
      statusCode: string | null
    ) {
      this.message = message;
      this.isDisplayable = displayable;
      if (id) {
        this.id = id;
      }
      if (statusCode) {
        this.statusCode = statusCode;
      }
    }
  }
  