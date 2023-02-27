import verificarToken from "@utils/verificarToken"
import { GraphQLError } from "graphql";
import {IContext } from "types"

const ContextFn : IContext = async ({ req , res }) => {
  
    const token : string = req.headers['authorization'];
    const routeAuth = req.headers['auth'] || null;

    // console.log( !token );
    // console.log( routeAuth );
    
    // if( !(routeAuth === "1") && !token )
    // {
    //     throw new GraphQLError('Error de autenticacion', {
    //         extensions: {
    //           code: 'BAD_REQUEST',
    //           http: { status: 401 },
    //         }
    //     });
    // }
    
    if( token )
    {
        
        const usuario = verificarToken(token);

        if( !usuario )
        {
            throw new GraphQLError('Error de autenticacion', {
                extensions: {
                code: 'BAD_REQUEST',
                http: { status: 401 },
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