import { AppErrorId } from "../../consts";
import { AppErrorData } from "../../types";

/**
 * Application Error class. An instance can be thrown with a member of the `AppErrorId` enum.
 */
export default class AppError extends Error {
  /**
   * Create a AppError instance
   *
   * @param id Expects a member of the AppErrorId enum
   * @param onRetry Optional function that represents an action that can be called to retry the event that caused the error
   */
  constructor(public id: AppErrorId, public onRetry?: AppErrorData["onRetry"]) {
    super(id);
    this.id = id;
    this.name = "AppError";
    this.onRetry = onRetry;
  }
}
