import { createContext, useContext } from "react";
import { Absence, Build, BuildPlayer, SelectOption } from "../../types";

type AppContextApi = {
  importPlayer: (
    player: BuildPlayer,
    ignoreErrors?: boolean,
    oldRaid?: number,
    swap?: boolean
  ) => void;
  removePlayerFromRaid: (player: BuildPlayer, save: boolean, saveRoster?: boolean) => void;
  removePlayerFromRaids: (player: BuildPlayer, save: boolean, saveRoster?: boolean) => void;
  updateRoster: (player: BuildPlayer, send?: boolean, remove?: boolean) => void;
  resetBuild: (build_id: number) => void;
  getRaid: (build_id: number) => Build;
  getBuilds: () => Build[];
  editPlayer: (player: BuildPlayer, fromRoster?: boolean) => void;
  handleBuildSelect: (build_id: number, value: any) => void;
  handleDateSelect: (build_id: number, value: any) => void;
  getBuildSelections: () => SelectOption[];
  addBuild: (title: string, build_id: number, save?: boolean) => void;
  deleteBuild: (id: string) => void;
  getPlayerAbsence: (player: string, date?: number) => Absence[];
  setBuildInstance: (build_id: number, value: any) => void;
  getAbsentPlayers: (build_id: number) => BuildPlayer[];
  getUnsetMains: (build_id: number) => BuildPlayer[];
  getAlts: (player: BuildPlayer) => BuildPlayer[];
  getMains: () => BuildPlayer[];
  getSelectedBuilds: () => SelectOption[];
  getVersion: () => string;
  getAccountRole: () => number;
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
