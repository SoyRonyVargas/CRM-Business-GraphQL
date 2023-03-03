import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";


const obtenerOrdenesVentaUsuario : BasicResolver<null> = async ( _ , { input } , context ) => {

    try
    {

        const query = OrdenVentaModel.find({ vendedor: context.authScope }).populate(["vendedor", "cliente", "conceptos"])

        const ordenesVenta = query.populate({ path: "conceptos" , populate: "producto" })
            
        //.populate(["vendedor", "cliente", "conceptos"])

        return ordenesVenta

    }
    catch(err)
    {
        return handleError(err)
    }

}

const obtenerOrdenenPorId : BasicResolver<string> = async ( _ , { input } , context ) => {

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
