import * as mongoose from "mongoose";
import { BuildPlayer } from "../types";

export type PlayerDocument = BuildPlayer & mongoose.Document;

export const PlayerSchema = new mongoose.Schema({
  class: { type: String, required: true },
  group: { type: String },
  name: { type: String, required: true },
  realm: { type: String },
  spec: { type: String },
  status: { type: String },
});
