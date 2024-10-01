import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";
import { RoleType } from "../../types/RoleTypes";
import { Usecases } from "../usecase";

type UpdateParticipantInput = {
  id: string;
  role: RoleType;
};

export class UpdateParticipant implements Usecases<UpdateParticipantInput, Promise<Participant>> {
  constructor(
    private readonly _participantRepositories: ParticipantRepositories
  ) {}

  async execute(input: UpdateParticipantInput): Promise<Participant> {
    const { id, role } = input;

    const participant = await this._participantRepositories.getById(id);

    if (!participant) {
      throw new ParticipantError.NotFound();
    }

    participant.update(role);

    return participant;
  }
}
