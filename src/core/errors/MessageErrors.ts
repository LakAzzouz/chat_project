import { DomainErrors } from "./DomainErrors";

export namespace MessageError {
  export class NotFound extends DomainErrors {
    constructor() {
      super("NOT_FOUND");
    }
  }

  export class OffensiveContent extends DomainErrors {
    constructor() {
      super("OFFENSIVE_CONTENT");
    }
  }
}
