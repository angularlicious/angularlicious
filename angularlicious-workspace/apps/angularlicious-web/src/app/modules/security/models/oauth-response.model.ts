/**
 * Contains the response data from the OWIN OAuth provider.
 */
export class OAuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;

  /**
   * Use to return a string representing the OAuthResponse.
   */
  toString() {
    return `access_token: ${this.access_token}; expires_in: ${
      this.expires_in
    }; token_type: ${this.token_type}`;
  }
}
