import { Build, BuildId } from "../../types";

export interface getBuildResponseData extends Build {};

export interface postBuildRequestData extends Build {};
export interface postBuildResponseData {
  buildId: BuildId
};
