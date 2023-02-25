import { Producto } from "."

export type CrearProducto = Pick<Producto, "nombre" | "imagen" | "existencias" | "precio" | "descripcion">

export type ActualizarProducto = Omit<Producto, "__v" | "_id">