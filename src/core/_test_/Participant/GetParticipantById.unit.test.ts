import { InMemoryParticipantRepositories } from "../../adapters/repositories/InMemoryParticipantRepositories";
import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetParticipantById } from "../../usecases/participant/GetParticipantById";

describe("Unit - get participant by id", () => {
  let getParticipantById: GetParticipantById;
  const participantDb = new Map<string, Participant>();

  const participant = DataBuilders.generateParticipant();

  beforeAll(async () => {
    const participantRepositories = new InMemoryParticipantRepositories(participantDb);
    getParticipantById = new GetParticipantById(participantRepositories);
  });

  afterEach(async () => {
    participantDb.clear();
  });

  it("Should get participant by id", async () => {
    participantDb.set(participant.props.id, participant);

    const result = await getParticipantById.execute({
        id: participant.props.id
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.user).toEqual(participant.props.user);
    expect(result.props.chatRoom).toEqual(participant.props.chatRoom);
    expect(result.props.role).toEqual(participant.props.role);
    expect(result.props.joinedAt).toBeDefined();
  });

  it("Throw an error because participant is not found", async () => {
    const result = getParticipantById.execute({
        id: participant.props.id
    });

    await expect(result).rejects.toThrow(ParticipantError.NotFound)
  });
});
