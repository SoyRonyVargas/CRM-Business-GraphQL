import { JwtPayload } from "jsonwebtoken"

export type CrearUsuario = {
    apellidos: string
    password: string
    nombre: string
    email: string
    id?: string 
}

export type UsuarioPayload = Pick<CrearUsuario , "id"> & JwtPayload;

export type AuthUsuario = {
    password: string
    email: string
}