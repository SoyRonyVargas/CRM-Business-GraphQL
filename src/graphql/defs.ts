const typeDefs = `#graphql

  type Usuario {
    id: ID
    nombre: String
    apellidos: String
    email: String
    creado: String
  }

  type Producto  {
    descripcion: String
    existencias: Int
    imagen: String
    nombre: String
    creado: String
    precio: Float
    id: ID
  }

  input CrearProducto {
    descripcion: String!
    existencias: Int!
    imagen: String!
    nombre: String!
    precio: Float!
  }
  
  input ActualizarProducto {
    id: ID!
    descripcion: String!
    existencias: Int!
    imagen: String!
    nombre: String!
    precio: Float!
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

    crearProducto( input: CrearProducto ) : Producto
    actualizarProducto( input: ActualizarProducto ) : Producto
    eliminarProducto( input: String! ) : Boolean

  }

  type Query {
    
    # USUARIOS
    obtenerUsuario( input : String! ): Usuario
    
    # PRODUCTOS
    obtenerProductos: [Producto]
    obtenerProducto( input: String! ): Producto

  }
  
`;

export default typeDefs