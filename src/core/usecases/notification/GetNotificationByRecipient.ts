import { Notification } from "../../entities/Notification";
import { User } from "../../entities/User";
import { NotificationErrors } from "../../errors/NotificationErrors";
import { NotificationRepositories } from "../../repositories/NotificationRepositories";
import { Usecases } from "../usecase";

type GetNotificationByRecipientInput = {
  recipient: User;
};

export class GetNotificationByRecipient implements Usecases<GetNotificationByRecipientInput, Promise<Notification>> {
  constructor(
    private readonly _notificationRepositories: NotificationRepositories
  ) {}

  async execute(input: GetNotificationByRecipientInput): Promise<Notification> {
    const { recipient } = input;

    const notification = await this._notificationRepositories.getByRecipient(
      recipient
    );

    if (!notification) {
      throw new NotificationErrors.NotFound();
    }

    return notification;
  }
}
