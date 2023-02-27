import ProductosQuerys from './producto'
import ClientesQuerys from './cliente'
import UserQuerys from './users'

export default {
    ...ProductosQuerys,
    ...ClientesQuerys,
    ...UserQuerys
}