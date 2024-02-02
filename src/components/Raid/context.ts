import { createContext, useContext } from "react";
import { BuildPlayer } from "../../types";

type RaidContextApi = {
  importPlayer: (newPlayer: BuildPlayer, ignoreErrors?: boolean, oldRaid?: number) => void;
  removePlayerFromRaids: (newPlayer: BuildPlayer, save?: boolean, send?: boolean) => void;
  removePlayerFromRaid: (
    newPlayer: BuildPlayer,
    save?: boolean,
    send?: boolean,
    oldRaid?: number
  ) => void;
};

const RaidContext = createContext<RaidContextApi | null>(undefined);

export const RaidContextProvider = RaidContext.Provider;

export const useRaidContext = () => useContext(RaidContext);
