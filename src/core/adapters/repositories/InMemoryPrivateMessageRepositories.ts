import { PrivateMessage } from "../../entities/PrivateMessage";
import { User } from "../../entities/User";
import { PrivateMessageRepositories } from "../../repositories/PrivateMessageRepositories";

export class InMemoryPrivateMessage implements PrivateMessageRepositories {
  map = new Map<string, PrivateMessage>();

  constructor(map: Map<string, PrivateMessage>) {
    this.map = map;
  }

  async save(privateMessage: PrivateMessage): Promise<void> {
    this.map.set(privateMessage.props.id, privateMessage);
    return;
  }

  async getById(id: string): Promise<PrivateMessage | null> {
    const privateMessage = this.map.get(id);
    if (!privateMessage) {
      return null;
    }
    return privateMessage;
  }

  async getBySender(sender: User): Promise<PrivateMessage | null> {
    const arr = Array.from(this.map.values());
    const privateMessage = arr.find((elm) => elm.props.sender.props.id === sender.props.id);
    if (!privateMessage) {
      return null;
    }
    return privateMessage;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
