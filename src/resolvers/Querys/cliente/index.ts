import { ClienteModel , Cliente } from "../../../models/clientes";
import { CrearCliente } from "../../../models/clientes/types";
import { GraphQLError } from "graphql";
import { BasicResolver } from "types";

const obtenerClientes : BasicResolver<CrearCliente> = async ( _ , { input } , context ) => {

    try
    {

        const clientes : Cliente[] = await ClienteModel.find({})
            .populate("vendedor")

        console.log(clientes);

        return clientes;

    }
    catch(err)
    {

    }
    
}

const obtenerClientesVendedor : BasicResolver<CrearCliente> = async ( _ , __ , context ) => {

    try
    {

        const clientesPorVendedor : Cliente[] = await ClienteModel.find({ 
            vendedor: context.authScope
        }).populate("vendedor")

        console.log(clientesPorVendedor)

        return clientesPorVendedor;

    }
    catch(err)
    {

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
    obtenerCliente
}