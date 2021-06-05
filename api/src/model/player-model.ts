import Schema from "gstore-node/lib/schema";
import { GroupId } from "../consts";
import { DatastoreConnector } from "../datastore-connector";

const gstore = DatastoreConnector.getInstance();

export interface PlayerType {
  name: string;
  realm?: string;
  class: string;
  spec?: string;
  status: string;
  group?: GroupId;
}

export const PlayerSchema = new Schema<PlayerType>({
  class: { type: String, required: true },
  group: { type: String },
  name: { type: String, required: true },
  realm: { type: String },
  spec: { type: String },
  status: { type: String },
});

export const PlayerModel = gstore.model<PlayerType>("Player", PlayerSchema);
