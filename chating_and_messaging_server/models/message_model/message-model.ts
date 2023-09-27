export class MessageModel {
  message?: string;
  date?: string;
  isLoggedIn?: boolean;
  constructor(message?: string, date?: string, isLoggedIn?: boolean) {
    this.message = message;
    this.date = date;
    this.isLoggedIn = isLoggedIn;
  }
}
