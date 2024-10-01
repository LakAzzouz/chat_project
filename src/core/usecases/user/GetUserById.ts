import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { UserRepositories } from "../../repositories/UserRepositories";
import { Usecases } from "../usecase";

type GetUserByIdInput = {
  id: string;
};

export class GetUserById implements Usecases<GetUserByIdInput, Promise<User>> {
  constructor(private readonly _userRepository: UserRepositories) {}

  async execute(input: GetUserByIdInput): Promise<User> {
    const { id } = input;

    const user = await this._userRepository.getById(id);

    if (!user) {
      throw new UserError.NotFound();
    }

    await this._userRepository.save(user);

    return user;
  }
}
