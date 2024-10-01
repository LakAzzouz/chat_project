import { InMemoryNotificationRepositories } from "../../adapters/repositories/InMemoryNotificationRepositories";
import { Notification } from "../../entities/Notification";
import { NotificationErrors } from "../../errors/NotificationErrors";
import { DataBuilders } from "../../tools/dataBuilder";
import { GetNotificationByRecipient } from "../../usecases/notification/GetNotificationByRecipient";

describe("Unit - get notification by recipient", () => {
  let getNotificationByRecipient: GetNotificationByRecipient;
  const notificationDb = new Map<string, Notification>();

  const notification = DataBuilders.generateNotification();

  beforeAll(async () => {
    const notificationRepositories = new InMemoryNotificationRepositories(notificationDb);
    getNotificationByRecipient = new GetNotificationByRecipient(notificationRepositories);
  });

  afterEach(async () => {
    notificationDb.clear();
  });

  it("Should get notification by recipient", async () => {
    notificationDb.set(notification.props.id, notification);

    const result = await getNotificationByRecipient.execute({
      recipient: notification.props.recipient,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.type).toEqual(notification.props.type);
    expect(result.props.recipient).toEqual(notification.props.recipient);
    expect(result.props.message).toEqual(notification.props.message);
    expect(result.props.chatRoom).toEqual(notification.props.chatRoom);
    expect(result.props.createdAt).toBeDefined();
  });

  it("Throw an error because notification is not found", async () => {
    const result = getNotificationByRecipient.execute({
      recipient: notification.props.recipient,
    });

    await expect(result).rejects.toThrow(NotificationErrors.NotFound);
  });
});
