import { DomainErrors } from "./DomainErrors";

export namespace ParticipantError {
  export class NotFound extends DomainErrors {
    constructor() {
      super("NOT_FOUND");
    }
  }

  export class IdInvalid extends DomainErrors {
    constructor() {
      super("ID_INVALID");
    }
  }
}
