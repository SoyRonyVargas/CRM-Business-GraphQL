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
            {
                $lookup: {
                    from: "ordenventaconceptos",
                    localField: "conceptos",
                    foreignField: "_id",
                    as: "conceptos"
                }
            },
            { 
                $match: { 
                    status: 1 
                } 
            },
            {
                $lookup: {
                    from: "clientes",
                    localField: "cliente",
                    foreignField: "_id",
                    as: "cliente"
                }
            }, 
            { 
                $group: {
                    _id: "$cliente",
                    cliente: {
                        $first: "$cliente"
                    },
                    total: {
                        $sum: {
                            $sum: "$conceptos.total"
                        }
                    },
                },
            },
            {
                $sort: {
                    total: -1
                }
            }
        ])

        console.log(ventasPorCliente);

        for( const campo of ventasPorCliente )
        {
            console.log(campo.cliente);
            for( const cliente of campo.cliente )
            {
                // console.log('cliente');
                // console.log(cliente);
            }
        }

        return ventasPorCliente;

    }
    catch(err)
    {
        
        console.log(err);

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