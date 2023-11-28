import { createContext, useContext } from "react";
import { Build, BuildPlayer, SelectOption } from "../../types";

type AppContextApi = {
  importPlayer: (player: BuildPlayer) => Promise<void>;
  addToRoster: (player: BuildPlayer) => Promise<void>;
  removeFromRoster: (player: BuildPlayer) => Promise<void>;
  saveBuild: (build: Build) => Promise<void>;
  loadBuildSql: (build: string) => Promise<void>;
  resetBuild: () => Promise<void>;
  getCurrentBuild: () => Build;
  getCurrentRoster: () => Build;
  editPlayer: (player: BuildPlayer) => void;
  loadRoster: (roster: BuildPlayer[]) => Promise<void>;
  handleSorting: (sort: any) => void;
  getCurrentSorting: () => string;
  handleSelectBuild: (id: Number) => (sort: SelectOption) => void;
  getBuilds: () => String[];
  addBuild: (title: string) => void;
  deleteBuild: (title: string) => void;
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
