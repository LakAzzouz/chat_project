import { ChatRoom } from "../../entities/ChatRoom";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { MessageRepositories } from "../../repositories/MessageRepositories";
import { Content } from "../../valuesObject/contentValidated";
import { Usecases } from "../usecase";

type CreateMessageInput = {
  content: string;
  sender: User;
  chatRoom: ChatRoom;
  isRead: boolean;
};

export class CreateMessage implements Usecases<CreateMessageInput, Promise<Message>> {
  constructor(private readonly _messageRepositories: MessageRepositories) {}

  async execute(input: CreateMessageInput): Promise<Message> {
    const { content, sender, chatRoom, isRead } = input;

    const contentValidated = Content.validate(content);

    const message = Message.create({
      content: contentValidated,
      sender,
      chatRoom,
      isRead,
    });

    await this._messageRepositories.save(message);

    return message;
  }
}
