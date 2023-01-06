export interface Env {
  API_URL: string;
  API_KEY: string;
  FRONTEND_URL: string;
}

export interface HandlerParams {
  request: Request;
  url: URL;
  env: Env;
}

export interface BuildMeta {
  name: string;
  total: number;
  tanks: number;
  healers: number;
  dps: number;
  unknown?: number;
}
