import { createContext, useContext } from "react";
import { Build, BuildPlayer } from "../../types";

type AppContextApi = {
  importBuild: (players: BuildPlayer[]) => Promise<void>;
  addToRoster: (player: BuildPlayer) => Promise<void>;
  removeFromRoster: (player: BuildPlayer) => Promise<void>;
  saveBuild: (build: Build) => Promise<void>;
  loadBuildSql: (build: string) => Promise<void>;
  resetBuild: () => Promise<void>;
  getCurrentBuild: () => Build;
  editPlayer: (player: BuildPlayer) => void;
  loadRoster: (roster: BuildPlayer[]) => Promise<void>;
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
