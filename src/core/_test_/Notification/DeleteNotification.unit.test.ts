import { InMemoryNotificationRepositories } from "../../adapters/repositories/InMemoryNotificationRepositories";
import { Notification } from "../../entities/Notification";
import { DataBuilders } from "../../tools/dataBuilder";
import { DeleteNotification } from "../../usecases/notification/DeleteNotification";

describe("Unit - delete notification", () => {
  let deleteNotification: DeleteNotification;
  const notificationDb = new Map<string, Notification>();

  const notification = DataBuilders.generateNotification();

  beforeAll(async () => {
    const notificationRepositories = new InMemoryNotificationRepositories(notificationDb);
    deleteNotification = new DeleteNotification(notificationRepositories);
  });

  afterEach(async () => {
    notificationDb.clear();
  });

  it("Should delete notification", async () => {
    notificationDb.set(notification.props.id, notification);

    await deleteNotification.execute({
      id: notification.props.id,
    });

    const result = notificationDb.get(notification.props.id);

    expect(result).toBeUndefined();
  });

  it("Throw an error because notification is not found", async () => {
    const result = deleteNotification.execute({
      id: notification.props.id,
    });

    await expect(result).rejects.toThrow();
  });
});
