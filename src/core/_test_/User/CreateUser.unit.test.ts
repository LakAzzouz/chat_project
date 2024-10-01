import { MockPasswordGateway } from "../../adapters/gateways/MockPasswordGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepositories";
import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreateUser } from "../../usecases/user/CreateUser";

describe("Unit - create user", () => {
  let createUser: CreateUser;
  const userDb = new Map<string, User>();

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    const passwordGateway = new MockPasswordGateway();
    createUser = new CreateUser(userRepository, passwordGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should create a user", async () => {
    const result = await createUser.execute({
      username: user.props.username,
      email: user.props.email,
      password: user.props.password,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.username).toEqual(user.props.username);
    expect(result.props.email).toEqual(user.props.email);
    expect(result.props.password).toEqual(user.props.password);
    expect(result.props.birthDate).toEqual(user.props.birthDate);
    expect(result.props.isOnline).toEqual(user.props.isOnline);
    expect(result.props.created).toBeDefined();
  });

  it("Should throw an error because the mail is invalid", async () => {
    const result = createUser.execute({
      username: user.props.username,
      email: "totogmail.com",
      password: user.props.password,
    });

    await expect(result).rejects.toThrow(UserError.EmailInvalid);
  });

  it("Should throw an error because the password is invalid", async () => {
    const result = createUser.execute({
      username: user.props.username,
      email: user.props.email,
      password: "azerty"
    });

    await expect(result).rejects.toThrow(UserError.PasswordInvalid);
  });

  it("Should throw an error because the user already exist", async () => {
    userDb.set(user.props.id, user);

    const result = createUser.execute({
      username: user.props.username,
      email: user.props.email,
      password: user.props.password
    });

    await expect(result).rejects.toThrow(UserError.AlreadyExist)
  });
});
