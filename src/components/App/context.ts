import { createContext, useContext } from "react";
import { Absence, Build, BuildPlayer, SelectOption } from "../../types";

type AppContextApi = {
  importPlayer: (player: BuildPlayer, buildId: number) => Promise<void>;
  deletePlayer: (player: BuildPlayer, buildId: number) => Promise<void>;
  addToRoster: (player: BuildPlayer) => Promise<void>;
  removeFromRoster: (player: BuildPlayer) => Promise<void>;
  loadBuildSql: (buildId: number) => Promise<void>;
  resetBuild: (buildId: number) => Promise<void>;
  getBuild: (buildId: number) => Build;
  getOtherBuildName: (buildId: number) => string;
  getCurrentRoster: () => Build;
  setRosterExpanded: (state: boolean) => void;
  getRosterExpanded: () => boolean;
  editPlayer: (player: BuildPlayer) => void;
  handleSorting: (sort: any) => void;
  getCurrentSorting: () => string;
  handleSelect: (buildId: number) => (value: any) => void;
  getBuilds: () => SelectOption[];
  addBuild: (title: string, buildId: number) => void;
  deleteBuild: (title: string, buildId: number) => void;
  getPlayerAbsence: (player: string) => Absence[];
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
