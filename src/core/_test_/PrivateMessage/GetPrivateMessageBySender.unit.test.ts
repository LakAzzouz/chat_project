import { InMemoryPrivateMessage } from "../../adapters/repositories/InMemoryPrivateMessageRepositories";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetPrivateMessageBySender } from "../../usecases/privateMessage/GetPrivateMessageBySender";

describe("Unit - get private message by sender", () => {
  let getPrivateMessageBySender: GetPrivateMessageBySender;
  const privateMessageDb = new Map<string, PrivateMessage>();

  const privateMessage = DataBuilders.generatePrivateMessage();

  beforeAll(async () => {
    const privateMessageRepositories = new InMemoryPrivateMessage(privateMessageDb);
    getPrivateMessageBySender = new GetPrivateMessageBySender(privateMessageRepositories);
  });

  afterEach(async () => {
    privateMessageDb.clear();
  });

  it("Should get private message by sender", async () => {
    privateMessageDb.set(privateMessage.props.id, privateMessage);

    const result = await getPrivateMessageBySender.execute({
        sender: privateMessage.props.sender
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(privateMessage.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.receiver).toBeDefined();
    expect(result.props.sendAt).toBeDefined();
    expect(result.props.isRead).toEqual(privateMessage.props.isRead);
  });

  it("Throw an erorr because private message is not found", async () => {
    const result = getPrivateMessageBySender.execute({
      sender: privateMessage.props.sender,
    });

    await expect(result).rejects.toThrow(PrivateMessageError.NotFound);
  });
});
