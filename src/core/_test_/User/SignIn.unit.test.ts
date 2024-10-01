import { MockPasswordGateway } from "../../adapters/gateways/MockPasswordGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepositories";
import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { SignIn } from "../../usecases/user/SignIn";

describe("Unit - sign in", () => {
  let signIn: SignIn;
  const userDb = new Map<string, User>();

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    const passwordGateway = new MockPasswordGateway();
    signIn = new SignIn(userRepository, passwordGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should sign in", async () => {
    userDb.set(user.props.id, user);

    const result = await signIn.execute({
      email: user.props.email,
      password: user.props.password,
    });

    expect(result.props.email).toEqual(user.props.email);
    expect(result.props.password).toEqual(user.props.password);
  });

  it("Should throw an error because user is not found", async () => {
    const result = signIn.execute({
      email: user.props.email,
      password: user.props.password,
    });

    await expect(result).rejects.toThrow(UserError.NotFound);
  });

  it("Should throw an error because the password is incorrect", async () => {
    userDb.set(user.props.id, user);

    const result = signIn.execute({
      email: user.props.email,
      password: "password_inccorect",
    });

    await expect(result).rejects.toThrow(UserError.PasswordIncorrect);
  });
});
