import { AgregarConceptoCarrito } from "../../../../models/carrito/concepto/types"
import { ConceptoCarritoModel } from "../../../../models/carrito/concepto"
import handleError from "../../../../utils/handleError"
import QueryProducto from '../../../querys/producto'
import { BasicResolver } from "types"

const agregarConceptoCarrito : BasicResolver<AgregarConceptoCarrito> = async ( _ , { input } , context ) => {
    
    try
    {
        
        const { producto , cantidad } = input

        // console.log("existencias");
        // console.log(existencias);
        
        // console.log("cantidad");
        // console.log(cantidad);

        const _producto = await QueryProducto.obtenerProducto( null , { 
            input: producto
        })

        if( cantidad > _producto.existencias ) return handleError({
            msg: "Existencias insuficientes",
        });

        const concepto = new ConceptoCarritoModel({
            usuario: context.authScope,
            importe: input.importe,
            total: input.total,
            iva: input.iva,
            producto,
            cantidad,
        })

        await concepto.save()

        return concepto

    }
    catch(err)
    {
        return handleError(err)
    }

}

const removerConceptoCarrito : BasicResolver<string> = async ( _ , { input } , context ) => {
    
    try
    {
        
        const concepto = await ConceptoCarritoModel.findById(input)

        await ConceptoCarritoModel.findByIdAndRemove(input)

        if( !concepto ) return handleError({
            msg: "No se puede remover el concepto"
        })

        return concepto

    }
    catch(err)
    {
        return handleError(err)
    }

}

export default {
    agregarConceptoCarrito,
    removerConceptoCarrito
}