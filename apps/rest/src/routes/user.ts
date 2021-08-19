import { server } from '../server';
import { db } from '../db';
import type { Users, UserModel } from '../models/user';

type UserIDParam = Pick<UserModel, 'id'>

export async function user(): Promise<void> {
  server.get('/user', async (_, reply) => {
    const allUserData = db.getData('/user') as Users

    reply.send(allUserData);
  });

  server.get<{
    Params: UserIDParam
  }>('/user/:id', (request, reply) => {
    const { id } = request.params;
    const allUserData = db.getData('/user') as Users

    reply.send(
      allUserData.find((user) => user.id === Number(id)) ?? {}
    )
  })
}
