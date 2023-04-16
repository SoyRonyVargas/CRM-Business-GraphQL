import { InputOrdenVentasQuery } from "../../../models/orden/types";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";


const obtenerOrdenesVenta:BasicResolver<InputOrdenVentasQuery> = async ( _ , { input } , context ) => {

    try
    {

        // const { 
        //     fecha_inicio,
        //     fecha_fin
        // } = input

        // let ordenesVenta = await OrdenVentaModel
        //     .find({ 
        //         vendedor: context.authScope, 
        //         status: input.status,
        //         creado: {
        //             $gte: new Date(fecha_inicio),
        //             $lt: new Date(fecha_fin)
        //         }
        //     })
        //     .populate(["vendedor", "cliente", "conceptos"])
        //     .populate({ path: "conceptos" , populate: "producto" })
        //     .exec()
        
        let ordenesVenta = await OrdenVentaModel
            .find({ 
                vendedor: context.authScope, 
                status: 1,
            })
            .sort({
                creado: -1
            })
            .populate(["vendedor", "cliente", "conceptos"])
            .populate({ path: "conceptos" , populate: "producto" })
            .exec()
        
        let response = []

        for( const orden of ordenesVenta )
        {
            
            let total = 0;
            let importe = 0;
            let iva = 0;

            orden.creado.toString()   

            for( const concepto of orden.conceptos )
            {
                importe += concepto.importe;
                total += concepto.total;
                iva += concepto.iva;
            }

            const orden_basica = {
                id: orden.id,
                total_productos: orden.conceptos.length,
                titulo_venta: orden.titulo_venta,
                creado: orden.creado,
                cliente: orden.cliente,
                importe,
                total,
                iva,
            }

            console.log(orden_basica);

            response.push(orden_basica)

        }

        return response

    }
    catch(err)
    {
        return handleError(err)
    }

}

const obtenerOrdenenId : BasicResolver<string> = async ( _ , { input } ) => {

    try
    {

        const ordenVenta = await OrdenVentaModel
            .findById(input)
            .populate(["cliente", "vendedor" , "conceptos"])
            .populate({ path: "conceptos" , populate: "producto" })

        if( !ordenVenta ) return handleError({
            msg: "Orden no existente",
            status: "404"
        })

        return ordenVenta

    }
    catch(err)
    {

    }

}

export default {
    obtenerOrdenesVenta,
    obtenerOrdenenId,
}
