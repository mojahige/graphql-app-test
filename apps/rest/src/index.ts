import 'make-promises-safe';
import { server } from './server';
import { user } from './routes/user';
import { team } from './routes/team';

server.register(user);
server.register(team);

server.get('/', async (_request, _reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
