import { InMemoryChatRoomRepository } from "../../adapters/repositories/InMemoryChatRoomRepositories";
import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetChatRoomByName } from "../../usecases/chatRoom/GetChatRoomByName";

describe("Unit - get chat room by name", () => {
  let getChatRoomByname: GetChatRoomByName;
  const chatRoomDb = new Map<string, ChatRoom>();

  const chatRoom = DataBuilders.generateChatRoom();

  beforeAll(async () => {
    const chatRoomRepositories = new InMemoryChatRoomRepository(chatRoomDb);
    getChatRoomByname = new GetChatRoomByName(chatRoomRepositories);
  });

  afterEach(async () => {
    chatRoomDb.clear();
  });

  it("Should get chat room by name", async () => {
    chatRoomDb.set(chatRoom.props.id, chatRoom);

    const result = await getChatRoomByname.execute({
      name: chatRoom.props.name,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual(chatRoom.props.name);
    expect(result.props.isPrivate).toEqual(chatRoom.props.isPrivate);
    expect(result.props.createdBy).toBeDefined();
    expect(result.props.participants).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });

  it("Throw an error because the chat room is not found", async () => {
    const result = getChatRoomByname.execute({
      name: chatRoom.props.name,
    });

    await expect(result).rejects.toThrow(ChatRoomError.NotFound);
  });
});
