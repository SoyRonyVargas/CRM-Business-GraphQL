import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { BasicResolver } from "types";


const obtenerOrdenesVentaUsuario : BasicResolver<null> = async ( _ , { input } , context ) => {

    try
    {

        const ordenesVenta = await OrdenVentaModel
            .find({ vendedor: context.authScope })
            .populate(["vendedor", "cliente", "conceptos"])
            .populate({ path: "conceptos" , populate: "producto" })

        return ordenesVenta

    }
    catch(err)
    {
        return handleError(err)
    }

}

export default {
    obtenerOrdenesVentaUsuario
}