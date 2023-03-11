import { ProductoModel , Producto } from "../../../models/producto";
import { AlmacenModel } from "../../../models/almacen";
import { GraphQLError } from "graphql";
import { GenInput } from "types";

const obtenerProductos = async () => {
    
    try 
    {
        
        const productos : Producto[] = await ProductoModel.find({})
        
        for( const producto of productos )
        {
            
            const existencias = await AlmacenModel.find({ 
                id_producto: { $eq: producto.id } 
            })

            let total_existencias = 0

            for( const existencia of existencias )
            {
                total_existencias += existencia.cantidad_restante
            }

            // producto.imagen = parseImagenes(producto.imagen)

            producto.existencias = total_existencias

        }

        return productos

    } 
    catch (err) 
    {
        
        console.log(err);

        throw new GraphQLError( err , {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
        })

    }
    
}

const obtenerProducto = async ( _ , { input } : GenInput<string> ) => {
    
    try 
    {
        
        const producto : Producto = await ProductoModel.findById(input)
        
        if( !producto )
        {
            return new GraphQLError( "Producto no encontrado" , {
                extensions: { code: 'NOT_FOUND' , http: { code: 404 } },
            })
        }

        return producto

    } 
    catch (err) 
    {
        
        throw new GraphQLError( err , {
            extensions: { code: 'INTERNAL_SERVER_ERROR' },
        })

    }
    
}

export default {
    obtenerProductos,
    obtenerProducto
}