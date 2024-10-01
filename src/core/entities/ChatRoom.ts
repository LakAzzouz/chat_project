import { v4 } from "uuid";
import { User } from "./User";

export type ChatRoomProperties = {
  id: string;
  name: string;
  isPrivate: boolean;
  createdBy: User;
  participants: User[];
  createdAt: Date;
};

export class ChatRoom {
  props: ChatRoomProperties;

  constructor(chatRoomProperties: ChatRoomProperties) {
    this.props = chatRoomProperties;
  }

  static create(props: {name: string, isPrivate: boolean, createdBy: User, participants: User[]}): ChatRoom {
    const chatRoom = new ChatRoom({
      id: v4(),
      name: props.name,
      isPrivate: props.isPrivate,
      createdBy: props.createdBy,
      participants: props.participants,
      createdAt: new Date(),
    });
    return chatRoom;
  }

  update(newName: string): ChatRoom {
    this.props.name = newName;
    return this;
  }
}
