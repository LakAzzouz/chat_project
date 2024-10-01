import { DomainErrors } from "./DomainErrors";

export namespace UserError {
  export class AlreadyExist extends DomainErrors {
    constructor() {
      super("USER_ALREADY_EXIST");
    }
  }

  export class EmailInvalid extends DomainErrors {
    constructor() {
      super("EMAIL_INVALID");
    }
  }

  export class PasswordInvalid extends DomainErrors {
    constructor() {
      super("PASSWORD_INVALID");
    }
  }

  export class NotFound extends DomainErrors {
    constructor() {
      super("NOT_FOUND");
    }
  }

  export class PasswordIncorrect extends DomainErrors {
    constructor() {
      super("PASSWORD_INCORRECT");
    }
  }
}
