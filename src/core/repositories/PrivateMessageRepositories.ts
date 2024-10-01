import { PrivateMessage } from "../entities/PrivateMessage";
import { User } from "../entities/User";

export interface PrivateMessageRepositories {
  save(privateMessage: PrivateMessage): Promise<void>;

  getById(id: string): Promise<PrivateMessage | null>;

  getBySender(sender: User): Promise<PrivateMessage | null>;

  delete(id: string): Promise<void>;
}
