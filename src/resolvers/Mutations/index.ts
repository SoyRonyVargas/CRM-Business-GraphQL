import CarritoConceptoMutations from './carrito/concepto'
import OrdenVentaMutations from './orden_venta'
import ProductMutations from './producto'
import ClienteMutations from './cliente'
import UserMutations from './user'

export default {
    ...CarritoConceptoMutations,
    ...OrdenVentaMutations,
    ...ProductMutations,
    ...ClienteMutations,
    ...UserMutations,
}