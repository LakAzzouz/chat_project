import { PrivateMessage } from "../../entities/PrivateMessage";
import { User } from "../../entities/User";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";
import { Usecases } from "../usecase";

type GetPrivateMessageBySenderInput = {
  sender: User;
};

export class GetPrivateMessageBySender implements Usecases<GetPrivateMessageBySenderInput, Promise<PrivateMessage>> {
  constructor(
    private readonly _privateMessageRepositories: PrivateMessageRepositories
  ) {}

  async execute(input: GetPrivateMessageBySenderInput): Promise<PrivateMessage> {
    const { sender } = input;

    const privateMessage = await this._privateMessageRepositories.getBySender(
      sender
    );

    if (!privateMessage) {
      throw new PrivateMessageError.NotFound();
    }

    return privateMessage;
  }
}
