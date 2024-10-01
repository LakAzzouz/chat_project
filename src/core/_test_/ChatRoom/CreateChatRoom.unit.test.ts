import { InMemoryChatRoomRepository } from "../../adapters/repositories/InMemoryChatRoomRepositories";
import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreateChatRoom } from "../../usecases/chatRoom/CreateChatRoom";

describe("Unit - create chat room", () => {
  let createChatRoom: CreateChatRoom;
  const chatRoomDb = new Map<string, ChatRoom>();

  const chatRoom = DataBuilders.generateChatRoom();
  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const chatRoomRepository = new InMemoryChatRoomRepository(chatRoomDb);
    createChatRoom = new CreateChatRoom(chatRoomRepository);
  });

  afterEach(async () => {
    chatRoomDb.clear();
  });

  it("Should create chat room", async () => {
    const result = await createChatRoom.execute({
      name: chatRoom.props.name,
      isPrivate: chatRoom.props.isPrivate,
      createdBy: chatRoom.props.createdBy,
      participants: [user],
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual(chatRoom.props.name);
    expect(result.props.isPrivate).toEqual(chatRoom.props.isPrivate);
    expect(result.props.createdBy).toBeDefined();
    expect(result.props.participants).toEqual([user]);
    expect(result.props.createdAt).toBeDefined();
  });

  it("Throw an error because the name of chat room is invalid", async () => {
    const result = createChatRoom.execute({
      name: "",
      isPrivate: chatRoom.props.isPrivate,
      createdBy: chatRoom.props.createdBy,
      participants: [user],
    });

    await expect(result).rejects.toThrow(ChatRoomError.NameInvalid)
  })
  it("Throw an erorr because the chat room already exist", async () => {
    chatRoomDb.set(chatRoom.props.id, chatRoom);

    const result = createChatRoom.execute({
      name: chatRoom.props.name,
      isPrivate: chatRoom.props.isPrivate,
      createdBy: chatRoom.props.createdBy,
      participants: [user],
    });

    await expect(result).rejects.toThrow(ChatRoomError.AlreadyExist);
  });
});
