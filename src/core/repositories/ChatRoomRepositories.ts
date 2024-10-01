import { ChatRoom } from "../entities/ChatRoom";

export interface ChatRoomRepositories {
  save(chatRoom: ChatRoom): Promise<void>;

  getById(id: string): Promise<ChatRoom | null>;

  getByName(name: string): Promise<ChatRoom | null>;

  delete(id: string): Promise<void>;
}
