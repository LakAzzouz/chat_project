import { Participant } from "../../entities/Participant";
import { User } from "../../entities/User";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";
import { Usecases } from "../usecase";

type GetParticipantByUserInput = {
  user: User;
};

export class GetParticipantByUser implements Usecases<GetParticipantByUserInput, Promise<Participant>> {
  constructor(
    private readonly _participatnRepositories: ParticipantRepositories
  ) {}

  async execute(input: GetParticipantByUserInput): Promise<Participant> {
    const { user } = input;

    const participant = await this._participatnRepositories.getByUser(user);

    if (!participant) {
      throw new ParticipantError.NotFound();
    }

    return participant;
  }
}
