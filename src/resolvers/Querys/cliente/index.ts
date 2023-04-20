import { CrearCliente, QueryClientesVendedor } from "../../../models/clientes/types";
import { ClienteModel , Cliente } from "../../../models/clientes";
import { OrdenVentaModel } from "../../../models/orden";
import handleError from "../../../utils/handleError";
import { GraphQLError } from "graphql";
import { BasicResolver } from "types";

const mejoresClientes:BasicResolver<null> = async ( _ , __ , context ) => {

    try
    {

        const ventasPorCliente = await OrdenVentaModel.aggregate([
            { $match: { status: 1 } },
            { 
                $group: {
                    _id: "$cliente",
                }
            },
            {
                $lookup: {
                    from: ""
                }
            }
        ])
    
        // for await( enta)

        console.log(ventasPorCliente)

        return ventasPorCliente;

    }
    catch
    {
        return handleError({
            msg: "Error del servidor"
        })
    }

}

const obtenerClientes : BasicResolver<CrearCliente> = async ( _ , { input } , context ) => {

    try
    {
        const clientes : Cliente[] = await ClienteModel.find({})
            .populate("vendedor")
        return clientes;
    }
    catch(err)
    {
        return handleError(err)
    }
    
}

const obtenerClientesVendedor : BasicResolver<QueryClientesVendedor> = async ( _ , { input } , context ) => {

    try
    {

        let query = {
            vendedor: context.authScope
        }

        if( input.nombre )
        {
            query['nombre'] = {
                $regex: input.nombre,
                $options: 'i'
            }
        }

        const clientesPorVendedor : Cliente[] = await ClienteModel.find(query).populate("vendedor")

        return clientesPorVendedor;

    }
    catch(err)
    {
        return handleError(err)
    }
    
}

const obtenerCliente : BasicResolver<string> = async ( _ , { input } ) => {

    try
    {

        const clientePorId = await ClienteModel.findById(input)
            .populate("vendedor")

        if( !clientePorId ) return new GraphQLError( "Cliente no encontrado" , {
            extensions: { code: 'NOT_FOUND' , http: { code: 404 } },
        })

        return clientePorId;

    }
    catch(err)
    {
        return new GraphQLError( "Error" , {
            extensions: { code: 'NOT_FOUND' , http: { code: 404 } },
        })
    }
    
}

export default {
    obtenerClientesVendedor,
    obtenerClientes,
    mejoresClientes,
    obtenerCliente
}