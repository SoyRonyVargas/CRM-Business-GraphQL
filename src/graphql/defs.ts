const typeDefs = `#graphql

  type Basic {
    id: ID
    nombre: String
  }

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

  # CLIENTES

  interface ICliente {
    telefono: String
    apellido: String
    empresa: String
    nombre: String
    creado: String
    email: String
    edad: Int
    id: ID
  }

  type ClienteFull implements ICliente {
    telefono: String
    apellido: String
    empresa: String
    vendedor: Basic
    nombre: String
    creado: String
    email: String
    edad: Int
    id: ID
  }

  type ClienteLight implements ICliente {
    telefono: String
    apellido: String
    empresa: String
    nombre: String
    creado: String
    email: String
    vendedor: ID
    edad: Int
    id: ID
  }
 
  input CrearCliente {
    telefono: String!
    apellido: String!
    empresa: String!
    nombre: String!
    email: String!
    edad: Int!
  }
  
  input ActualizarCliente {
    telefono: String!
    apellido: String!
    empresa: String!
    nombre: String!
    email: String!
    vendedor: ID!
    edad: Int!
    id: ID!
  }

  # AUTENTICACION

  type Token {
    token: String
  }

  input AuthUsuario {
    password: String
    email: String
  }

  input CrearUsuario {
    nombre: String
    apellidos: String
    email: String
    password: String
  }

  # QUERY Y MUTATION

  type Mutation {
    
    # USUARIOS
    nuevoUsuario( input: CrearUsuario ): Usuario
    authUsuario( input: AuthUsuario ): Token

    # PRODUCTOS

    crearProducto( input: CrearProducto ) : Producto
    actualizarProducto( input: ActualizarProducto ) : Producto
    eliminarProducto( input: String! ) : Boolean

    # CLIENTES

    actualizarCliente( input: ActualizarCliente ): ClienteLight
    crearCliente( input: CrearCliente ): ClienteLight
    eliminarCliente( input: ID! ): Boolean

  }

  type Query {
    
    # USUARIOS
    obtenerUsuario( input : String! ): Usuario
    
    # PRODUCTOS
    obtenerProductos: [Producto]
    obtenerProducto( input: String! ): Producto

    # CLIENTES
    obtenerCliente( input: String! ): ClienteFull
    obtenerClientesVendedor: [ClienteFull]
    obtenerClientes: [ClienteFull]

  }
  
`;

export default typeDefs