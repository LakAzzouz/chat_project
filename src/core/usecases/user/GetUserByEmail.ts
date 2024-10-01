import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { UserRepositories } from "../../repositories/UserRepositories";
import { Usecases } from "../usecase";

type GetUserByEmailInput = {
  email: string;
};

export class GetUserByEmail implements Usecases<GetUserByEmailInput, Promise<User>> {
  constructor(private readonly _userRepositories: UserRepositories) {}

  async execute(input: GetUserByEmailInput): Promise<User> {
    const { email } = input;

    const user = await this._userRepositories.getByEmail(email);

    if (!user) {
      throw new UserError.NotFound();
    }

    await this._userRepositories.save(user);

    return user;
  }
}
