import verificarToken from "../utils/verificarToken"
import { GraphQLError } from "graphql";
import { IContext } from "types"

const ContextFn : IContext = async ({ req , res } ) => {
  
    const token : string = req.headers['authorization'];
  
    if( token )
    {
        
        const usuario = verificarToken(token);

        if( !usuario )
        {
            throw new GraphQLError('Error de autenticacion', {
                extensions: {
                code: 'BAD_REQUEST',
                http: { status: 200 },
                }
            });
        }

        return {
            authScope: usuario?.id || null
        }

    }

    return {
        authScope: null
    }

}

export default ContextFn