import { Participant } from "../entities/Participant";
import { User } from "../entities/User";

export interface ParticipantRepositories {
  save(participant: Participant): Promise<void>;

  getById(id: string): Promise<Participant | null>;

  getByUser(user: User): Promise<Participant | null>;

  delete(id: string): Promise<void>;
}
