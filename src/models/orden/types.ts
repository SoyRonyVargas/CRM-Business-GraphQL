import { OrdenVentaConcepto } from "./concepto"
import {  OrdenVenta } from "."

export type CrearOrdenVenta = Pick<
    OrdenVenta, 
    "titulo_venta" | "vendedor" | "cliente" | "fecha_entrega" | "subtotal" | "total" | "status"
> & 
{
    conceptos: OrdenVentaConcepto[]
}
