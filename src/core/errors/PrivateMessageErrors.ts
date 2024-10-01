import { DomainErrors } from "./DomainErrors";

export namespace PrivateMessageError {
  export class NotFound extends DomainErrors {
    constructor() {
      super("NOT_FOUND");
    }
  }

}
