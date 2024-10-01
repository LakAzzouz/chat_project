import { Participant } from "../../entities/Participant";
import { User } from "../../entities/User";
import { ParticipantRepositories } from "../../repositories/ParticipantRepositories";

export class InMemoryParticipantRepositories implements ParticipantRepositories {
  map = new Map<string, Participant>();

  constructor(map: Map<string, Participant>) {
    this.map = map;
  }

  async save(participant: Participant): Promise<void> {
    this.map.set(participant.props.id, participant);
    return;
  }

  async getById(id: string): Promise<Participant | null> {
    const participant = this.map.get(id);
    if (!participant) {
      return null;
    }
    return participant;
  }

  async getByUser(user: User): Promise<Participant | null> {
    const arr = Array.from(this.map.values());
    const participant = arr.find((elm) => elm.props.user.props.id === user.props.id);
    if(!participant) {
      return null;
    }
    return participant;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
}
}
