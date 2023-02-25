import { CrearProducto } from "../../../modelos/Producto/types";
import { ProductoModel } from "../../../modelos/Producto";
import { GraphQLError } from "graphql";
import { GenInput } from "types";

const crearProducto = async ( _ , { input } : GenInput<CrearProducto> ) => {

    try
    {

        const productoNuevo = new ProductoModel(input)

        await productoNuevo.save()

        return productoNuevo

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al crear el usuario', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}


export default {
    crearProducto
}