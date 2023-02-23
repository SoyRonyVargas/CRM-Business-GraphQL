import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import conectarBaseDeDatos from './config/db'
import typeDefs from './graphql/defs'
import resolvers from './resolvers'
import dotenv from 'dotenv'

// VARIABLES DE ENTORNO

dotenv.config()

const main = async () => {
    
    // BASE DE DATOS

    await conectarBaseDeDatos()

    // Servidor 
    const server = new ApolloServer({
        resolvers,
        typeDefs,
    });

    const r = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })
    
    console.log(`🚀 Server ready at: ${r.url}`)

}

main()