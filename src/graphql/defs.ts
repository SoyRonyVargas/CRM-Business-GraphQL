const typeDefs = `#graphql

  type Usuario {
    id: ID
    nombre: String
    apellido: String
    email: String
    creado: String
  }

  type Book {
    title: String
    author: String
  }
  
  input BookInput {
    name: String
  }

  input CrearUsuario {
    nombre: String
    apellido: String
    email: String
    password: String
  }

  type Mutation {
    nuevoUsuario( input: CrearUsuario ): Usuario
  }

  type Query {
    books: [Book]
    obtenerLibro( input : BookInput ): [Book]
  }
  
`;

export default typeDefs