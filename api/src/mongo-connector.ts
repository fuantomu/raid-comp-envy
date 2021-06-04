import { config } from "dotenv";
import * as mongoose from "mongoose";
import { Connection, ConnectionOptions } from "mongoose";

export class MongoConnector {
  private mongoConnection: Connection;

  constructor() {
    config({ path: ".env" });
    config({ path: `.env.${process.env.NODE_ENV}` });
    (mongoose as any).Promise = global.Promise;
  }

  /**
   * Initiate connection to MongoDB
   * @returns {Promise<any>}
   */
  public connect(): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      const options: ConnectionOptions = {
        keepAlive: true,
        useNewUrlParser: true,
      };
      this.mongoConnection = mongoose.connection;
      mongoose
        .connect(process.env.MONGODB_URI, options)
        .then(() => {
          const indexOfA = process.env.MONGODB_URI.indexOf("@");
          const db =
            indexOfA !== -1
              ? process.env.MONGODB_URI.substring(0, 10) +
                "!_:_!" +
                process.env.MONGODB_URI.substring(indexOfA)
              : process.env.MONGODB_URI;
          // TODO: winston
          // tslint:disable-next-line:no-console
          console.log("MongoDB connected [%s]", db);
          resolve(void 0);
        })
        .catch(reject);
    });
  }

  /**
   * Disconnects from MongoDB
   * @returns {Promise<any>}
   */
  public disconnect(): Promise<any> {
    return this.mongoConnection.close();
  }
}
