import handleError from "../../../utils/handleError"
import { BasicResolver } from "types"

const obtenerCarrito : BasicResolver<null> = async () => {

    try
    {
        
        // const clientes : Cliente[] = await ClienteModel.find({})
        //     .populate("vendedor")
        // return clientes;

    }
    catch(err)
    {
        return handleError(err)
    }
    
}

export default {
    obtenerCarrito
}