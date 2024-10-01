import { InMemoryMessageRepositories } from "../../adapters/repositories/InMemoryMessageRepositories";
import { Message } from "../../entities/Message";
import { MessageError } from "../../errors/MessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { UpdateMessage } from "../../usecases/message/UpdateMessage";

describe("Unit - update message", () => {
  let updateMessage: UpdateMessage;
  const messageDb = new Map<string, Message>();

  const message = DataBuilders.generateMessage();

  beforeAll(async () => {
    const messageRepositories = new InMemoryMessageRepositories(messageDb);
    updateMessage = new UpdateMessage(messageRepositories);
  });

  afterEach(async () => {
    messageDb.clear();
  });

  it("Should update message", async () => {
    messageDb.set(message.props.id, message);

    const result = await updateMessage.execute({
      id: message.props.id,
      content: message.props.content,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.content).toEqual(message.props.content);
  });

  it("Throw an error because the message is not found", async () => {
    const result = updateMessage.execute({
      id: message.props.id,
      content: message.props.content,
    });

    await expect(result).rejects.toThrow(MessageError.NotFound);
  });
});
