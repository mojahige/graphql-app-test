import { Resolvers, QueryResolvers } from './lib/generated/resolvers';
import { UserAPI } from './dataSources/user';

interface ContextType {
  dataSources: {
    userAPI: UserAPI;
  };
}

const Query: QueryResolvers<ContextType> = {
  users(_parent, _args, { dataSources }, _info) {
    return dataSources.userAPI.getUsers();
  },
  user(_parent, { id }, { dataSources }, _info) {
    return dataSources.userAPI.getUser(id);
  },
};

export const resolvers: Resolvers = {
  Query,
};
