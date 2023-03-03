import { IOrdenVentaConcepto } from "./concepto"
import { OrdenVenta, IOrdenVenta } from "."

export type CrearOrdenVenta = Pick<
    OrdenVenta, 
    "titulo_venta" | "vendedor" | "cliente" | "fecha_entrega" | "subtotal" | "total" | "status"
> & 
{
    conceptos: IOrdenVentaConcepto[]
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
