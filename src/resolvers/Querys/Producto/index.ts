import { ProductoModel , Producto } from "../../../models/producto";
import { GraphQLError } from "graphql";
import { GenInput } from "types";

const obtenerProductos = async () => {
    
    try 
    {
        
        const productos : Producto[] = await ProductoModel.find({})
        
        return productos

    } 
    catch (err) 
    {
        
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