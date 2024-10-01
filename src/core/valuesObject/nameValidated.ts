import { ChatRoomError } from "../errors/ChatRoomErrors";

const re = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/;

export class Name {
  static validate(name: string): string {
    if (!re.test(name)) {
      throw new ChatRoomError.NameInvalid();
    }
    return name;
  }
}
