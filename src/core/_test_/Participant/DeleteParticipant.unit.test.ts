import { InMemoryParticipantRepositories } from "../../adapters/repositories/InMemoryParticipantRepositories";
import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeleteParticipant } from "../../usecases/participant/DeleteParticipant";

describe("Unit - delete participant", () => {
  let deleteParticipant: DeleteParticipant;
  const participantDb = new Map<string, Participant>();

  const participant = DataBuilders.generateParticipant();

  beforeAll(async () => {
    const participantRepositories = new InMemoryParticipantRepositories(participantDb);
    deleteParticipant = new DeleteParticipant(participantRepositories);
  });

  afterEach(async () => {
    participantDb.clear();
  });

  it("Should delete participant", async () => {
    participantDb.set(participant.props.id, participant);

    await deleteParticipant.execute({
      id: participant.props.id,
    });

    const result = participantDb.get(participant.props.id);

    expect(result).toBeUndefined();
  });

  it("Throw an error because participant is not found", async () => {
    const result = deleteParticipant.execute({
        id: participant.props.id
    });
    
    await expect(result).rejects.toThrow(ParticipantError.NotFound);
  });
});
