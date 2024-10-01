import { InMemoryParticipantRepositories } from "../../adapters/repositories/InMemoryParticipantRepositories";
import { Participant } from "../../entities/Participant";
import { ParticipantError } from "../../errors/ParticipantErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetParticipantByUser } from "../../usecases/participant/GetParticipantByUser";

describe("Unit - get participant by user", () => {
  let getParticipantByUser: GetParticipantByUser;
  const participantDb = new Map<string, Participant>();

  const participant = DataBuilders.generateParticipant();

  beforeAll(async () => {
    const participantRepositories = new InMemoryParticipantRepositories(participantDb);
    getParticipantByUser = new GetParticipantByUser(participantRepositories);
  });

  afterEach(async () => {
    participantDb.clear();
  });

  it("Should get participant by user", async () => {
    participantDb.set(participant.props.id, participant);

    const result = await getParticipantByUser.execute({
        user: participant.props.user
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.user).toEqual(participant.props.user);
    expect(result.props.chatRoom).toEqual(participant.props.chatRoom);
    expect(result.props.role).toEqual(participant.props.role);
    expect(result.props.joinedAt).toBeDefined();
  });

  it("Throw an error because participant is not found", async () => {
    const result = getParticipantByUser.execute({
        user: participant.props.user
    });

    await expect(result).rejects.toThrow(ParticipantError.NotFound)
  });
});
