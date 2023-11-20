export class ApiError extends Error {
  constructor(public id: AppErrorId, public cause: Error) {
    super(id);
    this.id = id;
    this.cause = cause;
  }
}

export enum AppErrorId {
  Unspecific = "unspecific",
  ApiCancelled = "apiCancelled",
  Api400 = "api400",
  Api404 = "api404",
}