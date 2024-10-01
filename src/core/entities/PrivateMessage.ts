import { v4 } from "uuid";
import { User } from "./User";

type PrivateMessageProperties = {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  sendAt: Date;
  isRead: boolean;
};

export class PrivateMessage {
  props: PrivateMessageProperties;

  constructor(privateMessageProperties: PrivateMessageProperties) {
    this.props = privateMessageProperties;
  }

  static create(props: {content: string, sender: User, receiver: User, isRead: boolean;}): PrivateMessage {
    const privateMessage = new PrivateMessage({
      id: v4(),
      content: props.content,
      sender: props.sender,
      receiver: props.receiver,
      sendAt: new Date(),
      isRead: props.isRead,
    });
    return privateMessage;
  }

  update(newContent: string): PrivateMessage {
    this.props.content = newContent;
    return this;
  }
}
