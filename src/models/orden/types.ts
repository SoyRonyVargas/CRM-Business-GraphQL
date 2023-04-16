import { OrdenVenta, IOrdenVenta } from "."

export type CrearOrdenVenta = Pick<
    OrdenVenta, 
    "titulo_venta" | "vendedor" | "cliente" | "fecha_entrega" | "importe" | "total" | "status"> & 
{
    conceptos: ConceptoVenta[]
}

export type InputActualizarStatus = {
    id_concepto: string
    id_orden: string
    status: number
}

export type ConceptoVenta = {
    concepto_carrito: string
    producto: string
    cantidad: number
    importe: number
    total: number
}

export type InputOrdenVentasQuery = Pick<
    OrdenVenta,
    "status"
> &
{
    fecha_inicio: string
    fecha_fin: string
}
 

export type ActualizarOrdenVenta = Pick<
    IOrdenVenta,
    "id" | "status"
>
