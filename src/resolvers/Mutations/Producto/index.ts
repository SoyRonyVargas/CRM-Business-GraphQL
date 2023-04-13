import { ActualizarProducto, CrearProducto } from "../../../models/producto/types";
import { ProductoModel } from "../../../models/producto";
import handleError from "../../../utils/handleError";
import { GraphQLError } from "graphql";
import { GenInput } from "types";

const crearProducto = async ( _ , { input } : GenInput<CrearProducto> ) => {

    try
    {

        const productoNuevo = new ProductoModel(input)

        await productoNuevo.save()

        return productoNuevo;

    }
    catch(err)
    {

        console.log(err);

        return handleError({
            msg: "Error al crear el producto",
            status: "200"
        })

    }

}

const actualizarProducto = async ( _ , { input } : GenInput<ActualizarProducto> ) => {

    try
    {

        const producto = await ProductoModel.findById(input.id)

        if( !producto ) return handleError({
            msg: "El producto no existe",
            status: "200"
        })

        const productoActualizado = await ProductoModel.findByIdAndUpdate( producto.id , input , { new: true })

        return productoActualizado

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al actualizar el producto', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}

const eliminarProducto = async ( _ , { input } : GenInput<string> ) => {

    try
    {

        await ProductoModel.findByIdAndDelete(input)

        return true

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al elimiar el producto', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}


export default {
    actualizarProducto,
    eliminarProducto,
    crearProducto,
}