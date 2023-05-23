import { cart_Model } from "../models/cart_model.js";
import { user_Model } from "../models/user_model.js";
import { logger } from "../../config/winston_config.js";

class CartsDaoMongoDB {
  constructor() {
    this.model_cart = cart_Model;
    this.model_user = user_Model;
  }

  async GetCarts() {
    try {
      let data = await this.model_cart.find({});
      return data;
    } catch (error) {
      logger.error(`Error en operacion de base de datos: ${error}`);
      return { error: "Error en operacion de base de datos" };
    }
  }

  // CREAR Y APLICAR DTO.
  async CreateCart() {
    try {
      const date = new Date().toLocaleString();
      const cartToAdd = {
        timestamp: date,
        products: [],
      };
      const newCart = new this.model_cart(cartToAdd);
      const savedCart = await newCart.save();
      logger.info("Carrito creado con exito");
      return savedCart._id.toString();
    } catch (error) {
      logger.error(`Error en la creación del carrito: ${error}`);
      return { error: `Error en la creación del carrito: ${error}` };
    }
  }

  //CREAR Y APLICAR DTO / VE SI DEJARLO ACA O MODEL A USER_DAO
  async assignsCartID(userID) {
    try {
      const user = await this.model_user.find({ _id: userID });
      const userCart = user[0].cartID;
      if (!userCart.length > 0) {
        const date = new Date().toLocaleString();
        const cartToAdd = {
          timestamp: date,
          products: [],
        };
        const newCart = new this.model_cart(cartToAdd);
        const savedCart = await newCart.save();

        const userToUpdate = { _id: userID };
        const update = { cartID: savedCart._id.toString() };
        await this.model_user.updateOne(userToUpdate, update);

        logger.info("Carrito creado con exito y asignado a usuario");

        return [savedCart];
      } else {
        const cart = await this.model_cart.find({ _id: userCart });
        return cart;
      }
    } catch (error) {
      logger.error(`Error al asignarle el ID de carrito al usuario: ${error}`);
      return error;
    }
  }

  async ListById(id) {
    try {
      const data = await this.model_cart.findById(id);
      return data;
    } catch (error) {
      logger.error(`Error al listar los datos: ${error}`);
      return { error: `Error al listar los datos: ${error}` };
    }
  }

  //CART - lista los productos de x carrito
  async GetProds(idCart) {
    try {
      const cart = await this.model_cart.findById(idCart);
      return cart.products;
    } catch (error) {
      logger.error(`Error al listar el carrito: ${error}`);
      return { error: `Error al listar el carrito: ${error}` };
    }
  }

  //CART - inserta un producto en un carrito
  async addProdToCart(idCart, idProd) {
    //VER COMO OBTENER PROD
    const prod = await CartsDaoMongoDB.ListById(idProd);
    try {
      const cart = await this.model_cart.findById(idCart);
      const prodsArray = cart.products;
      prodsArray.push(prod);
      await this.model_cart.updateOne(
        { _id: idCart },
        { products: prodsArray }
      );
      logger.info("Producto agregado con exito");
      return await this.model_cart.findById(idCart);
    } catch (error) {
      logger.error(`Error al insertar un producto en el carrito: ${error}`);
      return { error: `Error al insertar un producto en el carrito: ${error}` };
    }
  }

  //CART - elimina un producto de un carrito
  async DeleteProd_cart(idCart, idProd) {
    try {
      const cart = await this.model_cart.findById(idCart);
      const prodsArray = cart.products;
      const update = prodsArray.filter((p) => p._id != idProd);
      await this.model_cart.updateOne({ _id: idCart }, { products: update });
      logger.info("Producto eliminado con exito");
      return await this.model_cart.findById({ _id: idCart });
    } catch (error) {
      logger.error(`Error al eliminar el producto: ${error}`);
      return { error: "Error al intentar eliminar el producto" };
    }
  }

  //CART - elimina por id y elimina el cartID asignado en usuario
  //VER UBICACION
  async DeleteCart(cartID, userID) {
    try {
      await this.model_cart.deleteOne({ _id: cartID });
      logger.info(`Carrito con id: ${cartID}, ha sido eliminado con exito`);

      await this.model_user.updateOne(
        { _id: userID },
        { $set: { cartID: "" } }
      );

      logger.info(`El cartID del usuario ha sido eliminado`);
      return userID;
    } catch (error) {
      logger.error(`Error en la eliminación del objeto: ${error}`);
      return { Error: "Error en la eliminación del objeto" };
    }
  }
}

export default CartsDaoMongoDB;
