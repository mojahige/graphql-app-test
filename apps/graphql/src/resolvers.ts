import {
  Resolvers,
  QueryResolvers,
  UserResolvers,
} from './lib/generated/resolvers';
import { UserAPI } from './dataSources/user';
import { TeamAPI } from './dataSources/team';

interface ContextType {
  dataSources: {
    userAPI: UserAPI;
    teamAPI: TeamAPI;
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

const User: UserResolvers<ContextType> = {
  team({ teamId }, _args, { dataSources }, _info) {
    return teamId ? dataSources.teamAPI.getTeam(teamId) : null;
  },
};

export const resolvers: Resolvers = {
  Query,
  User,
};
