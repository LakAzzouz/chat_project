import { v4 } from "uuid";
import { ChatRoom } from "./ChatRoom";
import { User } from "./User";

type MessageProperties = {
  id: string;
  content: string;
  sender: User;
  chatRoom: ChatRoom;
  isRead: boolean;
  sentAt: Date;
};

export class Message {
  props: MessageProperties;

  constructor(messageProperties: MessageProperties) {
    this.props = messageProperties;
  }

  static create(props: {content: string, sender: User, chatRoom: ChatRoom, isRead: boolean}): Message {
    const message = new Message({
      id: v4(),
      content: props.content,
      sender: props.sender,
      chatRoom: props.chatRoom,
      isRead: props.isRead,
      sentAt: new Date(),
    });
    return message;
  }

  update(newContent: string): Message {
    this.props.content = newContent;
    return this;
  }
}
