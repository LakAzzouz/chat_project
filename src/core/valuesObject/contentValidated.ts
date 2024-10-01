import { MessageError } from "../errors/MessageErrors";

const re = /\b(con(nard|asse)?|idiot|imbécile|salaud|salope|merde|putain|enfoiré|connard|crétin|batard|pd|pédé)\b/;

export class Content {
  static validate(content: string): string {
    if (re.test(content)) {
      throw new MessageError.OffensiveContent();
    }
    return content;
  }
}
