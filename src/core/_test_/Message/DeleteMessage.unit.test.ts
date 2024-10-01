import { InMemoryMessageRepositories } from "../../adapters/repositories/InMemoryMessageRepositories";
import { Message } from "../../entities/Message";
import { MessageError } from "../../errors/MessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeleteMessage } from "../../usecases/message/DeleteMessage";

describe("Unit - delete message", () => {
  let deleteMessage: DeleteMessage;
  const messageDb = new Map<string, Message>();

  const message = DataBuilders.generateMessage();

  beforeAll(async () => {
    const messageRepositories = new InMemoryMessageRepositories(messageDb);
    deleteMessage = new DeleteMessage(messageRepositories);
  });

  afterEach(async () => {
    messageDb.clear();
  });

  it("Should delete message", async () => {
    messageDb.set(message.props.id, message);

    await deleteMessage.execute({
      id: message.props.id,
    });

    const result = messageDb.get(message.props.id);

    expect(result).toBeUndefined();
  });

  it("Throw an error because message is not found", async () => {
    const result = deleteMessage.execute({
      id: message.props.id,
    });

    await expect(result).rejects.toThrow(MessageError.NotFound);
  });
});
