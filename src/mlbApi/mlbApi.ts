import axios from "axios";
import { type Schedule, type Team } from "./types";

const SPORT_ID_MLB = 1;

const baseURL = 'https://statsapi.mlb.com/api/v1';
const axiosInstance = axios.create({ baseURL })
const endpoints = {
  teams: '/teams',
  schedule: '/schedule'
};

export const getTeams = async () => {
  const response = await axiosInstance.get<{teams: Team[]}>(endpoints.teams, {
    params: {
      sportId: SPORT_ID_MLB
    }
  });
  return response.data.teams;
}

export const getSchedule = async (p?: { startDate?: string, endDate?: string }) => {
  const params = {
    sportId: SPORT_ID_MLB,
    ...p,
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