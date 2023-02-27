import mongoose, { Document, Schema } from "mongoose";
import { Usuario } from "../../models/usuario";

interface ICliente extends Document {
    vendedor: string | Usuario
    telefono: string
    apellido: string
    empresa: string
    nombre: string
    creado: string
    email: number
    edad: number
}

const ClienteSchema = new mongoose.Schema({
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
    edad: {
        type: Number,
        required: true,
        trim: true,
        max: 150
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
    vendedor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const ClienteModel = mongoose.model<ICliente>('Cliente', ClienteSchema);

export type Cliente = typeof ClienteModel.schema.obj
