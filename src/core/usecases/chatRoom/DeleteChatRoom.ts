import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";
import { Usecases } from "../usecase";

type DeleteChatRoomInput = {
  id: string;
};

export class DeleteChatRoom implements Usecases<DeleteChatRoomInput, Promise<void>> {
  constructor(private readonly _chatRoomRepositories: ChatRoomRepositories) {}

  async execute(input: DeleteChatRoomInput): Promise<void> {
    const { id } = input;

    const chatRoom = await this._chatRoomRepositories.getById(id);

    if (!chatRoom) {
      throw new ChatRoomError.NotFound();
    }

    await this._chatRoomRepositories.delete(id);

    return;
  }
}
