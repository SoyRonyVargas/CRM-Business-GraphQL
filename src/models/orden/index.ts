// import { populateFields } from "../../utils/populateFields";
import mongoose, { Schema , Document } from "mongoose";

export interface IOrdenVenta extends Document {
    
    // REFERENCIAS
    conceptos: Array<string>
    vendedor: string
    cliente: string

    fecha_entrega: string
    titulo_venta: string
    importe: number
    creado: string
    status: number
    total: number
}

const OrdenVentaSchema = new mongoose.Schema({
    vendedor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    cliente: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Cliente"
    },
    titulo_venta: {
        type: String,
        required: true,
        trim: true
    },
    fecha_entrega: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Number,
        required: true,
    },
    conceptos: [
        { 
            type: Schema.Types.ObjectId, ref: "OrdenVentaConcepto"
        }
    ],
    creado: {
        type: Date,
        default: Date.now
    }
})

// OrdenVentaSchema.plugin(populateFields)

export const OrdenVentaModel = mongoose.model<IOrdenVenta>('OrdenVenta', OrdenVentaSchema);

export type OrdenVenta = typeof OrdenVentaModel.schema.obj
