import { InMemoryParticipantRepositories } from "../../adapters/repositories/InMemoryParticipantRepositories";
import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { UpdateParticipant } from "../../usecases/participant/UpdateParticipant";

describe("Unit - update participant", () => {
  let updateParticipant: UpdateParticipant;
  const participantDb = new Map<string, Participant>();

  const participant = DataBuilders.generateParticipant();

  beforeAll(async () => {
    const participantRepositories = new InMemoryParticipantRepositories(participantDb);
    updateParticipant = new UpdateParticipant(participantRepositories);
  });

  afterEach(async () => {
    participantDb.clear();
  });

  it("Should update participant", async () => {
    participantDb.set(participant.props.id, participant);

    const result = await updateParticipant.execute({
      id: participant.props.id,
      role: participant.props.role,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.role).toEqual(participant.props.role);
  });

  it("Throw update participant", async () => {
    const result = updateParticipant.execute({
      id: participant.props.id,
      role: participant.props.role,
    });

    await expect(result).rejects.toThrow(ParticipantError.NotFound);
  });
});
