import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";
import { Usecases } from "../usecase";

type GetParticipantByIdInput = {
  id: string;
};

export class GetParticipantById implements Usecases<GetParticipantByIdInput, Promise<Participant>> {
  constructor(
    private readonly _participantRepositories: ParticipantRepositories
  ) {}

  async execute(input: GetParticipantByIdInput): Promise<Participant> {
    const { id } = input;

    const participant = await this._participantRepositories.getById(id);

    if (!participant) {
      throw new ParticipantError.NotFound();
    }

    await this._participantRepositories.save(participant);

    return participant;
  }
}
