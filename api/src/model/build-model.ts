import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { BuildType } from "../types";
import { PlayerSchema } from "./player-model";

export type BuildDocument = BuildType & mongoose.Document;

const RaidBuildSchema = new mongoose.Schema(
  {
    buildId: { type: String, required: true, unique: true, index: true },
    name: { type: String, unique: false, index: false },
    players: [PlayerSchema],
  },
  { timestamps: true }
);

const BuildModel: Model<BuildDocument> = mongoose.model<BuildDocument>(
  "RaidBuild",
  RaidBuildSchema
);
export default BuildModel;
