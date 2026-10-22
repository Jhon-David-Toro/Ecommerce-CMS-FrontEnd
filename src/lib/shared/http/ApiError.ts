/**
 * Error of a request that the API answered with a failure status.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  /**
   * Builds the error from the answer of the API.
   *
   * @param status HTTP status of the answer.
   * @param code Machine readable code of the failure.
   * @param message Text that can be shown to the user.
   */
  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}
