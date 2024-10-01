import { Notification } from "../entities/Notification";
import { User } from "../entities/User";

export interface NotificationRepositories {
  save(notification: Notification): Promise<void>;

  getById(id: string): Promise<Notification | null>;

  getByRecipient(user: User): Promise<Notification | null>;

  delete(id: string): Promise<void>;
}
