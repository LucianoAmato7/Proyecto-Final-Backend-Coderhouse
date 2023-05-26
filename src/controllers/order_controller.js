import { logger } from "../../config/winston_config.js"
import order_repository from "../repository/order_repository.js"

export const CreateOrder_controller = async (req, res) => {
    try{
        let { idUser } = req.params;
        let { idCart } = req.params;
        const orderID = await order_repository.create(idUser, idCart)
        return orderID
    }catch(err){
        logger.error(err)
    }
}

export const OrdersById_controller = async (req, res) => {
    try{
        const {idUser} = req.params;
        const orders = await order_repository.ListById(idUser)
        return orders
    }catch(err){
        logger.error(err)
    }
}