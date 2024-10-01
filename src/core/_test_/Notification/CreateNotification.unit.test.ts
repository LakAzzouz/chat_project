import { InMemoryNotificationRepositories } from "../../adapters/repositories/InMemoryNotificationRepositories";
import { Notification } from "../../entities/Notification";
import { DataBuilders } from "../../tools/dataBuilder";
import { CreateNotification } from "../../usecases/notification/CreateNotification";

describe("Unit - create notification", () => {
  let createNotification: CreateNotification;
  const notificationDb = new Map<string, Notification>();

  const notification = DataBuilders.generateNotification();

  beforeAll(async () => {
    const notificationRepositories = new InMemoryNotificationRepositories(notificationDb);
    createNotification = new CreateNotification(notificationRepositories);
  });

  afterEach(async () => {
    notificationDb.clear();
  });

  it("Should create notification", async () => {
    const result = await createNotification.execute({
      type: notification.props.type,
      recipient: notification.props.recipient,
      message: notification.props.message,
      chatRoom: notification.props.chatRoom,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.type).toEqual(notification.props.type);
    expect(result.props.recipient).toEqual(notification.props.recipient);
    expect(result.props.message).toEqual(notification.props.message);
    expect(result.props.chatRoom).toEqual(notification.props.chatRoom);
    expect(result.props.createdAt).toBeDefined();
  });
});
