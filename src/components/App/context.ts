import { createContext, useContext } from "react";
import { Absence, Build, BuildPlayer, SelectOption } from "../../types";

type AppContextApi = {
  importPlayer: (player: BuildPlayer, ignoreErrors?: boolean, oldBuild?: number) => void;
  removePlayerFromRaid: (player: BuildPlayer, save: boolean, saveRoster?: boolean) => void;
  removePlayerFromRaids: (player: BuildPlayer, save: boolean, saveRoster?: boolean) => void;
  updateRoster: (player: BuildPlayer, save?: boolean) => void;
  removeFromRoster: (player: BuildPlayer, save?: boolean) => void;
  resetBuild: (build_id: number) => void;
  getBuild: (build_id: number) => Build;
  getOtherBuilds: (build_id: number) => Build[];
  setRosterExpanded: (state: boolean) => void;
  getRosterExpanded: () => boolean;
  editPlayer: (player: BuildPlayer) => void;
  handleSorting: (sort: any) => void;
  getCurrentSorting: () => string;
  handleBuildSelect: (build_id: number, value: any) => void;
  handleDateSelect: (build_id: number, value: any) => void;
  getBuilds: () => SelectOption[];
  addBuild: (title: string, build_id: number, save?: boolean) => void;
  deleteBuild: (id: string) => void;
  getPlayerAbsence: (player: string) => Absence[];
  setBuildInstance: (build_id: number, value: any) => void;
  getAbsentPlayers: (build_id: number) => BuildPlayer[];
  getUnsetMains: (build_id: number) => BuildPlayer[];
  handleShowError: (callback: any) => void;
  getAlts: (player: BuildPlayer) => BuildPlayer[];
  getMains: () => BuildPlayer[];
  getSelectedBuilds: (build_id: number) => SelectOption[];
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
