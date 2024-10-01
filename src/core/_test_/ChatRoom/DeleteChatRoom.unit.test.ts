import { InMemoryChatRoomRepository } from "../../adapters/repositories/InMemoryChatRoomRepositories";
import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeleteChatRoom } from "../../usecases/chatRoom/DeleteChatRoom";

describe("Unit - delete chat room", () => {
  let deleteChatRoom: DeleteChatRoom;
  const chatRoomDb = new Map<string, ChatRoom>();

  const chatRoom = DataBuilders.generateChatRoom();

  beforeAll(async () => {
    const chatRoomRepositories = new InMemoryChatRoomRepository(chatRoomDb);
    deleteChatRoom = new DeleteChatRoom(chatRoomRepositories);
  });

  afterEach(async () => {
    chatRoomDb.clear();
  });

  it("Should delete chat room", async () => {
    chatRoomDb.set(chatRoom.props.id, chatRoom);

    await deleteChatRoom.execute({
      id: chatRoom.props.id,
    });

    const result = chatRoomDb.get(chatRoom.props.id);

    expect(result).toBeUndefined();
  });

  it("Throw an error because the chat room is not found", async () => {
    const result = deleteChatRoom.execute({
      id: chatRoom.props.id,
    });

    await expect(result).rejects.toThrow(ChatRoomError.NotFound);
  });
});
