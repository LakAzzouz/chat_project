import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";
import { Usecases } from "../usecase";

type UpdateChatRoomInput = {
  id: string;
  name: string;
};

export class UpdateChatRoom implements Usecases<UpdateChatRoomInput, Promise<ChatRoom>> {
  constructor(private readonly _chatRoomRepositories: ChatRoomRepositories) {}

  async execute(input: UpdateChatRoomInput): Promise<ChatRoom> {
    const { id, name } = input;

    const chatRoom = await this._chatRoomRepositories.getById(id);

    if (!chatRoom) {
      throw new ChatRoomError.NotFound();
    }

    const newChatRoom = chatRoom.update(name);

    return newChatRoom;
  }
}
