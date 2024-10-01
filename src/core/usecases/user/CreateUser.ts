import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { PasswordGateway } from "../../gateways/PasswordGateways";
import { UserRepositories } from "../../repositories/UserRepositories";
import { Email } from "../../valuesObject/emailValidated";
import { Password } from "../../valuesObject/passwordValidated";
import { Usecases } from "../usecase";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

export class CreateUser implements Usecases<CreateUserInput, Promise<User>> {
  constructor(
    private readonly _userRepositories: UserRepositories,
    private readonly _passwordGateway: PasswordGateway
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const { username, email, password } = input;

    const emailValidated = Email.validate(email);

    const alreadyExist = await this._userRepositories.getByEmail(emailValidated);

    if (alreadyExist) {
      throw new UserError.AlreadyExist();
    }

    const passwordValidated = Password.validate(password);

    const hashPassword = this._passwordGateway.hashPassword(passwordValidated);

    const user = User.create({
      username,
      email,
      password: hashPassword,
    });

    await this._userRepositories.save(user);

    return user;
  }
}
