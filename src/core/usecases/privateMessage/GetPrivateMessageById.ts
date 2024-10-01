import { PrivateMessage } from "../../entities/PrivateMessage";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";
import { Usecases } from "../usecase";

type GetPrivateMessageByIdInput = {
  id: string;
};

export class GetPrivateMessageById implements Usecases<GetPrivateMessageByIdInput, Promise<PrivateMessage>> {
  constructor(
    private readonly _privateMessageRepositories: PrivateMessageRepositories
  ) {}

  async execute(input: GetPrivateMessageByIdInput): Promise<PrivateMessage> {
    const { id } = input;

    const privateMessage = await this._privateMessageRepositories.getById(id);

    if (!privateMessage) {
      throw new PrivateMessageError.NotFound();
    }

    return privateMessage;
  }
}
