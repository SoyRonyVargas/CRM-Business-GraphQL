import 'module-alias/register'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import conectarBaseDeDatos from './config/db'
import ActualizarModelos from './updates'
import typeDefs from './graphql/defs'
import resolvers from './resolvers'
import { ContextApp } from 'types'
import ContextFn from './context'
import dotenv from 'dotenv'


// VARIABLES DE ENTORNO

dotenv.config()

const main = async () => {
    
    // BASE DE DATOS

    await conectarBaseDeDatos()

    await ActualizarModelos()

    // Servidor 
    const server = new ApolloServer<ContextApp>({
        resolvers,
        typeDefs,
    });

    const r = await startStandaloneServer( server, {
        listen: { port: 4000 },
        context: ContextFn
    })
    
    console.log(`🚀 Server ready at: ${r.url}`)


}

main()