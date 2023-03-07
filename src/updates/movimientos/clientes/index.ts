import { ClienteModel } from "../../../models/clientes"

export const updateModelCliente = async () => {

    await ClienteModel.updateMany(
        {
            rfc: { $exists: false }
        }, 
        {  
            $set : { "rfc" : "Valor por defecto" }
        } 
    ).exec()

}