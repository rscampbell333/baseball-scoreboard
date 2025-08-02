export interface GameStatus {
  abstractGameState: string;
  codedGameState: string;
  detailedState: string;
  statusCode: string;
  startTimeTBD: boolean;
  abstractGameCode: string;
}

export interface GameTeam {
  leagueRecord: {
      wins: number;
      losses: number;
      pct: string;
  },
  score: number,
  team: {
      id: number,
      name: string,
      link: string
  },
  isWinner: boolean,
  splitSquad: boolean,
  seriesNumber: number
}

export interface Venue {
  id: number;
  name: string;
  link: string;
}

export interface Game {
  gamePk: number;
  gameGuid: string;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  officialDate: string;
  status: GameStatus;
  teams: {
    away: GameTeam;
    home: GameTeam;
  };
  venue: string;
  content: {
    link: string;
  };
  isTie: boolean;
  gameNumber: number;
  publicFacing: boolean;
  doubleHeader: string;
  gamedayType: string;
  tiebreaker: string;
  calendarEventID: string;
  seasonDisplay: string;
  dayNight: string;
  scheduledInnings: number;
  reverseHomeAwayStatus: boolean;
  inningBreakLength: number;
  gamesInSeries: number;
  seriesGameNumber: number;
  seriesDescription: string;
  recordSource: string;
  ifNecessary: string;
  ifNecessaryDescription: string;
}

export interface Date {
  date: string;
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgres: number;
  games: Game[];
};

export interface Schedule {
  totalItems: number;
  totalEvents: number;
  totalGames: number;
  totalGamesInProgress: number;
  dates: Date[];
}

export interface Team {
  springLeague: {
    id: number;
    name: string;
    link: string;
    abbreviation: string;
  };
  allStarStatus: string;
  id: number;
  name: string;
  link: string;
  season: number;
  venue: {
    id: number;
    name: string;
    link: string;
  };
  springVenue: {
    id: number;
    link: string;
  };
  teamCode: string;
  fileCode: string;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
  division: {
    id: number;
    name: string;
    link: string;
  };
  sport: {
    id: number;
    link: string;
    name: string;
  };
  shortName: string;
  franchiseName: string;
  clubName: string;
  active: boolean;
  previousGameSchedule?: Schedule;
  nextGameSchedule?: Schedule;
};
