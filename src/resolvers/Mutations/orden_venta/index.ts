import { OrdenVentaConceptoModel } from "../../../models/orden/concepto";
import { CrearOrdenVenta } from "../../../models/orden/types";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";

const crearOrdenVenta : BasicResolver<CrearOrdenVenta> = async ( _ , { input } , context ) => {
    
    try
    {

        const { conceptos , ...restoOrden } = input
        
        const orden = new OrdenVentaModel(restoOrden)

        for( const concepto of conceptos )
        {
            
            const conceptoVenta = new OrdenVentaConceptoModel(concepto)

            orden.conceptos.push(conceptoVenta.id);

            conceptoVenta.status = 1
            
            await conceptoVenta.save()
            
        }

        console.log("ORDEN FINAL");
        console.log(orden);

        await orden.save()

        return orden

    }
    catch(err)
    {
        console.log(err);
        return handleError()
    }

}

export default {
    crearOrdenVenta
}