import mongoose, { Schema } from "mongoose";

export interface IOrdenVenta extends Document {
    
    // REFERENCIAS
    conceptos: Array<string>
    vendedor: string
    cliente: string

    fecha_entrega: string
    titulo_venta: string
    subtotal: number
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
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
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

export const OrdenVentaModel = mongoose.model<IOrdenVenta>('OrdenVenta', OrdenVentaSchema);

export type OrdenVenta = typeof OrdenVentaModel.schema.obj
