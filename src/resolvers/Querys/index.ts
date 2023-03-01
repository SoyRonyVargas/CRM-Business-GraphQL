import OrdenesVentaQuerys from './orden_venta'
import ProductosQuerys from './producto'
import ClientesQuerys from './cliente'
import UserQuerys from './users'

export default {
    ...OrdenesVentaQuerys,
    ...ProductosQuerys,
    ...ClientesQuerys,
    ...UserQuerys
}