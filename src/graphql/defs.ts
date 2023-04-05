const typeDefs = `#graphql

  type Basic {
    id: ID
    nombre: String
  }
  
  input BasicInput {
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

  # PRODUCTOS

  type Producto  {
    descripcion: String
    existencias: Int
    imagen: [String]
    nombre: String
    creado: String
    precio: Float
    status: Int
    id: ID
  }
  
  type ProductoLight {
    descripcion: String
    existencias: Int
    imagen: String
    nombre: String
    creado: String
    precio: Float
    status: Int
    id: ID
  }
  
  input CrearProducto {
    descripcion: String!
    imagen: [String]!
    nombre: String!
    precio: Float!
    status: Int!
  }
  
  input ActualizarProducto {
    descripcion: String!
    # existencias: Int!
    imagen: [String]!
    nombre: String!
    precio: Float!
    status: Int!
    id: ID!
  }

  input QueryProductos {
    nombre: String
    precio: Float
    status: Int
    pagina: Int
  }

  # CLIENTES

  interface ICliente {
    fecha_nacimiento: String
    telefono: String
    apellido: String
    empresa: String
    nombre: String
    creado: String
    email: String
    rfc: String
    id: ID
  }

  type ClienteFull implements ICliente {
    fecha_nacimiento: String
    telefono: String
    apellido: String
    empresa: String
    vendedor: Basic
    nombre: String
    creado: String
    email: String
    rfc: String
    id: ID
  }

  type ClienteLight implements ICliente {
    fecha_nacimiento: String
    telefono: String
    apellido: String
    empresa: String
    nombre: String
    creado: String
    email: String
    vendedor: ID
    rfc: String
    id: ID
  }
 
  input CrearCliente {
    fecha_nacimiento: String!
    telefono: String!
    apellido: String!
    empresa: String!
    nombre: String!
    email: String!
    rfc: String!
  }
  
  input ActualizarCliente {
    fecha_nacimiento: String!
    telefono: String!
    apellido: String!
    empresa: String!
    nombre: String!
    email: String!
    vendedor: ID!
    rfc: String!
    id: ID!
  }

  input QueryClientesVendedor {
    nombre: String
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

  # ORDEN VENTA

  interface IOrdenVenta {
    fecha_entrega: String
    titulo_venta: String
    creado: String
  }

  input ConceptoOrden {
    concepto_carrito: ID
    importe: Float!
    cantidad: Int!
    producto: ID!
    total: Float!
    iva: Float!
  }

  type ConceptoOrdenLight {
    importe: Float
    cantidad: Int
    total: Float
    producto: ID
    usuario: ID
    iva: Float
    id: ID
  }
  
  type OrdenVentaConcepto {
    producto: Producto
    creado: String
    importe: Float
    cantidad: Int
    total: Float
    status: Int
    iva: Float
    id: ID
  }

  input CrearOrdenVenta {
    #fecha_entrega: String!
    titulo_venta: String!
    #importe: Float!
    #creado: String!
    #vendedor: ID!
    #total: Float!
    cliente: ID!
    #status: Int!
    conceptos: [ConceptoOrden]!
  }
  
  input InputOrdenVentasQuery {
    fecha_inicio: String!
    fecha_fin: String!
    status: Int!
  }

  input ActualizarOrdenVenta {
    status: Int!
    id: ID!
  }

  type OrdenVentaLight implements IOrdenVenta {
    fecha_entrega: String
    titulo_venta: String
    creado: String
    conceptos: [ID]
    vendedor: ID
    cliente: ID
    id: ID
  }
  
  type OrdenVentaFull implements IOrdenVenta {
    conceptos: [OrdenVentaConcepto]
    fecha_entrega: String
    titulo_venta: String
    creado: String
    vendedor: Basic
    cliente: Basic
    id: ID
  }

  # ENTRADAS ALMACEN

  input InputConceptoEntrada {
    cantidad_entrada: Int
    id_producto: String
  }

  input CreateEntradaAlmacen {
    conceptos: [InputConceptoEntrada]
  }

  # CARRITO

  type Carrito {
    conceptos: [Concepto]
  }

  type Concepto {
    producto: Producto
    usuario: Basic
    importe: Float
    cantidad: Int
    total: Float
    iva: Float
    id: ID
  }

  # QUERY Y MUTATION

  type Mutation {
    
    # USUARIOS
    nuevoUsuario( input: CrearUsuario ): Usuario
    authUsuario( input: AuthUsuario ): Token

    # PRODUCTOS

    crearProducto( input: CrearProducto! ) : Producto
    actualizarProducto( input: ActualizarProducto ) : Producto
    eliminarProducto( input: String! ) : Boolean

    # CLIENTES

    actualizarCliente( input: ActualizarCliente ): ClienteLight
    crearCliente( input: CrearCliente ): ClienteLight
    eliminarCliente( input: ID! ): String

    # ORDEN VENTA
    actualizarOrdenVenta(input: ActualizarOrdenVenta): OrdenVentaLight

    # ENTRADA ALMACEN
    crearEntradaAlmacen(input:CreateEntradaAlmacen): Boolean

    # CARRITO
    agregarConceptoCarrito( input:ConceptoOrden ): ConceptoOrdenLight
    removerConceptoCarrito( input:ID! ): ConceptoOrdenLight
    crearOrdenVenta( input:CrearOrdenVenta ): OrdenVentaLight

  }

  type Query {
    
    # USUARIOS
    obtenerUsuario( input: String! ): Usuario
    
    # PRODUCTOS
    obtenerProductos(input:QueryProductos): [Producto]
    obtenerProducto( input: String! ): Producto

    # CLIENTES
    obtenerCliente( input: String! ): ClienteFull
    obtenerClientesVendedor( input:QueryClientesVendedor ): [ClienteFull]
    obtenerClientes: [ClienteFull]

    # ORDENES VENTAS
    obtenerOrdenesVentaUsuario(input: InputOrdenVentasQuery): [OrdenVentaFull]
    obtenerOrdenenPorId( input: ID! ): OrdenVentaFull

    # CARRITO
    obtenerCarrito: Carrito
    obtenerNavbarCarrito: Int

  }
  
`;

export default typeDefs