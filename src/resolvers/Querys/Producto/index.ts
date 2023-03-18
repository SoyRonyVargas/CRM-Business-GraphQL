import { ProductoModel , Producto } from "../../../models/producto";
import { QueryProductos } from "../../../models/producto/types";
import { AlmacenModel } from "../../../models/almacen";
import { GenInput, BasicResolver } from "types";
import { GraphQLError } from "graphql";

const obtenerExistencias = async ( producto : Producto ) : Promise<number> => 
{

    const existencias = await AlmacenModel.find({ 
        id_producto: { $eq: producto.id } 
    })

    let total_existencias = 0

    for( const existencia of existencias )
    {
        total_existencias += existencia.cantidad_restante
    }

    return total_existencias

}

const obtenerProductos : BasicResolver<QueryProductos> = async ( _ , { input } ) => {
    
    try 
    {
        
        const { pagina, nombre , status } = input

        const skiped = pagina * 10

        const query = {
            // nombre: null
            status
        }

        if( nombre ) {
            query['nombre'] = {
                // $regex: '.*' + nombre + '.*'
                $regex: nombre,
                $options: 'i'
            }
        }
        
        // if( nombre ) query.nombre = nombre;

        console.log('query');
        console.log(query);

        const productos : Producto[] = await ProductoModel
            .find(query)
            .skip(skiped)
            .limit(10)
            .exec()

        
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
        
        if( !producto ) return new GraphQLError( "Producto no encontrado" , {
            extensions: { code: 'NOT_FOUND' },
        });
       

        const existencias = await obtenerExistencias(producto)

        producto.existencias = existencias

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