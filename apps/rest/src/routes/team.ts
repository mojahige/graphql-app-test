import { DB } from '../db';
import { server } from '../server';
import { result } from '../response';
// import type { Teams, TeamModel } from '../models/team';

interface TeamIDParam {
  id: string;
}

export async function team(): Promise<void> {
  server.get('/team', async (_, reply) => {
    const dbData = DB.getData('/team');

    reply.send(result({ data: dbData }));
  });

  server.get<{
    Params: TeamIDParam;
  }>('/team/:id', async (request, reply) => {
    const { id } = request.params;
    const index = DB.getIndex({
      path: '/team',
      value: Number(id),
    });
    const dbData = DB.getData(`/team[${index}]`);

    reply.send(result({ data: dbData }));
  });
}
