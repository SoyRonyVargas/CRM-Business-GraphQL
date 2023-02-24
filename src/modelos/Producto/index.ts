import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true
    },
    existencias: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const ProductoModel = mongoose.model('Producto', ProductoSchema);
