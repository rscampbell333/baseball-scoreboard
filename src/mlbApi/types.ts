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

export interface BattingStats {
  flyouts: number;
  groundOuts: number;
  airOuts: number;
  runs: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  strikeOuts: number;
  baseOnBalls: number;
  intentionalWalks: number;
  hits: number;
  hitByPitch: number;
  avg: string;
  atBats: number;
  obp: string;
  slg: string;
  ops: string;
  caughtStealing: number;
  stolenBases: number;
  stolenBasePercentage: string;
  groundIntoDoublePlay: number;
  groundIntoTriplePlay: number;
  plateAppearances: number;
  totalBases: number;
  rbi: number;
  leftOnBase: number;
  sacBunts: number;
  sacFlies: number;
  catachersInterference: number;
  pickoffs: number;
  atBatsPerHomeRun: string;
  popOuts: number;
  lineOuts: number;
}

export interface PitchingStats {
	flyOuts: number;
	groundOuts: number;
	airOuts: number;
	runs: number;
	doubles: number;
	triples: number;
	homeRuns: number;
	strikeOuts: number;
	baseOnBalls: number;
	intentionalWalks: number;
	hits: number;
	hitByPitch: number;
	atBats: number;
	obp: string;
	caughtStealing: number;
	stolenBases: number;
	stolenBasePercentage: string;
	caughtStealingPercentage: string;
	numberOfPitches: number;
	era: string;
	inningsPitched: string;
	saveOpportunities: number;
	earnedRuns: number;
	whip: string;
	battersFaced: number;
	outs: number;
	completeGames: number;
	shutouts: number;
	pitchesThrown: number;
	balls: number;
	strikes: number;
	strikePercentage: string;
	hitBatsmen: number;
	balks: number;
	wildPitches: number;
	pickoffs: number;
	groundOutsToAirouts: string;
	rbi: number;
	pitchesPerInning: string;
	runsScoredPer9: string;
	homeRunsPer9: string;
	inheritedRunners: number;
	inheritedRunnersScored: number;
	catchersInterference: number;
	sacBunts: number;
	sacFlies: number;
	passedBall: number;
	popOuts: number;
	lineOuts: number;
}

interface FieldingStats {
	caughtStealing: number;
	stolenBases: number;
	stolenBasePercentage: string;
	caughtStealingPercentage: string;
	assists: number;
	putOuts: number;
	errors: number;
	chances: number;
	passedBall: number;
	pickoffs: number;
}

export interface Person {
  id: number;
  fullName: string;
  link: string;
}

export interface Position {
  code: number;
  name: string;
  type: string;
  abbreviation: string;
}

export interface PlayerStatus {
  code: string;
  description: string;
}

export interface Player {
  person: Person;
  jerseyNumber: string;
  postion: Position;
  status: PlayerStatus;
  parentTeamId: number;
  stats: {
    batting: BattingStats | Record<string, never>;
    pitching: PitchingStats | Record<string, never>;
    fielding: FieldingStats | Record<string, never>;
  };
  seasonStats: {
    batting: BattingStats;
    pitching: PitchingStats;
    fielding: FieldingStats;
  };
  gameStatus: {
    isCurrentBatter: boolean;
    isCurrentPitcher: boolean;
    isOnBench: boolean;
    isSubstitute: boolean;
  }
}

export interface BoxScoreTeam {
  team: Team;
  teamStats: {
    batting: BattingStats;
    pitching: PitchingStats;
    fielding: FieldingStats;
  };
  players: Record<string, Player>;
  batters: Array<number>;
  pitchers: Array<number>;
  bench: Array<number>;
  bullpen: Array<number>;
  battingOrder: Array<number>;
}

export interface BoxScore {
  teams: {
    away: BoxScoreTeam;
    home: BoxScoreTeam;
  }
}

export interface PlayResult {
  type: string;
  event?: string;
  eventType?: string;
  description?: string;
  rbi: number;
  awayScore: number;
  homeScore: number;
  isOut: boolean;
}

export interface PlayAbout {
  atBatIndex: number;
  halfInning: string;
  isTopInning: boolean;
  inning: number;
  startTime: string;
  endTime: string;
  isComplete: boolean;
  isScoringPlay: boolean;
  hasReview: boolean;
  hasOut: boolean;
  captivatingIndex: number;
}

export interface Count {
  balls: number;
  strikes: number;
  outs: number;
}

export interface PlayMatchup {
  batter: Person;
  pitcher: Person;
  postOnFirst: Person;
  postOnSecond: Person;
  postOnThird: Person;
}

export interface Play {
  result: PlayResult;
  about: PlayAbout;
  count: Count;
  matchup: PlayMatchup;
  playEndTime?: string;
}

export interface Plays {
  currentPlay: Play;
  allPlays: Array<Play>;
  scoringPlays: Array<number>;
}

export interface GameData {
  teams: {
    away: Team;
    home: Team;
  };
  status: GameStatus;
}

export interface LiveData {
  linescore: LineScore;
  boxscore: BoxScore;
  plays: Plays;
}

export interface Game {
  gamePk: number;
  link: string;
  gameData: GameData;
  liveData: LiveData;
}

export interface ScheduleGame {
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
  games: ScheduleGame[];
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
