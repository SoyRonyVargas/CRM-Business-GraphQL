import mongoose, { Schema } from "mongoose";
import { Producto } from "../../producto";

export interface IOrdenVentaConcepto extends Document {
    producto: Producto
    cantidad: number
    importe: number
    total: number
    iva: number
    status:  1 | 2 | 3
}

export const OrdenVentaConceptoSchema = new mongoose.Schema({
    concepto_carrito: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ConceptoCarrito"
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
