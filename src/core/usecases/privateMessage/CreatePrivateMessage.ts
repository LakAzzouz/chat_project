import { PrivateMessage } from "../../entities/PrivateMessage";
import { User } from "../../entities/User";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";
import { Content } from "../../valuesObject/contentValidated";
import { Usecases } from "../usecase";

type CreatePrivateMessageInput = {
  content: string;
  sender: User;
  receiver: User;
  isRead: boolean;
};

export class CreatePrivateMessage implements Usecases<CreatePrivateMessageInput, Promise<PrivateMessage>> {
  constructor(
    private readonly _privateMessageRepositories: PrivateMessageRepositories
  ) {}

  async execute(input: CreatePrivateMessageInput): Promise<PrivateMessage> {
    const { content, sender, receiver, isRead } = input;

    const contentValidated = Content.validate(content);

    const privateMessage = PrivateMessage.create({
      content: contentValidated,
      sender,
      receiver,
      isRead,
    });

    await this._privateMessageRepositories.save(privateMessage);

    return privateMessage;
  }
}
