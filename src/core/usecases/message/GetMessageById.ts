import { Message } from "../../entities/Message";
import { MessageError } from "../../errors/MessageErrors";
import { MessageRepositories } from "../../repositories/MessageRepositories";
import { Usecases } from "../usecase";

type GetMessageByIdInput = {
  id: string;
};

export class GetMessageById implements Usecases<GetMessageByIdInput, Promise<Message>> {
  constructor(private readonly _messageRepositories: MessageRepositories) {}

  async execute(input: GetMessageByIdInput): Promise<Message> {
    const { id } = input;

    const message = await this._messageRepositories.getById(id);

    if (!message) {
      throw new MessageError.NotFound();
    }

    await this._messageRepositories.save(message);

    return message;
  }
}
