const typeDefs = `#graphql

  type Usuario {
    id: ID
    nombre: String
    apellidos: String
    email: String
    creado: String
  }

  type Producto {
    descripcion: String
    existencias: Int
    imagen: String
    nombre: String
    creado: String
    precio: Float
    marca: String
  }

  type Book {
    title: String
    author: String
  }
  
  type Token {
    token: String
  }

  input AuthUsuario {
    password: String
    email: String
  }

  input BookInput {
    name: String
  }

  input CrearUsuario {
    nombre: String
    apellidos: String
    email: String
    password: String
  }

  type Mutation {
    
    # USUARIOS
    nuevoUsuario( input: CrearUsuario ): Usuario
    authUsuario( input: AuthUsuario ): Token

    # PRODUCTOS

    crearProducto( input  )

  }

  type Query {
    books: [Book]
    obtenerUsuario( input : String! ): Usuario
  }
  
`;

export default typeDefs