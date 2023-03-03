import { Almacen, IAlmacen } from "."

type ConceptoAlmacen = Omit<Almacen, "_id" | "creado" | "id">

export type CreateEntradaAlmacen = {
    conceptos: Almacen[]
}