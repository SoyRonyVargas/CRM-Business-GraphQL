import { ConceptoCarritoModel } from "../../../models/carrito/concepto"
import handleError from "../../../utils/handleError"
import { BasicResolver } from "types"

const obtenerCarrito : BasicResolver<null> = async ( _ , x , ctx ) => {

    try
    {
        
        const conceptos = await ConceptoCarritoModel.find({
            usuario: ctx.authScope
        })
        .populate("usuario")
        .populate("producto")
        
        return {
            conceptos
        }

    }
    catch(err)
    {
        return handleError(err)
    }
    
}

const obtenerNavbarCarrito : BasicResolver<null> = async ( _ , __ , ctx ) => {

    try
    {
        
        const conceptos = await ConceptoCarritoModel.find({
            usuario: ctx.authScope
        })

        console.log(conceptos);
        console.log(ctx.authScope);
        
        return conceptos.length

    }
    catch(err)
    {
        return handleError(err)
    }
    
}

export default {
    obtenerNavbarCarrito,
    obtenerCarrito
}