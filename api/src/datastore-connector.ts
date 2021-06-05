import { Datastore } from "@google-cloud/datastore";
import { Gstore } from "gstore-node";

export class DatastoreConnector {
  private static INSTANCE: DatastoreConnector;

  private gstore: Gstore;

  private constructor() {
    this.gstore = new Gstore({
      errorOnEntityNotFound: false,
    });

    const datastore = new Datastore({
      projectId: process.env.DATASTORE_PROJECT_ID,
      apiEndpoint: process.env.DATASTORE_URL,
    });

    // Then connect gstore to the datastore instance
    this.gstore.connect(datastore);
  }

  public static getInstance(): Gstore {
    if (!this.INSTANCE) {
      this.INSTANCE = new DatastoreConnector();
    }
    return this.INSTANCE.gstore;
  }

  public static async connect(): Promise<void> {
    this.getInstance();
  }
}
