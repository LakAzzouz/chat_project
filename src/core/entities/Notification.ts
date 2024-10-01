import { v4 } from "uuid";
import { NotificationType } from "../types/NotificationType";
import { ChatRoom } from "./ChatRoom";
import { Message } from "./Message";
import { User } from "./User";

type NotificationProperties = {
  id: string;
  type: NotificationType;
  recipient: User;
  chatRoom?: ChatRoom;
  message?: Message;
  createdAt: Date;
};

export class Notification {
  props: NotificationProperties;

  constructor(notificationProperties: NotificationProperties) {
    this.props = notificationProperties;
  }

  static create(props: {type: NotificationType, recipient: User, chatRoom?: ChatRoom, message?: Message;}): Notification {
    const notificiation = new Notification({
      id: v4(),
      type: props.type,
      recipient: props.recipient,
      chatRoom: props.chatRoom,
      message: props.message,
      createdAt: new Date(),
    });
    return notificiation;
  }
}
