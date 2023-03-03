import { CreateEntradaAlmacen } from "../../../models/almacen/types";
import { AlmacenModel } from "../../../models/almacen";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";

const crearEntradaAlmacen : BasicResolver<CreateEntradaAlmacen> = async ( _ , { input } , ctx ) => {

    try
    {

        const { conceptos } = input

        let promises = []

        for( let i = 0; i < conceptos.length; i++ )
        {
            
            const concepto = conceptos[i]
            
            const entradaAlmacen = new AlmacenModel(concepto)
            
            entradaAlmacen.cantidad_entrada = concepto.cantidad_entrada as number;

            entradaAlmacen.cantidad_restante = concepto.cantidad_entrada as number;

            entradaAlmacen.id_producto = concepto.id_producto as string
            
            entradaAlmacen.id_usuario_creado = ctx.authScope

            promises.push(entradaAlmacen.save())

        }

        await Promise.all(promises)

        return true

    }   
    catch(err)
    {
        return handleError(err)
    } 

}

export default {
    crearEntradaAlmacen
}