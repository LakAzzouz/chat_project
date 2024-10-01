import { Notification } from "../../entities/Notification";
import { User } from "../../entities/User";
import { NotificationRepositories } from "../../repositories/NotificationRepositories";

export class InMemoryNotificationRepositories
  implements NotificationRepositories
{
  map = new Map<string, Notification>();

  constructor(map: Map<string, Notification>) {
    this.map = map;
  }

  async save(notification: Notification): Promise<void> {
    this.map.set(notification.props.id, notification);
    return;
  }

  async getById(id: string): Promise<Notification | null> {
    const notification = this.map.get(id);
    if (!notification) {
      return null;
    }
    return notification;
  }

  async getByRecipient(user: User): Promise<Notification | null> {
    const arr = Array.from(this.map.values());
    const notification = arr.find((elm) => elm.props.recipient.props.id === user.props.id);
    if (!notification) {
      return null;
    }
    return notification;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
