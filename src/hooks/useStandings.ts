import { useEffect, useState } from "react";
import { type Standings } from "../mlbApi/types";
import { getALStandings, getNLStandings } from "../mlbApi/mlbApi";

export const useStandings = () => {
  const [alStandings, setALStandings] = useState<Standings | undefined>();
  const [nlStandings, setNLStandings] = useState<Standings | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    Promise.all([getALStandings(), getNLStandings()])
      .then(([newALStandings, newNLStandings]) => {
        setALStandings(newALStandings);
        setNLStandings(newNLStandings);
      })
      .catch((e: Error) => {
        setError(e.message);
      });
  }, []);

  return { alStandings, nlStandings, error };
};
