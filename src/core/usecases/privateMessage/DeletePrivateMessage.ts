import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";
import { Usecases } from "../usecase";

type DeletePrivateMessageInput = {
  id: string;
};

export class DeletePrivateMessage implements Usecases<DeletePrivateMessageInput, Promise<void>> {
  constructor(
    private readonly _privateMessageRepositories: PrivateMessageRepositories
  ) {}

  async execute(input: DeletePrivateMessageInput): Promise<void> {
    const { id } = input;

    const privateMessage = await this._privateMessageRepositories.getById(id);

    if (!privateMessage) {
      throw new PrivateMessageError.NotFound();
    }

    await this._privateMessageRepositories.delete(id);

    return;
  }
}
