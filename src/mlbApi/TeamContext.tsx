import React, { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Team } from "./types";

interface TeamContext {
  teams: Team[];
}

interface TeamProviderProps extends PropsWithChildren {
  teams: Team[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const TeamContext = createContext<TeamContext | null>(null);

export const TeamProvider: React.FC<TeamProviderProps> = ({ children, teams: initialTeams }) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  useEffect(() => {
    setTeams(initialTeams);
  }, [initialTeams]);

  return <TeamContext.Provider value={{ teams }}>
    {children}
  </TeamContext.Provider>
}



