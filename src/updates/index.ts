import { updateModelCliente } from './movimientos/clientes'

const ActualizarModelos = async () => {
  
    await updateModelCliente()

    console.log("Modelos actualizados");

}

export default ActualizarModelos