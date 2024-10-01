import { MessageError } from "../../errors/MessageErrors";
import { MessageRepositories } from "../../repositories/MessageRepositories";
import { Usecases } from "../usecase";

type DeleteMessageInput = {
  id: string;
};

export class DeleteMessage implements Usecases<DeleteMessageInput, Promise<void>> {
  constructor(private readonly _messageRepositories: MessageRepositories) {}

  async execute(input: DeleteMessageInput): Promise<void> {
    const { id } = input;

    const message = await this._messageRepositories.getById(id);

    if (!message) {
      throw new MessageError.NotFound();
    }

    await this._messageRepositories.delete(id);

    return;
  }
}
