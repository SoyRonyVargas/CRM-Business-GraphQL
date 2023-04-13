import { ProductoModel } from "../../../models/producto"
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
    
    await ProductoModel.updateMany(
        {
            existencias: { $exists: false }
        }, 
        {  
            $set : { "existencias" : 0 }
        } 
    ).exec()

}