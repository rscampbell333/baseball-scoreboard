import axios from "axios";
import { type Game, type Schedule, type Team, type Standings } from "./types";

const SPORT_ID_MLB = 1;
const LEAGUE_ID_AL = '103';
const LEAGUE_ID_NL = '104';

const baseURL = 'https://statsapi.mlb.com/api';
const axiosInstance = axios.create({ baseURL })
const endpoints = {
  teams: '/v1/teams',
  schedule: '/v1/schedule',
  game: '/v1.1/game',
  standings: '/v1/standings',
};

export const getTeams = async (hydrate?: string[]) => {
  const response = await axiosInstance.get<{teams: Team[]}>(endpoints.teams, {
    params: {
      sportId: SPORT_ID_MLB,
      hydrate: hydrate?.join(','),
    },
  });
  return response.data.teams;
}

export const getSchedule = async ({
  startDate,
  endDate,
  hydrate,
}: {
  startDate?: Date,
  endDate?: Date,
  hydrate?: string[]
} = {}) => {
  const params = {
    sportId: SPORT_ID_MLB,
    startDate: startDate?.toLocaleDateString(),
    endDate: endDate?.toLocaleDateString(),
    hydrate: hydrate?.join(','),
  };

  const response = await axiosInstance.get<Schedule>(endpoints.schedule, { params });
  return response.data;
}

export const getTeamById = async (id: number, hydrate?: string[]) => {
  const response = await axiosInstance.get<{teams: Team[]}>(`${endpoints.teams}/${id}`, { params: { hydrate: hydrate?.join(',') } });
  return response.data.teams[0];
}

export const getPreviousSchedule = async (id: number) => {
  const team = await getTeamById(id, ['previousSchedule']);
  return team.previousGameSchedule;
}

export const getGameById = async (gamePk: string, hydrate?: string[], timecode?: string) => {
  const params = {
    hydrate: hydrate?.join(','),
    timecode,
  };

  const response = await axiosInstance.get<Game>(`${endpoints.game}/${gamePk}/feed/live`, { params });
  return response.data;
}

export const getStandings = async (leagueId: string, season?: string) => {
  const params = {
    leagueId,
    season,
    hydrate: 'division',
  };

  const response = await axiosInstance.get<Standings>(`${endpoints.standings}`, { params });
  return response.data;
}

export const getALStandings = async (season?: string) => getStandings(LEAGUE_ID_AL, season);
export const getNLStandings = async (season?: string) => getStandings(LEAGUE_ID_NL, season);
