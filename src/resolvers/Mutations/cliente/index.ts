import { ActualizarCliente, CrearCliente } from "../../../models/clientes/types";
import { ClienteModel } from "../../../models/clientes";
import { GraphQLError } from "graphql";
import { BasicResolver } from "types";

const crearCliente : BasicResolver<CrearCliente> = async ( _ , { input } , context ) => {

    try
    {

        const { email } = input

        const existeCliente = await ClienteModel.findOne({ email })

        if( existeCliente ) return new GraphQLError('Error el cliente ya existe');
        
        const clienteNuevo = new ClienteModel(input)

        clienteNuevo.fecha_nacimiento = new Date().toString()

        clienteNuevo.vendedor = context.authScope

        await clienteNuevo.save()

        return clienteNuevo

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al crear el cliente', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}

const eliminarCliente : BasicResolver<string> = async ( _ , { input } ) => {

    try 
    {
    
        const query = await ClienteModel.findByIdAndDelete(input)

        if( !query ) return false;

        return true;
        
    } 
    catch (error) 
    {
        
        return false;

    }

}

const actualizarCliente : BasicResolver<ActualizarCliente> = async ( _ , { input } ) => {

    try
    {

        const { id } = input

        const existeCliente = await ClienteModel.findById(id)

        if( !existeCliente ) return new GraphQLError('Error cliente no encontrado', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 404 },
            }
        });
        
        const clienteActualizado = await ClienteModel.findByIdAndUpdate( id , input , { new:true })

        return clienteActualizado

    }
    catch(err)
    {

        console.log(err);

        throw new GraphQLError('Error al actualizar el cliente', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });

    }

}

export default {
    actualizarCliente,
    eliminarCliente,
    crearCliente,
}