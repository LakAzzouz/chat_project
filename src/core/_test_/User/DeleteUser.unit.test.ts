import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepositories";
import { User } from "../../entities/User";
import { UserError } from "../../errors/UserErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeleteUser } from "../../usecases/user/DeleteUser";

describe("Unit - delete user", () => {
  let deleteUser: DeleteUser;
  const userDb = new Map<string, User>();

  const user = DataBuilders.generateUser();

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    deleteUser = new DeleteUser(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should delete user", async () => {
    userDb.set(user.props.id, user);

    await deleteUser.execute({
      id: user.props.id,
    });

    const result = userDb.get(user.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the user is not found", async () => {
    const result = deleteUser.execute({
      id: user.props.id,
    });

    await expect(result).rejects.toThrow(UserError.NotFound);
  });
});
