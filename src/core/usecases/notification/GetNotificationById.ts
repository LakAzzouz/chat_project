import { Notification } from "../../entities/Notification";
import { NotificationErrors } from "../../errors/NotificationErrors";
import { NotificationRepositories } from "../../repositories/NotificationRepositories";
import { Usecases } from "../usecase";

type GetNotificationByIdInput = {
  id: string;
};

export class GetNotificationById implements Usecases<GetNotificationByIdInput, Promise<Notification>> {
  constructor(
    private readonly _notificationRepositories: NotificationRepositories
  ) {}

  async execute(input: GetNotificationByIdInput): Promise<Notification> {
    const { id } = input;

    const notification = await this._notificationRepositories.getById(id);

    if (!notification) {
      throw new NotificationErrors.NotFound();
    }

    return notification;
  }
}
