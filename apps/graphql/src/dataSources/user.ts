import { RESTDataSource } from 'apollo-datasource-rest';
import { BASE_URL } from './settings';
import { User, QueryUsersArgs } from '../lib/generated/resolvers';

type UserModel = Omit<User, '__typename'>;

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  async getUsers({ offset, limit }: QueryUsersArgs): Promise<Array<UserModel>> {
    const result = await this.get('/user', {
      ...(offset != null ? { offset } : {}),
      ...(limit != null ? { limit } : {}),
    });

    return result.data;
  }

  async getUser(id: string): Promise<User> {
    const result = await this.get(`user/${id}`);

    return result.data;
  }
}
