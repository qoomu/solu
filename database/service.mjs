import net from 'node:net';
import { PGlite } from '@electric-sql/pglite';
import { fromNodeSocket } from 'pg-gateway/node';

export default async function(models) {

  const postgresDb = new PGlite();
  await postgresDb.waitReady;
  const dbMap = {};
  for (let key in models.env) {
    const module = models.env[key];
    await postgresDb.exec('create database ' + module._table_name);
    dbMap[module._table_name] = module._db_worker.pglite;
  }

  const server = net.createServer(async (socket) => {
    let activeDb = postgresDb;

    console.info(`PSQL Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
    await fromNodeSocket(socket, {
      serverVersion: process.env.PG_GATEWAY_VERSION || '16.3',

      auth: {
        // No password required
        method: 'trust',
      },

      async onStartup({ clientParams }) {
        // create a temp in-memory instance if connecting to the prisma shadow DB
        if (clientParams.database === 'postgres') {
          activeDb = postgresDb;
        }
        else {
          activeDb = (clientParams.database in dbMap) ? dbMap[clientParams.database] : postgresDb; //Handle error when database doesn't exist
        }

        // Wait for PGlite to be ready before further processing
        await activeDb.waitReady;
      },

      // Hook into each client message
      async onMessage(data, { isAuthenticated }) {
        // Only forward messages to PGlite after authentication
        if (!isAuthenticated) {
          return;
        }

        // Forward raw message to PGlite and send response to client
        const buffer = await activeDb.execProtocolRaw(data);
        return buffer;
      },
    })

    socket.on('end', () => {
      console.info('PSQL Client disconnected');
    })
  })

  server.listen(parseInt(process.env.PG_GATEWAY_PORT), () => {
    console.info('PSQL Server listening on port ' + process.env.PG_GATEWAY_PORT);
  });

}