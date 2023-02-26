import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

export type Usuario = typeof UsuarioModel.schema.obj
