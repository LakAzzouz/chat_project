import { InMemoryMessageRepositories } from "../../adapters/repositories/InMemoryMessageRepositories";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { MessageError } from "../../errors/MessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetMessageBySender } from "../../usecases/message/GetMessageBySender";

describe("Unit - get message by sender", () => {
  let getMessageBySender: GetMessageBySender;
  const messageDb = new Map<string, Message>();
  const userDb = new Map<string, User>();

  const message = DataBuilders.generateMessage();
  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const messageRepositories = new InMemoryMessageRepositories(messageDb);
    getMessageBySender = new GetMessageBySender(messageRepositories);
  });

  afterEach(async () => {
    messageDb.clear();
  });

  it("Should get message by sender", async () => {
    messageDb.set(message.props.id, message);
    userDb.set(user.props.id, user);

    const result = await getMessageBySender.execute({
      sender: user,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(message.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.chatRoom).toBeDefined();
    expect(result.props.isRead).toEqual(message.props.isRead);
    expect(result.props.sentAt).toBeDefined();
  });

  it("Throw an error because message is not found", async () => {
    userDb.set(user.props.id, user);

    const result = getMessageBySender.execute({
      sender: user,
    });

    await expect(result).rejects.toThrow(MessageError.NotFound);
  });
});
