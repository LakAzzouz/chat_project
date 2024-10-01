import { InMemoryPrivateMessage } from "../../adapters/repositories/InMemoryPrivateMessageRepositories";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetPrivateMessageById } from "../../usecases/privateMessage/GetPrivateMessageById";

describe("Unit - get private message by id", () => {
  let getPrivateMessageById: GetPrivateMessageById;
  const privateMessageDb = new Map<string, PrivateMessage>();

  const privateMessage = DataBuilders.generatePrivateMessage();

  beforeAll(async () => {
    const privateMessageRepositories = new InMemoryPrivateMessage(privateMessageDb);
    getPrivateMessageById = new GetPrivateMessageById(privateMessageRepositories);
  });

  afterEach(async () => {
    privateMessageDb.clear();
  });

  it("Should get private message by id", async () => {
    privateMessageDb.set(privateMessage.props.id, privateMessage);

    const result = await getPrivateMessageById.execute({
      id: privateMessage.props.id,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(privateMessage.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.receiver).toBeDefined();
    expect(result.props.sendAt).toBeDefined();
    expect(result.props.isRead).toEqual(privateMessage.props.isRead);
  });

  it("Throw an erorr because private message is not found", async () => {
    const result = getPrivateMessageById.execute({
      id: privateMessage.props.id,
    });

    await expect(result).rejects.toThrow(PrivateMessageError.NotFound);
  });
});
