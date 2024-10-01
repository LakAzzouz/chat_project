import { UserError } from "../../errors/UserErrors";
import { UserRepositories } from "../../repositories/UserRepositories";
import { Usecases } from "../usecase";

type DeleteUserInput = {
  id: string;
};

export class DeleteUser implements Usecases<DeleteUserInput, Promise<void>> {
  constructor(private readonly _userRepositories: UserRepositories) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const { id } = input;

    const user = await this._userRepositories.getById(id);

    if (!user) {
      throw new UserError.NotFound();
    }

    await this._userRepositories.delete(id);

    return;
  }
}
