require('dotenv').config();
import express from 'express';

import helmet from 'helmet';
import cors from 'cors';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/index';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {notFound, errorHandler} from './middlewares';
import {shield} from 'graphql-shield';
import {createRateLimitRule} from 'graphql-rate-limit';
import {applyMiddleware} from 'graphql-middleware';
import {makeExecutableSchema} from '@graphql-tools/schema';
import authenticate from './functions/authenticate';

const app = express();

(async () => {
  try {
    const rateLimitRule = createRateLimitRule({
      identifyContext: (ctx) => ctx.id,
    });

    const permissions = shield({
      Mutation: {
        loginUser: rateLimitRule({window: '1s', max: 5}),
      },
    });

    const schema = applyMiddleware(
      makeExecutableSchema({
        typeDefs,
        resolvers,
      }),
      permissions
    );
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      })
    );
    const server = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        process.env.ENVIRONMENT === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              graphRef: 'my-graph-id@my-graph-variant',
              footer: false,
              embed: true as false,
            })
          : ApolloServerPluginLandingPageLocalDefault({footer: false}),
      ],
      includeStacktraceInErrorResponses: false,
    });
    await server.start();
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      accessControlAllowOrigin: '*',
      accessControlAllowCredentials: true,
    };
    app.use(cors(corsOptions));
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(server, {
        context: async ({req}) => authenticate(req),
      })
    );

    // app.use('/api/v1', api);
    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.log(error);
  }
})();

export default app;
