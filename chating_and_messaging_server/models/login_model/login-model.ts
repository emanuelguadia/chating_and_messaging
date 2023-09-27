export class LoginModel {
  //email1
  userName: string;
  password: String;
  isLoggedIn: boolean;
  message?: string | null;
  token?: string;
  constructor(
    userName: string,
    password: string,
    isLoggedIn: boolean,
    message?: string | null,
    token?: string
  ) {
    //email
    this.userName = userName;
    this.password = password;
    this.isLoggedIn = isLoggedIn;
    this.message = message;
    this.token = token;
  }
  
}

