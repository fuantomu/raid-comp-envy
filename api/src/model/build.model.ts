import Schema from "gstore-node/lib/schema";
import { GroupId, InviteStatus, WarcraftPlayerClass, WarcraftPlayerSpec } from "../consts";
import { DatastoreConnector } from "../datastore-connector";
import { BuildId } from "../types";

const gstore = DatastoreConnector.getInstance();

export interface BuildCreateType {
  name: string;
  players: Array<PlayerType>;
}

export interface BuildType extends BuildCreateType {
  buildId: BuildId;
  lastSeen: Date;
}

export interface PlayerType {
  name: string;
  realm?: string;
  class: WarcraftPlayerClass;
  spec?: WarcraftPlayerSpec;
  status: InviteStatus;
  group?: GroupId;
}

const BuildSchema = new Schema<BuildType>({
  buildId: { type: String },
  name: { type: String },
  players: { type: Array },
  lastSeen: { type: Date, default: gstore.defaultValues.NOW },
});

export const BuildModel = gstore.model<BuildType>("Build", BuildSchema);
