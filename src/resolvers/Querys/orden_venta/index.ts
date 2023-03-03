import { InputOrdenVentasQuery } from "../../../models/orden/types";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";


const obtenerOrdenesVentaUsuario : BasicResolver<InputOrdenVentasQuery> = async ( _ , { input } , context ) => {

    try
    {

        const { 
            fecha_inicio,
            fecha_fin
        } = input

        let ordenesVenta = await OrdenVentaModel
            .find({ 
                vendedor: context.authScope, 
                status: input.status,
                creado: {
                    $gte: new Date(fecha_inicio),
                    $lt: new Date(fecha_fin)
                }
            })
            .populate(["vendedor", "cliente", "conceptos"])
            .populate({ path: "conceptos" , populate: "producto" })
            .exec()
        
        for( const orden of ordenesVenta )
        {
            
            // orden.creado = new Date(orden.creado).toString();
            
            orden.creado.toString()   

            // orden.creado = "sexo";
            
            // orden.fecha_entrega = "sexo";
            
            console.log(orden);

        }

        return ordenesVenta

    }
    catch(err)
    {
        return handleError(err)
    }

}

const obtenerOrdenenPorId : BasicResolver<string> = async ( _ , { input } ) => {

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
    obtenerOrdenesVentaUsuario,
    obtenerOrdenenPorId,
}
