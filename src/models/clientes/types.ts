import { Cliente } from "."

export type CrearCliente = Omit<Cliente, "vendedor">

// export type ActualizarProducto = Omit<Producto, "__v" | "_id">