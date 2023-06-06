import { logger } from "../../config/winston_config.js";
import order_repository from "../repository/order_repository.js";

export const CreateOrder_controller = async (req, res) => {
  try {
    let { idUser } = req.params;
    let { idCart } = req.params;
    const orderID = await order_repository.create(idUser, idCart);
    res.json(orderID);
  } catch (err) {
    const errorMessage = "Error al crear la orden.";
    logger.error(
      `En el CONTROLLER CreateOrder_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const OrdersById_controller = async (req, res) => {
  try {
    const { idUser } = req.params;
    const orders = await order_repository.ListById(idUser);
    res.json(orders);
  } catch (err) {
    const errorMessage = "Error al listar las órdenes del usuario.";
    logger.error(
      `En el CONTROLLER OrdersById_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};
