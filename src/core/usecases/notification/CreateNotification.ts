import { ChatRoom } from "../../entities/ChatRoom";
import { Message } from "../../entities/Message";
import { Notification } from "../../entities/Notification";
import { User } from "../../entities/User";
import { NotificationRepositories } from "../../repositories/NotificationRepositories";
import { NotificationType } from "../../types/NotificationType";
import { Usecases } from "../usecase";

type CreateNotificationInput = {
  type: NotificationType;
  recipient: User;
  chatRoom?: ChatRoom;
  message?: Message;
};

export class CreateNotification implements Usecases<CreateNotificationInput, Promise<Notification>> {
  constructor(
    private readonly _notificationRepositories: NotificationRepositories
  ) {}

  async execute(input: CreateNotificationInput): Promise<Notification> {
    const { type, recipient, chatRoom, message } = input;

    const notification = Notification.create({
      type,
      recipient,
      chatRoom,
      message,
    });

    await this._notificationRepositories.save(notification);

    return notification;
  }
}
