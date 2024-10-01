import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { MessageError } from "../../errors/MessageErrors";
import { MessageRepositories } from "../../repositories/MessageRepositories";
import { Usecases } from "../usecase";

type GetMessageBySenderInput = {
  sender: User;
};

export class GetMessageBySender implements Usecases<GetMessageBySenderInput, Promise<Message>> {
  constructor(private readonly _messageRepositories: MessageRepositories) {}

  async execute(input: GetMessageBySenderInput): Promise<Message> {
    const { sender } = input;

    const message = await this._messageRepositories.getBySender(sender);

    if (!message) {
      throw new MessageError.NotFound();
    }

    await this._messageRepositories.save(message);

    return message;
  }
}
