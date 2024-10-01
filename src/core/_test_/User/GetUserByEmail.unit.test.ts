import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepositories";
import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetUserByEmail } from "../../usecases/user/GetUserByEmail";

describe("Unit - get user by email", () => {
  let getUserByEmail: GetUserByEmail;
  const userDb = new Map<string, User>();

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    getUserByEmail = new GetUserByEmail(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should get user by email", async () => {
    userDb.set(user.props.id, user);

    const result = await getUserByEmail.execute({
      email: user.props.email,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.username).toEqual(user.props.username);
    expect(result.props.email).toEqual(user.props.email);
    expect(result.props.password).toEqual(user.props.password);
    expect(result.props.birthDate).toEqual(user.props.birthDate);
    expect(result.props.isOnline).toEqual(user.props.isOnline);
    expect(result.props.created).toBeDefined();
  });

  it("Should throw an error because the user is not found", async () => {
    const result = getUserByEmail.execute({
      email: user.props.email,
    });

    await expect(result).rejects.toThrow(UserError.NotFound);
  });
});
