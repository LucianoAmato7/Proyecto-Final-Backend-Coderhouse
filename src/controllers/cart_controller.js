import { logger } from "../../config/winston_config.js";
import cart_repository from "../repository/cart_repository.js";

export const AssignsCartID_controller = async (req, res) => {
  try {
    let { userID } = req.params;
    const productos = await cart_repository.assignsCartID(userID);
    res.json(productos);
  } catch (err) {
    const errorMessage = "Error al asignar ID de carrito.";
    logger.error(
      `En el CONTROLLER AssignsCartID_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const CreateCart_controller = async (req, res) => {
  try {
    const newCartID = await cart_repository.create(userID);
    res.json(newCartID);
  } catch (err) {
    const errorMessage = "Error al crear carrito.";
    logger.error(
      `En el CONTROLLER CreateCart_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const DeleteCart_controller = async (req, res) => {
  try {
    let { cartID } = req.params;
    let { userID } = req.params;
    const userID_ = await cart_repository.deleteCart(cartID, userID);
    if (!userID_) {
      const errorMessage = "No se encontró el carrito.";
      return res.status(404).json({ error: errorMessage });
    }
    res.json(userID_);
  } catch (err) {
    const errorMessage = "Error al eliminar carrito.";
    logger.error(
      `En el CONTROLLER DeleteCart_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const GetProdsFromCart_controller = async (req, res) => {
  try {
    let { idCart } = req.params;
    const prods = await cart_repository.getProds(idCart);
    res.json(prods);
  } catch (err) {
    const errorMessage = "Error al obtener productos del carrito.";
    logger.error(
      `En el CONTROLLER GetProdsFromCart_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const AddProdToCart_controller = async (req, res) => {
  try {
    let { idCart } = req.params;
    let { idProd } = req.params;
    const cart = await cart_repository.addProdToCart(idCart, idProd);
    res.json(cart);
  } catch (err) {
    const errorMessage = "Error al agregar producto al carrito.";
    logger.error(
      `En el CONTROLLER AddProdToCart_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};

export const DeleteProdFromCart_controller = async (req, res) => {
  try {
    let { idCart } = req.params;
    let { idProd } = req.params;
    const cart = await cart_repository.deleteProdfromCart(idCart, idProd);
    res.json(cart);
  } catch (err) {
    const errorMessage = "Error al eliminar producto del carrito.";
    logger.error(
      `En el CONTROLLER DeleteProdFromCart_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};
