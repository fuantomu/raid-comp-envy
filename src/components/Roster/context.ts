import { createContext, useContext } from "react";
import { BuildPlayer } from "../../types";

type RosterContextApi = {
  updateRoster: (player: BuildPlayer, remove?: boolean) => void;
  getRoster: () => BuildPlayer[];
};

const RosterContext = createContext<RosterContextApi | null>(undefined);

export const RosterContextProvider = RosterContext.Provider;

export const useRosterContext = () => useContext(RosterContext);
