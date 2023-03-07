import mongoose, { Document, Schema } from "mongoose";
import { Usuario } from "../../models/usuario";

interface ICliente extends Document {
    vendedor: string | Usuario
    fecha_nacimiento: string
    telefono: string
    apellido: string
    empresa: string
    nombre: string
    creado: string
    status: number
    email: number
    rfc: string
}

export const ClienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    empresa: {
        type: String,
        required: true,
        trim: true
    },
    rfc: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        required: true,
        default: 0,
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    creado: {
        type: Date,
        default: Date.now
    }
}, { strict: false })

export const ClienteModel = mongoose.model<ICliente>('Cliente', ClienteSchema);

export type Cliente = typeof ClienteModel.schema.obj
