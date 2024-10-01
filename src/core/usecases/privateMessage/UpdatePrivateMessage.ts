import { PrivateMessage } from "../../entities/PrivateMessage";
import { PrivateMessageError } from "../../errors/PrivateMessageErrors";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";
import { Content } from "../../valuesObject/contentValidated";
import { Usecases } from "../usecase";

type UpdatePrivateMessageInput = {
  id: string;
  content: string;
};

export class UpdatePrivateMessage implements Usecases<UpdatePrivateMessageInput, Promise<PrivateMessage>> {
  constructor(
    private readonly _privateMessageRepositories: PrivateMessageRepositories
  ) {}

  async execute(input: UpdatePrivateMessageInput): Promise<PrivateMessage> {
    const { id, content } = input;

    const privateMessage = await this._privateMessageRepositories.getById(id);

    if (!privateMessage) {
      throw new PrivateMessageError.NotFound();
    }

    const contentValidated = Content.validate(content);

    privateMessage.update(contentValidated);

    await this._privateMessageRepositories.save(privateMessage);

    return privateMessage;
  }
}
