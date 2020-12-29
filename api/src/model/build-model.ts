import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { BuildType } from "../types";

export type BuildDocument = BuildType & mongoose.Document;

const RaidBuildSchema = new mongoose.Schema(
  {
    buildId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: false, unique: false, index: false },
    players: [
      {
        class: { type: String },
        group: { type: Number, required: false },
        name: { type: String },
        realm: { type: String, required: false },
        spec: { type: String, required: false },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const BuildModel: Model<BuildDocument> = mongoose.model<BuildDocument>(
  "RaidBuild",
  RaidBuildSchema
);
export default BuildModel;
