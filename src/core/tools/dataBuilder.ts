import { ChatRoom } from "../entities/ChatRoom";
import { Message } from "../entities/Message";
import { PrivateMessage } from "../entities/PrivateMessage";
import { User } from "../entities/User";
import { RoleType } from "../types/RoleTypes";
import { Participant } from "../entities/Participant";
import { NotificationType } from "../types/NotificationType";
import { Notification } from "../entities/Notification";

type GenerateUser = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  isOnline?: boolean;
  lastLogin?: Date;
  created?: Date;
  updatedAt?: Date;
};

type GenerateChatRoom = {
  id?: string;
  name?: string;
  isPrivate?: boolean;
  createdBy?: User;
  participants?: User[];
  createdAt?: Date;
};

type GenerateMessage = {
  id?: string;
  content?: string;
  sender?: User;
  chatRoom?: ChatRoom;
  isRead?: boolean;
  sentAt?: Date;  
}

type GeneratePrivateMessage = {
  id?: string;
  content?: string;
  sender?: User;
  receiver?: User;
  sendAt?: Date;
  isRead?: boolean;
}

type GenerateParticipant = {
  id?: string;
  user?: User;
  chatRoom?: ChatRoom;
  joinedAt?: Date;
  role?: RoleType;
}

type GenerateNotification = {
  id?: string;
  type?: NotificationType;
  recipient?: User;
  chatRoom?: ChatRoom;
  message?: Message;
  createdAt?: Date;
}

export class DataBuilders {
  static generateUser(props?: GenerateUser): User {
    return new User({
      id: props?.id ? props.id : "user_id",
      username: props?.username ? props.username : "toto123",
      email: props?.email ? props.email : "toto@gmail.com",
      password: props?.password ? props.password : "Azerty123!",
      birthDate: props?.birthDate ? props.birthDate : new Date(1997, 5, 23),
      isOnline: props?.isOnline ? props.isOnline : true || false,
      lastLogin: props?.lastLogin ? props.lastLogin : new Date(),
      created: props?.created ? props.created : new Date(),
      updatedAt: props?.updatedAt ? props.updatedAt : new Date(),
    });
  }

  static generateChatRoom(props?: GenerateChatRoom): ChatRoom {
    return new ChatRoom({
      id: props?.id ? props.id : "chat_room_id",
      name: props?.name ? props.name : "chat_room",
      isPrivate: props?.isPrivate ? props.isPrivate : true || false,
      createdBy: props?.createdBy ? props.createdBy : new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      participants: props?.participants ? props.participants : [new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()})],
      createdAt: props?.createdAt ? props.createdAt : new Date()
    })
  }

  static generateMessage(props?: GenerateMessage): Message {
    return new Message({
      id: props?.id ? props.id : "message_id",
      content: props?.content ? props.content : "Hi !",
      sender: props?.sender ? props.sender : new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      chatRoom: props?.chatRoom ? props.chatRoom : new ChatRoom({id: "chat_room_id", name: "chat_room", isPrivate: true || false, createdBy: new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()}), participants: [new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()})], createdAt: new Date()}),
      isRead: props?.isRead ? props.isRead : true || false,
      sentAt: props?.sentAt ? props?.sentAt : new Date()
    })
  }

  static generatePrivateMessage(props?: GeneratePrivateMessage): PrivateMessage {
    return new PrivateMessage({
      id: props?.id ? props.id : "private_message_id",
      content: props?.content ? props.content : "Hi !",
      sender: props?.sender ? props.sender : new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      receiver: props?.receiver ? props.receiver : new User({id: "user_id2", username: "jojo123", email: "jojo@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 8, 2), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      sendAt: props?.sendAt ? props.sendAt : new Date(),
      isRead: props?.isRead ? props.isRead : true || false
    });
  }

  static generateParticipant(props?: GenerateParticipant): Participant {
    return new Participant({
      id: props?.id ? props.id : "user_id",
      user: props?.user ? props.user : new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      chatRoom: props?.chatRoom ? props.chatRoom : new ChatRoom({id: "chat_room_id", name: "chat_room", isPrivate: true || false, createdBy: new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()}), participants: [new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()})], createdAt: new Date()}),
      joinedAt: props?.joinedAt ? props.joinedAt : new Date(),
      role: props?.role ? props.role : RoleType.ADMIN || RoleType.MEMBER
    });
  }

  static generateNotification(props?: GenerateNotification): Notification {
    return new Notification({
      id: props?.id ? props.id : "notification_id",
      type: props?.type ? props.type : NotificationType.INVITE || NotificationType.MESSAGE,
      recipient: props?.recipient ? props.recipient : new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}),
      chatRoom: props?.chatRoom ? props.chatRoom : new ChatRoom({id: "chat_room_id", name: "chat_room", isPrivate: true || false, createdBy: new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()}), participants: [new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()})], createdAt: new Date()}),
      message: props?.message ? props.message : new Message({id: "message_id", content: "Hi !", sender: new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date()}), chatRoom: new ChatRoom({id: "chat_room_id", name: "chat_room", isPrivate: true || false, createdBy: new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()}), participants: [new User({id: "user_id", username: "toto123", email: "toto@gmail.com", password: "Azerty123!", birthDate: new Date(1997, 5, 23), isOnline : true || false, lastLogin: new Date(), created: new Date(), updatedAt: new Date()})], createdAt: new Date()}), sentAt: new Date(), isRead: true || false}),
      createdAt: props?.createdAt ? props.createdAt : new Date(),
    })
  }
}
