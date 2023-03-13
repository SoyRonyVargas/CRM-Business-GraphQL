import { Producto } from "."

export type CrearProducto = Pick<Producto, "nombre" | "imagen" | "existencias" | "precio" | "descripcion">

export type ActualizarProducto = Omit<Producto, "__v" | "_id">

export type QueryProductos ={
    nombre: string
    precio: number
    status: number
    pagina: number
}