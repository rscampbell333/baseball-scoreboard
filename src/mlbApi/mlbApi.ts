import axios from "axios";
import { type Game, type Schedule, type Team } from "./types";

const SPORT_ID_MLB = 1;

const baseURL = 'https://statsapi.mlb.com/api';
const axiosInstance = axios.create({ baseURL })
const endpoints = {
  teams: '/v1/teams',
  schedule: '/v1/schedule',
  game: 'v1.1/game/',
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
  startDate?: string,
  endDate?: string,
  hydrate?: string[]
} = {}) => {
  const params = {
    sportId: SPORT_ID_MLB,
    startDate,
    endDate,
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

export const getGameById = async (gamePk: string, hydrate?: string[]) => {
  const params = {
    hydrate: hydrate?.join(','),
  };

  const response = await axiosInstance.get<Game>(`${endpoints.game}/${gamePk}/feed/live`, { params });
  return response.data;
}