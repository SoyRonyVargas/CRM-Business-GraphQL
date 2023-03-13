import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone"
import { ContextFunction } from "@apollo/server"

export type IContext = ContextFunction< [StandaloneServerContextFunctionArgument] , ContextApp >

export interface ContextApp {
    authScope: string | null
}

export type GenInput<T> = {
    input: T
}

export type BasicResolver<T> = ( _ : any , x : GenInput< T | null > , context: ContextApp ) => any;

