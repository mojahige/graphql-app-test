import { RESTDataSource } from 'apollo-datasource-rest';
import { BASE_URL } from './settings';
import { ResponseData } from './types';
import { Team } from '../lib/generated/resolvers';

type TeamModel = Omit<Team, '__typename'>;

export class TeamAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  async getTeams(): Promise<Array<TeamModel>> {
    const result = await this.get<ResponseData<Array<TeamModel>>>(`team`);

    return result.data;
  }

  async getTeam(id: string): Promise<TeamModel> {
    const result = await this.get<ResponseData<TeamModel>>(`team/${id}`);

    console.log(result);

    return result.data;
  }
}
