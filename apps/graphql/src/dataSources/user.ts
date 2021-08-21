import { RESTDataSource } from 'apollo-datasource-rest';
import { BASE_URL } from './settings';
import { ResponseData } from './types';
import { User } from '../lib/generated/resolvers';

type UserModel = Omit<User, '__typename'>;

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  async getUsers(): Promise<Array<UserModel>> {
    const result = await this.get<ResponseData<Array<UserModel>>>(`user`);

    return result.data;
  }

  async getUser(id: string): Promise<User> {
    const result = await this.get<ResponseData<UserModel>>(`user/${id}`);

    return result.data;
  }
}
