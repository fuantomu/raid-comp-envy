import { createContext, useContext } from "react";
import { Absence, Build, BuildPlayer, SelectOption } from "../../types";

type AppContextApi = {
  importPlayer: (player: BuildPlayer, ignoreErrors?:boolean) => void ;
  removePlayerFromRaid: (player: BuildPlayer, save:boolean, saveRoster?:boolean) => void;
  removePlayerFromRaids: (player: BuildPlayer, save:boolean, saveRoster?:boolean) => void;
  updateRoster: (player: BuildPlayer) => void;
  removeFromRoster: (player: BuildPlayer) => void;
  resetBuild: (buildId: number) => void;
  getBuild: (buildId: number) => Build;
  getOtherBuilds: (buildId: number) => Build[];
  setRosterExpanded: (state: boolean) => void;
  getRosterExpanded: () => boolean;
  editPlayer: (player: BuildPlayer) => void;
  handleSorting: (sort: any) => void;
  getCurrentSorting: () => string;
  handleSelect: (buildId: number) => (value: any) => void;
  getBuilds: () => SelectOption[];
  addBuild: (title: string, buildId: number) => void;
  deleteBuild: (buildId: number) => void;
  getPlayerAbsence: (player: string) => Absence[];
  setBuildInstance: (buildId: number) => (value: any) => void;
  getAbsentPlayers: (buildId: number) => BuildPlayer[];
  getUnsetMains: (buildId: number) => BuildPlayer[];
  handleShowError: (callback: any) => void;
  getAlts: (player: BuildPlayer) => BuildPlayer[];
  getMains: () => BuildPlayer[];
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
