import { Cliente } from "."

export type CrearCliente = Omit<Cliente, "vendedor">

export type ActualizarCliente = Omit<Cliente, "creado">

export type QueryClientesVendedor = {
    nombre: string | null
}