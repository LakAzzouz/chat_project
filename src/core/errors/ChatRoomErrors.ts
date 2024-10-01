import { DomainErrors } from "./DomainErrors";

export namespace ChatRoomError {
  export class AlreadyExist extends DomainErrors {
    constructor() {
      super("CHAT_ROOM_ALREADY_EXIST")
    }
  }

  export class NotFound extends DomainErrors {
    constructor() {
      super("CHAT_ROOM_NOT_FOUND");
    }
  }

  export class NameInvalid extends DomainErrors {
    constructor() {
      super("NAME_INVALID")
    }
  }
}
