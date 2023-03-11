import mongoose, { Document } from "mongoose";

interface IProducto extends Document {
    existencias?: number
    descripcion: string
    imagen: string[]
    nombre: string
    precio: number
    creado: string
    status: number
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
        type: [String],
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
    creado: {
        type: Date,
        default: Date.now
    }
})

export const ProductoModel = mongoose.model<IProducto>('Producto', ProductoSchema);

export type Producto = typeof ProductoModel.schema.obj
