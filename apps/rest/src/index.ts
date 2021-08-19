import 'make-promises-safe';
import { server } from './server';
import { user } from './routes/user';

server.register(user);

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
