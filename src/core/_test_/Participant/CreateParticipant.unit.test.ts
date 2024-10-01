import { InMemoryParticipantRepositories } from "../../adapters/repositories/InMemoryParticipantRepositories";
import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreateParticipant } from "../../usecases/participant/CreateParticipant";

describe("Unit - create participant", () => {
  let createParticipant: CreateParticipant;
  const participantDb = new Map<string, Participant>();

  const participant = DataBuilders.generateParticipant();

  beforeAll(async () => {
    const participantRepositories = new InMemoryParticipantRepositories(participantDb);
    createParticipant = new CreateParticipant(participantRepositories);
  });

  afterEach(async () => {
    participantDb.clear();
  });

  it("Should create participant", async () => {
    const result = await createParticipant.execute({
        id: participant.props.id,
        user: participant.props.user,
        chatRoom: participant.props.chatRoom,
        role: participant.props.role
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.user).toEqual(participant.props.user);
    expect(result.props.chatRoom).toEqual(participant.props.chatRoom);
    expect(result.props.role).toEqual(participant.props.role);
    expect(result.props.joinedAt).toBeDefined();
  });

  it("Throw an error because id is not validated", async () => {
    const result = createParticipant.execute({
        id: "id_invalid",
        user: participant.props.user,
        chatRoom: participant.props.chatRoom,
        role: participant.props.role
    });

    await expect(result).rejects.toThrow(ParticipantError.IdInvalid);
  });
});
