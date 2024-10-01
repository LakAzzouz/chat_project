import { InMemoryPrivateMessage } from "../../adapters/repositories/InMemoryPrivateMessageRepositories";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { UpdatePrivateMessage } from "../../usecases/privateMessage/UpdatePrivateMessage";

describe("Unit - update private message", () => {
  let updatePrivateMessage: UpdatePrivateMessage;
  const privateMessageDb = new Map<string, PrivateMessage>();

  const privateMessage = DataBuilders.generatePrivateMessage();

  beforeAll(async () => {
    const privateMessageRepositories = new InMemoryPrivateMessage(privateMessageDb);
    updatePrivateMessage = new UpdatePrivateMessage(privateMessageRepositories);
  });

  afterEach(async () => {
    privateMessageDb.clear();
  });

  it("Should update private message", async () => {
    privateMessageDb.set(privateMessage.props.id, privateMessage);

    const result = await updatePrivateMessage.execute({
        id: privateMessage.props.id,
        content: privateMessage.props.content
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(privateMessage.props.content);
  });

  it("Throw an erorr because private message is not found", async () => {
    const result = updatePrivateMessage.execute({
        id: privateMessage.props.id,
        content: privateMessage.props.content
    });

    await expect(result).rejects.toThrow(PrivateMessageError.NotFound);
  });
});
