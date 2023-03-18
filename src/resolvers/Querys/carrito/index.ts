import { ConceptoCarrito, ConceptoCarritoModel } from "../../../models/carrito/concepto"
import handleError from "../../../utils/handleError"
import { BasicResolver } from "types"

const obtenerCarrito : BasicResolver<null> = async ( _ , x , ctx ) => {

    try
    {
        
        const carrito : ConceptoCarrito[] = await ConceptoCarritoModel.find({
            usuario: {
                $eq: ctx.authScope
            }
        })
        .populate("producto")
        .populate("usuario")

        return {
            conceptos: carrito
        };

    }
    catch(err)
    {
        return handleError(err)
    }
    
}

export default {
    obtenerCarrito
}