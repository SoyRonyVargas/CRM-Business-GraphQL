import OrdenVentaMutations from './orden_venta'
import ProductMutations from './producto'
import ClienteMutations from './cliente'
import UserMutations from './user'

export default {
    ...OrdenVentaMutations,
    ...ProductMutations,
    ...ClienteMutations,
    ...UserMutations,
}