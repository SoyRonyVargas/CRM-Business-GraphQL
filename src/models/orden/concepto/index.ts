import mongoose, { Schema } from "mongoose";
import { Producto } from "../../producto";

export interface IOrdenVentaConcepto extends Document {
    orden_venta: string
    producto: Producto
    cantidad: number
    importe: number
    status:  number
    total: number
    iva: number
}

export const OrdenVentaConceptoSchema = new mongoose.Schema({
    concepto_carrito: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ConceptoCarrito"
    },
    orden_venta: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "OrdenVenta"
    },
    producto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Producto"
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true
    },
    importe: {
        type: Number,
        required: true,
        trim: true,
    },
    iva: {
        type: Number,
        required: true,
        trim: true,
    },
    total: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: Number,
        required: true,
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const OrdenVentaConceptoModel = mongoose.model<IOrdenVentaConcepto>('OrdenVentaConcepto', OrdenVentaConceptoSchema);

export type OrdenVentaConcepto = typeof OrdenVentaConceptoModel.schema.obj
