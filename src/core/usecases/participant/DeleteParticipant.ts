import { ParticipantError } from "../../errors/ParticipantErrors";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";
import { Usecases } from "../usecase";

type DeleteParticipantInput = {
  id: string;
};

export class DeleteParticipant implements Usecases<DeleteParticipantInput, Promise<void>> {
  constructor(
    private readonly _participantRepositories: ParticipantRepositories
  ) {}

  async execute(input: DeleteParticipantInput): Promise<void> {
    const { id } = input;

    const participant = await this._participantRepositories.getById(id);

    if (!participant) {
      throw new ParticipantError.NotFound();
    }

    await this._participantRepositories.delete(id);

    return;
  }
}
