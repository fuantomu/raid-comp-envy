import { createContext, useContext } from "react";
import { Build, BuildPlayer } from "../../types";

type AppContextApi = {
  importBuild: (players: BuildPlayer[]) => Promise<void>;
  saveBuild: (build: Build) => Promise<void>;
  resetBuild: () => Promise<void>;
  getCurrentBuild: () => Build;
  editPlayer: (player: BuildPlayer) => void;
};

const AppContext = createContext<AppContextApi | null>(null);

export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => useContext(AppContext);
