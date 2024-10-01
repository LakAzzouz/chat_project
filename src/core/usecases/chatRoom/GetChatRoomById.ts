import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";
import { Usecases } from "../usecase";

type GetChatRoomByIdInput = {
  id: string;
};

export class GetChatRoomById implements Usecases<GetChatRoomByIdInput, Promise<ChatRoom>> {
  constructor(private readonly _chatRoomRepositories: ChatRoomRepositories) {}

  async execute(input: GetChatRoomByIdInput): Promise<ChatRoom> {
    const { id } = input;

    const chatRoom = await this._chatRoomRepositories.getById(id);

    if (!chatRoom) {
      throw new ChatRoomError.NotFound();
    }

    await this._chatRoomRepositories.save(chatRoom);

    return chatRoom;
  }
}
