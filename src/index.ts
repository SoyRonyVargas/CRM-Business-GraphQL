import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

import 'module-alias/register'
import { ApolloServer } from '@apollo/server'
import conectarBaseDeDatos from './config/db'
import ActualizarModelos from './updates'
import typeDefs from './graphql/defs'
import resolvers from './resolvers'
import { json } from 'body-parser'
import { ContextApp } from 'types'
import ContextFn from './context'
import dotenv from 'dotenv'
import express from 'express'
import { join } from 'path'
import http from 'http'
import cors from 'cors'

// VARIABLES DE ENTORNO

dotenv.config()

const main = async () => {
    
    // BASE DE DATOS

    const app = express();

    app.use('/uploads', express.static(join(__dirname, 'public/uploads'))) 

    app.use(
        cors<cors.CorsRequest>({
            methods: ['GET', 'POST', 'OPTIONS'],
            origin: ['http://localhost:3000'],
            credentials: false
        })
    )
    
    const httpServer = http.createServer(app);

    await conectarBaseDeDatos()

    await ActualizarModelos()

    // Servidor 
    const server = new ApolloServer<ContextApp>({
        resolvers,
        typeDefs,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                graphRef: 'my-graph-id@my-graph-variant',
                footer: false,
              })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ]
    });
    
    await server.start()
   
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(
        '/graphql',
        json(),
        expressMiddleware(server, {
          context: ContextFn
        }),
      );


    app.use( require('./routes/index') )

    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    
}

main()