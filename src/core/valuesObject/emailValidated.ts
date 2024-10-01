import { UserError } from "../errors/UserErrors";

const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export class Email {
  static validate(email: string): string {
    if (!re.test(email)) {
      throw new UserError.EmailInvalid();
    }
    return email;
  }
}
