export class Credentials {
  UserName: string;
  Password: string;

  /**
   * Use to contain credentials for the login process.
   * @param username The user name for the specified application user.
   * @param password The password for the specified user.
   */
  constructor(username: string, password: string) {
    this.UserName = username;
    this.Password = password;
  }

  toString() {
    return `UserName: ${this.UserName}; Password: ************`;
  }
}
