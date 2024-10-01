import { NotificationErrors } from "../../errors/NotificationErrors";
import { NotificationRepositories } from "../../repositories/NotificationRepositories";
import { Usecases } from "../usecase";

type DeleteNotificationInput = {
  id: string;
};

export class DeleteNotification implements Usecases<DeleteNotificationInput, Promise<void>> {
  constructor(
    private readonly _notificationRepositories: NotificationRepositories
  ) {}

  async execute(input: DeleteNotificationInput): Promise<void> {
    const { id } = input;

    const notification = await this._notificationRepositories.getById(id);

    if (!notification) {
      throw new NotificationErrors.NotFound();
    }

    await this._notificationRepositories.delete(id);

    return;
  }
}
