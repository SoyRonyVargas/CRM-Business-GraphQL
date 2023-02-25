import { Producto } from "."

export type CrearProducto = Pick<Producto, "nombre" | "imagen" | "existencias" | "precio" | "descripcion">