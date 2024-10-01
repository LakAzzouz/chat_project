import { InMemoryPrivateMessage } from "../../adapters/repositories/InMemoryPrivateMessageRepositories";
import { PrivateMessage } from "../../entities/PrivateMessage";
import { MessageError } from "../../errors/MessageErrors";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeletePrivateMessage } from "../../usecases/privateMessage/DeletePrivateMessage";

describe("Unit - delete private message", () => {
  let deletePrivateMessage: DeletePrivateMessage;
  const privateMessageDb = new Map<string, PrivateMessage>();

  const privateMessage = DataBuilders.generatePrivateMessage();

  beforeAll(async () => {
    const privateMessageRepositories = new InMemoryPrivateMessage(privateMessageDb);
    deletePrivateMessage = new DeletePrivateMessage(privateMessageRepositories);
  });

  afterEach(async () => {
    privateMessageDb.clear();
  });

  it("Should delete private message", async () => {
    privateMessageDb.set(privateMessage.props.id, privateMessage);

    await deletePrivateMessage.execute({
      id: privateMessage.props.id,
    });

    const result = privateMessageDb.get(privateMessage.props.id);

    expect(result).toBeUndefined();
  });

  it("Throw an error because the private message is not found", async () => {
    const result = deletePrivateMessage.execute({
      id: privateMessage.props.id,
    });

    await expect(result).rejects.toThrow(PrivateMessageError.NotFound);
  });
});
