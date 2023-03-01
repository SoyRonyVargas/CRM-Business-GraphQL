import { GraphQLError } from "graphql"

type Status = "404" | "401" | "500"

type Config = {
    msg: string
    status: string
}

const DefaultConfig : Config = {
    msg: "Error del servidor",
    status: "400"
}

const handleError = ( config : Config = DefaultConfig ) => {

    console.log(config);
    
    const { msg , status } = config

    throw new GraphQLError( msg , {
        extensions: {
          code: 'BAD_REQUEST',
          http: { status },
        }
    });

    return 

}

export default handleError