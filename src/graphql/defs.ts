const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }
  
  input BookInput {
    name: String
  }

  type Query {
    books: [Book]
    obtenerLibro( input : BookInput ): [Book]
  }
  
`;

export default typeDefs