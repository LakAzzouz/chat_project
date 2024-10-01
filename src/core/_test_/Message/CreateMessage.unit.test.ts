import { InMemoryMessageRepositories } from "../../adapters/repositories/InMemoryMessageRepositories";
import { Message } from "../../entities/Message";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreateMessage } from "../../usecases/message/CreateMessage";

describe("Unit - create message", () => {
  let createMessage: CreateMessage;
  const messageDb = new Map<string, Message>();

  const message = DataBuilders.generateMessage();
  const user = DataBuilders.generateUser();
  const chatRoom = DataBuilders.generateChatRoom();

  beforeAll(async () => {
    const messageRepositories = new InMemoryMessageRepositories(messageDb);
    createMessage = new CreateMessage(messageRepositories);
  });

  afterEach(async () => {
    messageDb.clear();
  });

  it("Should create message", async () => {
    const result = await createMessage.execute({
      content: message.props.content,
      sender: message.props.sender,
      chatRoom: message.props.chatRoom,
      isRead: message.props.isRead,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(message.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.chatRoom).toBeDefined();
    expect(result.props.isRead).toEqual(message.props.isRead);
    expect(result.props.sentAt).toBeDefined();
  });
});
