import { Message } from "../entities/Message";
import { User } from "../entities/User";

export interface MessageRepositories {
  save(message: Message): Promise<void>;

  getById(id: string): Promise<Message | null>;

  getBySender(user: User): Promise<Message | null>;

  delete(id: string): Promise<void>;
}
