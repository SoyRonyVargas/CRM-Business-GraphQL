import { calcularExistenciasProducto } from "../../../../resolvers/mutations/orden_venta"
import { AgregarConceptoCarrito } from "../../../../models/carrito/concepto/types"
import { ConceptoCarritoModel } from "../../../../models/carrito/concepto"
import handleError from "../../../../utils/handleError"
import { BasicResolver } from "types"

const agregarConceptoCarrito : BasicResolver<AgregarConceptoCarrito> = async ( _ , { input } , context ) => {
    
    try
    {
        
        const { producto , cantidad } = input

        const existencias = await calcularExistenciasProducto(producto)

        // console.log("existencias");
        // console.log(existencias);
        
        // console.log("cantidad");
        // console.log(cantidad);

        if( cantidad > existencias ) return handleError({
            msg: "Existencias insuficientes",
        });

        console.log(context);
        
        const concepto = new ConceptoCarritoModel({
            cantidad,
            total: 100,
            importe: 100,
            producto,
            usuario: context.authScope
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
        
        await ConceptoCarritoModel.findByIdAndRemove(input)

        return true

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