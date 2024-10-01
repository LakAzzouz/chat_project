import { DomainErrors } from "./DomainErrors";

export namespace NotificationErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("NOT_FOUND");
    }
  }
}
