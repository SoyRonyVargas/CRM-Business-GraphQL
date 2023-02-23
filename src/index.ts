import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import typeDefs from './graphql/defs'
import resolvers from './resolvers'

// Servidor 
const server = new ApolloServer({
    resolvers,
    typeDefs,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
})
.then( r => {
    
    console.log(`🚀 Server ready at: ${r.url}`)

})
