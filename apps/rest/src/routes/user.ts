import { server } from '../server';
import { DB } from '../db';
import { result } from '../response';
import type { Users, UserModel } from '../models/user';
import type { RequestBody } from '../types';

interface UserIDParam {
  id: string;
}

type UpdateUserBody = RequestBody<Partial<Omit<UserModel, 'id'>>>;

export async function user(): Promise<void> {
  server.get('/user', async (_, reply) => {
    const allUserData = DB.getData('/user') as Users;

    reply.code(200).send(
      result({
        data: allUserData,
      })
    );
  });

  server.get<{
    Params: UserIDParam;
  }>('/user/:id', (request, reply) => {
    const { id } = request.params;
    const allUserData = DB.getData('/user') as Users;

    reply.code(200).send(
      result({
        data: allUserData.find((user) => user.id === Number(id)) ?? {},
      })
    );
  });

  server.patch<{
    Params: UserIDParam;
    Body: UpdateUserBody;
  }>('/user/:id', (request, reply) => {
    const { id } = request.params;
    const { data } = request.body;
    const userDataIndex = DB.getIndex({
      path: '/user',
      value: Number(id),
    });
    const userData = DB.getData<UserModel>(`/user[${userDataIndex}]`);
    const updatedData = DB.setData({
      path: `/user[${userDataIndex}]`,
      value: { ...userData, ...data },
    });

    reply.code(200).send(
      result({
        data: updatedData,
      })
    );
  });
}
