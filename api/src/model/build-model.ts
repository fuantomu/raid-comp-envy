import Schema from "gstore-node/lib/schema";
import { DatastoreConnector } from "../datastore-connector";
import { BuildId } from "../types";
import { PlayerType } from "./player-model";

const gstore = DatastoreConnector.getInstance();

export interface BuildType {
  buildId: BuildId;
  name: string;
  players: Array<PlayerType>;
  lastSeen?: Date;
}

const BuildSchema = new Schema<BuildType>({
  buildId: { type: String },
  name: { type: String },
  players: { type: Array },
  lastSeen: { type: Date, default: gstore.defaultValues.NOW },
});

export const BuildModel = gstore.model<BuildType>("Build", BuildSchema);
