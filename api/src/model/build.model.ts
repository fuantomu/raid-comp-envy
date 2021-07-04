import Schema from "gstore-node/lib/schema";
import { GroupId } from "../consts";
import { DatastoreConnector } from "../datastore-connector";
import { BuildId } from "../types";

const gstore = DatastoreConnector.getInstance();

export interface BuildType {
  buildId: BuildId;
  name: string;
  players: Array<PlayerType>;
  lastSeen?: Date;
}

export interface PlayerType {
  name: string;
  realm?: string;
  class: string;
  spec?: string;
  status: string;
  group?: GroupId;
}

const BuildSchema = new Schema<BuildType>({
  buildId: { type: String },
  name: { type: String },
  players: { type: Array },
  lastSeen: { type: Date, default: gstore.defaultValues.NOW },
});

export const BuildModel = gstore.model<BuildType>("Build", BuildSchema);
