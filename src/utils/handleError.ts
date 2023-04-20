import { GraphQLError } from "graphql"

type Config = {
    status?: string
    msg: string
}

const DefaultConfig : Config = {
    msg: "Error del servidor",
    status: "400"
}

const handleError = ( config : Config = DefaultConfig ) => {

    const { msg , status = 200 } = config

    return new GraphQLError( msg , {
        extensions: {
          code: 'BAD_REQUEST',
          http: { status },
        },
    });

}

export default handleError