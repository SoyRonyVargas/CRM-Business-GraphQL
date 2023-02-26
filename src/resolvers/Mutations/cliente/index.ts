import { CrearCliente } from "@models/clientes/types";
import { ClienteModel } from "@models/clientes";
import { GraphQLError } from "graphql";
import { BasicResolver } from "types";

const crearCliente : BasicResolver<CrearCliente> = async ( _ , { input } , context ) => {

    try
    {

        const { email } = input

        const existeCliente = await ClienteModel.findOne({ email })

        if( existeCliente ) return new GraphQLError('Error el cliente ya existe', {
            extensions: {
              code: 'BAD_REQUEST',
              http: { status: 401 },
            }
        });
        
        const clienteNuevo = new ClienteModel(input)

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

export default {
    crearCliente
}