import { ChatRoom } from "../../entities/ChatRoom";
import { User } from "../../entities/User";
import { ChatRoomError } from "../../errors/ChatRoomErrors";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";
import { Name } from "../../valuesObject/nameValidated";
import { Usecases } from "../usecase";

type CreateChatRoomInput = {
  name: string;
  isPrivate: boolean;
  createdBy: User;
  participants: [User];
};

export class CreateChatRoom implements Usecases<CreateChatRoomInput, Promise<ChatRoom>> {
  constructor(private readonly _chatRoomRepositories: ChatRoomRepositories) {}

  async execute(input: CreateChatRoomInput): Promise<ChatRoom> {
    const { name, isPrivate, createdBy, participants } = input;

    const nameValidated = Name.validate(name);

    const alReadyExist = await this._chatRoomRepositories.getByName(nameValidated);

    if (alReadyExist) {
      throw new ChatRoomError.AlreadyExist();
    }

    const chatRoom = ChatRoom.create({
      name: nameValidated,
      isPrivate,
      createdBy,
      participants,
    });

    await this._chatRoomRepositories.save(chatRoom);

    return chatRoom;
  }
}
