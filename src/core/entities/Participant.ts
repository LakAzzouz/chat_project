import { RoleType } from "../types/RoleTypes";
import { ChatRoom } from "./ChatRoom";
import { User } from "./User";

type ParticipantProperties = {
  id: string;
  user: User;
  chatRoom: ChatRoom;
  joinedAt: Date;
  role: RoleType
};

export class Participant {
  props: ParticipantProperties;

  constructor(partipantProperties: ParticipantProperties) {
    this.props = partipantProperties;
  }

  static create(props: {id: string, user: User, chatRoom: ChatRoom, role: RoleType}): Participant {
    const particpant = new Participant({
      id: props.user.props.id,
      user: props.user,
      chatRoom: props.chatRoom,
      joinedAt: new Date(),
      role: props.role,
    });
    return particpant;
  }

  update(newRole: RoleType): Participant {
    this.props.role = newRole;
    return this;
  }
}
