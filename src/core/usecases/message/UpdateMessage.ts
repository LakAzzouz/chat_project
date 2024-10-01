import { Message } from "../../entities/Message";
import { MessageError } from "../../errors/MessageErrors";
import { MessageRepositories } from "../../repositories/MessageRepositories";
import { Usecases } from "../usecase";

type UpdateMessageInput = {
  id: string;
  content: string;
};

export class UpdateMessage implements Usecases<UpdateMessageInput, Promise<Message>> {
  constructor(private readonly _messageRepositories: MessageRepositories) {}

  async execute(input: UpdateMessageInput): Promise<Message> {
    const { id, content } = input;

    const message = await this._messageRepositories.getById(id);

    if(!message) {
        throw new MessageError.NotFound();
    }

    message.update(content);

    return message;
  }
}
