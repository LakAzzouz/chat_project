import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { MessageRepositories } from "../../repositories/MessageRepositories";

export class InMemoryMessageRepositories implements MessageRepositories {
  map = new Map<string, Message>();

  constructor(map: Map<string, Message>) {
    this.map = map;
  }

  async save(message: Message): Promise<void> {
    this.map.set(message.props.id, message);
    return;
  }

  async getById(id: string): Promise<Message | null> {
    const message = this.map.get(id);
    if (!message) {
      return null;
    }
    return message;
  }

  async getBySender(user: User): Promise<Message | null> {
    const arr = Array.from(this.map.values());
    const message = arr.find((elm) => elm.props.sender.props.id === user.props.id);
    if (!message) {
      return null;
    }
    return message;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
