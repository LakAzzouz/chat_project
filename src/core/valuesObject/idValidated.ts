import { ParticipantError } from "../errors/ParticipantErrors";
import { DataBuilders } from "../tools/dataBuilder";

const user = DataBuilders.generateUser();

export class Id {
  static validate(id: string): string {
    if (id != user.props.id) {
      throw new ParticipantError.IdInvalid();
    }
    return id;
  }
}
