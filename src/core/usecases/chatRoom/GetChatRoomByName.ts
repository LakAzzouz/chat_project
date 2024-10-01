import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";
import { Usecases } from "../usecase";

type GetChatRoomByNameInput = {
  name: string;
};

export class GetChatRoomByName implements Usecases<GetChatRoomByNameInput, Promise<ChatRoom>> {
  constructor(private readonly _chatRoomRepositories: ChatRoomRepositories) {}

  async execute(input: GetChatRoomByNameInput): Promise<ChatRoom> {
    const { name } = input;

    const chatRoom = await this._chatRoomRepositories.getByName(name);

    if (!chatRoom) {
      throw new ChatRoomError.NotFound();
    }

    await this._chatRoomRepositories.save(chatRoom);

    return chatRoom;
  }
}
