import CarritoConceptoMutations from './carrito/concepto'
import EntradaAlmacenMutations from './entrada_almacen'
import OrdenVentaMutations from './orden_venta'
import ProductMutations from './producto'
import ClienteMutations from './cliente'
import UserMutations from './user'

export default {
    ...CarritoConceptoMutations,
    ...EntradaAlmacenMutations,
    ...OrdenVentaMutations,
    ...ProductMutations,
    ...ClienteMutations,
    ...UserMutations,
}