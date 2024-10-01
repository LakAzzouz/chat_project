import { InMemoryChatRoomRepository } from "../../adapters/repositories/InMemoryChatRoomRepositories";
import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetChatRoomById } from "../../usecases/chatRoom/GetChatRoomById";

describe("Unit - get chat room by id", () => {
  let getChatRoomById: GetChatRoomById;
  const chatRoomDb = new Map<string, ChatRoom>();

  const chatRoom = DataBuilders.generateChatRoom();

  beforeAll(async () => {
    const chatRoomRepository = new InMemoryChatRoomRepository(chatRoomDb);
    getChatRoomById = new GetChatRoomById(chatRoomRepository);
  });

  afterEach(async () => {
    chatRoomDb.clear();
  });

  it("Should get chat room by id", async () => {
    chatRoomDb.set(chatRoom.props.id, chatRoom);

    const result = await getChatRoomById.execute({
      id: chatRoom.props.id,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual(chatRoom.props.name);
    expect(result.props.isPrivate).toEqual(chatRoom.props.isPrivate);
    expect(result.props.createdBy).toBeDefined();
    expect(result.props.participants).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });

  it("Throw an error because the chat room is not found", async () => {
    const result = getChatRoomById.execute({
      id: chatRoom.props.id,
    });

    await expect(result).rejects.toThrow(ChatRoomError.NotFound);
  });
});
