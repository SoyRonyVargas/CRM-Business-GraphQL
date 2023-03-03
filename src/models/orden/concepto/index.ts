import { Producto } from "../../producto";
import mongoose, { Schema } from "mongoose";

export interface IOrdenVentaConcepto extends Document {
    producto: Producto
    cantidad: number
    importe: number
    status:  1 | 2 | 3
}

export const OrdenVentaConceptoSchema = new mongoose.Schema({
    // id_orden_venta: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Producto"
    // },
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
