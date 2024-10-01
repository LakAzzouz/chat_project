import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { PasswordGateway } from "../../gateways/PasswordGateways";
import { UserRepositories } from "../../repositories/UserRepositories";
import { Usecases } from "../usecase";

type SignInInput = {
  email: string;
  password: string;
};

export class SignIn implements Usecases<SignInInput, Promise<User>> {
  constructor(
    private readonly _userRepositories: UserRepositories,
    private readonly _passwordGateway: PasswordGateway
  ) {}

  async execute(input: SignInInput): Promise<User> {
    const { email, password } = input;

    const user = await this._userRepositories.getByEmail(email);

    if (!user) {
      throw new UserError.NotFound();
    }

    const isMatching = this._passwordGateway.compare(
      password,
      user.props.password
    );

    if (!isMatching) {
      throw new UserError.PasswordIncorrect();
    }

    await this._userRepositories.save(user);

    return user;
  }
}
