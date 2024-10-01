import { InMemoryNotificationRepositories } from "../../adapters/repositories/InMemoryNotificationRepositories";
import { Notification } from "../../entities/Notification";
import { NotificationErrors } from "../../errors/NotificationErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetNotificationById } from "../../usecases/notification/GetNotificationById";

describe("Unit - get notification by id", () => {
  let getNotificationById: GetNotificationById;
  const notificationDb = new Map<string, Notification>();

  const notification = DataBuilders.generateNotification();

  beforeAll(async () => {
    const notificationRepositories = new InMemoryNotificationRepositories(notificationDb);
    getNotificationById = new GetNotificationById(notificationRepositories);
  });

  afterEach(async () => {
    notificationDb.clear();
  });

  it("Should get notification by id", async () => {
    notificationDb.set(notification.props.id, notification);

    const result = await getNotificationById.execute({
      id: notification.props.id,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.type).toEqual(notification.props.type);
    expect(result.props.recipient).toEqual(notification.props.recipient);
    expect(result.props.message).toEqual(notification.props.message);
    expect(result.props.chatRoom).toEqual(notification.props.chatRoom);
    expect(result.props.createdAt).toBeDefined();
  });

  it("Throw an error because notification is not found", async () => {
    const result = getNotificationById.execute({
      id: notification.props.id,
    });

    await expect(result).rejects.toThrow(NotificationErrors.NotFound);
  });
});
