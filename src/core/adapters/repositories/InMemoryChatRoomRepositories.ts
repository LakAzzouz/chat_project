import { ChatRoom } from "../../entities/ChatRoom";
import { ChatRoomRepositories } from "../../repositories/ChatRoomRepositories";

export class InMemoryChatRoomRepository implements ChatRoomRepositories {
  map: Map<string, ChatRoom>;

  constructor(map: Map<string, ChatRoom>) {
    this.map = map;
  }

  async save(chatRoom: ChatRoom): Promise<void> {
    this.map.set(chatRoom.props.id, chatRoom);
    return;
  }

  async getById(id: string): Promise<ChatRoom | null> {
    const chatRoom = this.map.get(id);
    if (!chatRoom) {
      return null
    }
    return chatRoom;
  }

  async getByName(name: string): Promise<ChatRoom | null> {
    const arr = Array.from(this.map.values());
    const chatRoom = arr.find((elm) => elm.props.name === name);
    if (!chatRoom) {
      return null;
    }
    return chatRoom;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
