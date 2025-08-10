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

export interface LineScorePlayer {
  id: number;
  fullName: string;
  link: string;
}

export interface LineScoreTeam {
  pitcher?: LineScorePlayer;
  catcher?: LineScorePlayer;
  first?: LineScorePlayer;
  second?: LineScorePlayer;
  third?: LineScorePlayer;
  shortstop?: LineScorePlayer;
  left?: LineScorePlayer;
  center?: LineScorePlayer;
  right?: LineScorePlayer;
  batter?: LineScorePlayer;
  onDeck?: LineScorePlayer;
  inHole?: LineScorePlayer
  battingOrder: number;
  team: {
    id: number;
    name: string;
    link: string;
  }
}

export interface Totals {
  runs: number;
  hits: number;
  errors: number;
  leftOnBase: number;
}

export interface Inning {
  num: number;
  ordinalnum: string;
  home: Totals;
  away: Totals;
  teams: {
    home: Totals;
    away: Totals;
  },
  defense: LineScoreTeam;
  offense: LineScoreTeam;
}

export interface LineScore {
  currentInning?: number;
  currentInningOrdinal: string;
  inningState: string;
  inningHalf: "Top" | "Bottom";
  isTopInning: boolean;
  scheduledInning: number;
  innings: Array<Inning>;
  balls: number;
  strikes: number;
  outs: number;
  teams: {
    home: Totals;
    away: Totals;
  } 
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
  linescore?: LineScore;
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

export interface Cut {
  aspectRatio: string;
  width: string;
  height: string;
  type: string;
  src: string;
  at2x: string;
  at3x: string;
}

export interface Image {
  title: string;
  altText: string;
  cuts: Record<string, Cut>;
}

export interface DeviceProperty {
  type: string;
  id: string;
  timestamp: string;
  binaryFile: string;
  url: string;
  title?: string;
  image?: Image;
}

export interface Container {
  height?: string;
  width?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface Palette {
  pageContainerBackgroundColor: string;
  pageContainerBorderColor: string;
  headerMastheadBackgroundColor: string;
  headerMastheadTextColor: string;
  headerNavigationBackgroundColor: string;
  headerNavigationBorderColor: string;
  headerNavigationTextColorHover: string;
  headerNavigationTextColor: string;
  footerTitleColor: string;
  footerTextColor: string;
  footerBackgroundColor: string;
  footerBorderColor: string;
  footerLinkColor: string;
  footerLinkColorHover: string;
  footerLinkColorActive: string;
  buttonPrimaryBackgroundColor: string;
  buttonPrimaryBackgroundColorHover: string;
  buttonPrimaryTextColor: string;
  buttonPrimaryTextColorHover: string;
  buttonSpotlightBackgroundColor: string;
  buttonSpotlightBackgroundColorHover: string;
  buttonSpotlightTextColor: string;
  buttonSpotlightTextColorHover: string;
  tableHeaderBackgroundColor: string;
  tableRowBackgroundColor: string;
  tableTextColor: string;
  organismSectionTitleColor: string;
  organismTitleColor: string;
  organismTextColor: string;
  organismTagBackgroundColor: string;
  organismTagTextColor: string;
  organismBackgroundColor: string;
  organismBorderColor: string;
  organismLinkColor: string;
  organismLinkColorHover: string;
  organismLinkTextDecoration: string,
  organismLinkColorActive: string;
  organismScrimTitleColor: string;
  organismScrimTextColor: string;
  organismScrimTagColor: string;
  organismScrimBackgroundColor: string;
  organismScrimBackgroundColorHover: string;
  organismScrimBorderColor: string;
  organismScrimLinkColor: string;
  organismScrimLinkColorHover: string;
  organismContentHeadingSecondaryBorderColor: string;
  organismContentHeadingPrimaryBorderColor: string;
  organismSidekickBackgroundColor: string;
  organismJumbotronTitleColor: string
}

export interface Style {
  organismLogoVersion: string;
  organismLogoStyle: string;
  headerMastheadLogoVersion: string;
  headerMastheadLogoStyle: string;
  headerMastheadLogoContainer: Container;
  headerMastheadTaglineContainer: Container;
  footerLogoVersion: string;
  footLogoStyle: string;
  headlineTextTrasform: string;
  headlineFontFamily: string;
  headlineFontFamilySizeMultiplier: number;
  bodyBackgroundColor: string;
  palette: string;
  basePalette: Palette;
  darkPalette: Palette;
}

export interface DeviceProperties {
  urlLogo: DeviceProperty;
  headerPrimaryLogo: DeviceProperty;
  favicon: DeviceProperty;
  headerMastheadTagline: DeviceProperty;
  navigationMastheadSponsorImage: DeviceProperty;
  bodyBackgroundSkinWiredURL: string;
  bodyBackgroundSkinTotal: number;
  bodyBackgroundSkin1: DeviceProperty;
  organismHeadlineFont: DeviceProperty;


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
  deviceProperties?: DeviceProperties;
};
