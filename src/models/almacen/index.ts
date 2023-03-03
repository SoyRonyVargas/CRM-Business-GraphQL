import mongoose, { Document, Schema } from "mongoose";
import { ProductoModel } from "../producto";
import { UsuarioModel } from "../usuario";

export interface IAlmacen extends Document {
    id_usuario_creado: string
    cantidad_restante: number
    cantidad_entrada: number
    id_producto: string
}

const AlmacenSchema = new mongoose.Schema({
    id_producto: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: ProductoModel.collection.collectionName
    },
    id_usuario_creado: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UsuarioModel.collection.collectionName
    },
    cantidad_entrada: {
        type: Number,
        required: true,
        trim: true
    },
    cantidad_restante: {
        type: Number,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const AlmacenModel = mongoose.model<IAlmacen>('Almacen', AlmacenSchema);

export type Almacen = typeof AlmacenModel.schema.obj