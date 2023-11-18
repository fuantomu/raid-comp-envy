import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AppErrorId } from "../../consts";
import { BuildId } from "../../types";
import AppError from "../../utils/AppError";
import { getBuildResponseData, postBuildRequestData, postBuildResponseData } from "./types";

export const baseURL = "http://localhost:8080/api";

const errorMap: Record<string, AppErrorId> = {
  "403": AppErrorId.Api403,
  "404": AppErrorId.Api404,
};

const service = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  withCredentials: true,
});

service.interceptors.response.use(undefined, (error: AxiosError) => {
  if (axios.isCancel(error)) {
    throw new AppError(AppErrorId.ApiCancelled);
  } else {
    const status = (error as AxiosError).response?.status.toString();

    throw new AppError(status && status in errorMap ? errorMap[status] : AppErrorId.Unspecific);
  }
});

export const getBuild = (buildId: BuildId, config?: AxiosRequestConfig) =>
  service.get<getBuildResponseData>(`/builds/${buildId}`, config);

export const postBuild = (data: postBuildRequestData, config?: AxiosRequestConfig) =>
  service.post<postBuildResponseData>(`/builds`, data, config);
