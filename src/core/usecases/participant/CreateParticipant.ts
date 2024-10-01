import { ChatRoom } from "../../entities/ChatRoom";
import { Participant } from "../../entities/Participant";
import { User } from "../../entities/User";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";
import { RoleType } from "../../types/RoleTypes";
import { Id } from "../../valuesObject/idValidated";
import { Usecases } from "../usecase";

type CreateParticipantInput = {
  id: string;
  user: User;
  chatRoom: ChatRoom;
  role: RoleType;
};

export class CreateParticipant implements Usecases<CreateParticipantInput, Promise<Participant>> {
  constructor(
    private readonly _participantRepositories: ParticipantRepositories
  ) {}

  async execute(input: CreateParticipantInput): Promise<Participant> {
    const { id, user, chatRoom, role } = input;

    const idValidated = Id.validate(id);

    const participant = Participant.create({
        id: idValidated,
        user,
        chatRoom,
        role
    })

    await this._participantRepositories.save(participant);

    return participant;
  }
}
