import { InMemoryChatRoomRepository } from "../../adapters/repositories/InMemoryChatRoomRepositories";
import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { UpdateChatRoom } from "../../usecases/chatRoom/UpdateChatRoom";

describe("Unit - update chat room", () => {
  let updateChatRoom: UpdateChatRoom;
  const chatRoomDb = new Map<string, ChatRoom>();

  const chatRoom = DataBuilders.generateChatRoom();

  beforeAll(async () => {
    const chatRoomRepository = new InMemoryChatRoomRepository(chatRoomDb);
    updateChatRoom = new UpdateChatRoom(chatRoomRepository);
  });

  afterEach(async () => {
    chatRoomDb.clear();
  });

  it("Should update the chat room", async () => {
    chatRoomDb.set(chatRoom.props.id, chatRoom);

    const result = await updateChatRoom.execute({
      id: chatRoom.props.id,
      name: "new_name",
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual("new_name");
  });

  it("Throw an error because chat room not found", async () => {
    const result = updateChatRoom.execute({
      id: chatRoom.props.id,
      name: "new_name",
    });

    await expect(result).rejects.toThrow(ChatRoomError.NotFound)
  });
});
