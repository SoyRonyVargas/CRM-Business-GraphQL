import OrdenesVentaQuerys from './orden_venta'
import ProductosQuerys from './producto'
import ClientesQuerys from './cliente'
import CarritoQuerys from './carrito'
import UserQuerys from './Users'

export default {
    ...OrdenesVentaQuerys,
    ...ProductosQuerys,
    ...ClientesQuerys,
    ...CarritoQuerys,
    ...UserQuerys
}