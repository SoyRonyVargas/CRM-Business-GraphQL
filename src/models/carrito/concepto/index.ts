import { Producto } from "../../producto";
import mongoose, { Document, Schema } from "mongoose";
// import { Usuario } from "../../models/usuario";

interface IConceptoCarrito extends Document {
    producto: Producto
    cantidad: number
    usuario: string
    importe: number
    creado: string
    total: number
}

export const ConceptoCarritoSchema = new mongoose.Schema({
    producto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Producto'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true,
    },
    importe: {
        type: Number,
        required: true,
        trim: true,
    },
    total: {
        type: Number,
        required: true,
        trim: true,
    },
    creado: {
        type: Date,
        default: Date.now
    }
}, { strict: false })

export const ConceptoCarritoModel = mongoose.model<IConceptoCarrito>('ConceptoCarrito', ConceptoCarritoSchema);

export type ConceptoCarrito = typeof ConceptoCarritoModel.schema.obj
