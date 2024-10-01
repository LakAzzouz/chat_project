import { InMemoryMessageRepositories } from "../../adapters/repositories/InMemoryMessageRepositories";
import { Message } from "../../entities/Message";
import { MessageError } from "../../errors/MessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetMessageById } from "../../usecases/message/GetMessageById";

describe("Unit - get message by id", () => {
  let getMessageById: GetMessageById;
  const messageDb = new Map<string, Message>();

  const message = DataBuilders.generateMessage();

  beforeAll(async () => {
    const messageRepositories = new InMemoryMessageRepositories(messageDb);
    getMessageById = new GetMessageById(messageRepositories);
  });

  afterEach(async () => {
    messageDb.clear();
  });

  it("Should get message byd id", async () => {
    messageDb.set(message.props.id, message);

    const result = await getMessageById.execute({
      id: message.props.id,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(message.props.content);
    expect(result.props.sender).toBeDefined();
    expect(result.props.chatRoom).toBeDefined();
    expect(result.props.isRead).toEqual(message.props.isRead);
    expect(result.props.sentAt).toBeDefined();
  });

  it("Throw an error because the message is not found", async () => {
    const result = getMessageById.execute({
      id: message.props.id,
    });

    await expect(result).rejects.toThrow(MessageError.NotFound);
  });
});
