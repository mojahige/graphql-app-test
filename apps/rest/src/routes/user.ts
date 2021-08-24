import { server } from '../server';
import { DB } from '../db';
import { result } from '../response';
import type { Users, UserModel } from '../models/user';
import type { RequestBody } from '../types';

interface UserIDParam {
  id: string;
}

interface OffSetParam {
  offset?: string;
}

interface LimitParam {
  limit?: string;
}

type PaginationParam = OffSetParam & LimitParam;

type UpdateUserBody = RequestBody<Partial<Omit<UserModel, 'id'>>>;
type CreateUserBody = UpdateUserBody;

const convertNumber = (value: unknown) => {
  const convertedValue = Number(value);

  return isNaN(convertedValue) ? 0 : convertedValue;
};

export async function user(): Promise<void> {
  server.get<{
    Querystring: PaginationParam;
  }>('/user', async (request, reply) => {
    const { offset, limit } = request.query;
    const allUserData = DB.getData('/user') as Users;
    const offsetNumber = convertNumber(offset);
    const limitNumber = convertNumber(limit) || DB.getCount('/user');

    reply.code(200).send(
      result({
        data: allUserData.slice(offsetNumber, limitNumber),
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

  server.post<{
    Body: CreateUserBody;
  }>('/user', (request, reply) => {
    const { data } = request.body;
    const dbCount = DB.getCount('/user');
    const setData = DB.setData({
      path: `/user[${dbCount}]`,
      value: { ...{ id: `${dbCount + 1}`, teamId: null }, ...data },
    });

    reply.code(200).send(
      result({
        data: setData,
      })
    );
  });

  server.delete<{
    Params: UserIDParam;
  }>('/user/:id', (request, reply) => {
    const { id } = request.params;
    const userDataIndex = DB.getIndex({
      path: '/user',
      value: Number(id),
    });

    DB.delete(`/user[${userDataIndex}]`);

    reply.code(200).send(result({}));
  });
}
