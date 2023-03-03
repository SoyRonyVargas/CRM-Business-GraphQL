import mongoose, { Document } from "mongoose";

interface IProducto extends Document {
    descripcion: string
    existencias: number
    nombre: string
    imagen: string
    precio: number
    creado: string
}

export const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
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

export const ProductoModel = mongoose.model<IProducto>('Producto', ProductoSchema);

export type Producto = typeof ProductoModel.schema.obj
