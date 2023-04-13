import { ProductoModel , Producto, IProducto } from "../../../models/producto";
import { QueryProductos } from "../../../models/producto/types";
import { GenInput, BasicResolver } from "types";
import { GraphQLError } from "graphql";

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

        // console.log('query');
        // console.log(query);

        const productos : Producto[] = await ProductoModel
            .find(query)
            .skip(skiped)
            .limit(10)
            .exec()

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

const obtenerProducto = async ( _ , { input } : GenInput<string> ) : Promise<IProducto> => {
    
    try 
    {
        
        const producto : IProducto = await ProductoModel.findById(input)
        
        if( !producto ) throw new GraphQLError( "Producto no encontrado" , {
            extensions: { code: 'NOT_FOUND' },
        });
       
        return producto;

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