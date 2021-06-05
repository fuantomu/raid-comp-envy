import { ApiServer } from "./api-server";
import { DatastoreConnector } from "./datastore-connector";

export async function start(): Promise<void> {
  const apiServer = new ApiServer();
  await apiServer.start();
  await DatastoreConnector.connect();
  const graceful = async () => {
    await apiServer.stop();
    process.exit(0);
  };

  // Stop graceful
  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
}
