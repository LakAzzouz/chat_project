import { InMemoryPrivateMessage } from "../../adapters/repositories/InMemoryPrivateMessageRepositories";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { MessageError } from "../../errors/MessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreatePrivateMessage } from "../../usecases/privateMessage/CreatePrivateMessage";

describe("Unit - create private message", () => {
  let createPrivateMessage: CreatePrivateMessage;
  const privateMessageDb = new Map<string, PrivateMessage>();

  const privateMessage = DataBuilders.generatePrivateMessage();

  beforeAll(async () => {
    const privateMessageRepositories = new InMemoryPrivateMessage(
      privateMessageDb
    );
    createPrivateMessage = new CreatePrivateMessage(privateMessageRepositories);
  });

  afterEach(async () => {
    privateMessageDb.clear();
  });

  it("Should create private message", async () => {
    const result = await createPrivateMessage.execute({
      content: privateMessage.props.content,
      sender: privateMessage.props.sender,
      receiver: privateMessage.props.receiver,
      isRead: privateMessage.props.isRead,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(privateMessage.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.receiver).toBeDefined();
    expect(result.props.sendAt).toBeDefined();
    expect(result.props.isRead).toEqual(privateMessage.props.isRead);
  });

  it("Throw an error because the content is offensive", async () => {
    const result = createPrivateMessage.execute({
      content: "connard",
      sender: privateMessage.props.sender,
      receiver: privateMessage.props.receiver,
      isRead: privateMessage.props.isRead,
    });

    await expect(result).rejects.toThrow(MessageError.OffensiveContent);
  });
});
