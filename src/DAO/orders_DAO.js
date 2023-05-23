import { cart_Model } from "../models/cart_model.js";
import { user_Model } from "../models/user_model.js";
import { order_Model } from "../models/order_model.js";
import { logger } from "../../config/winston_config.js";

import { Email_NewOrder } from "../../config/nodemailer_config.js";

import { MsjToUser_Twilio } from "../../twilio_config.js";

//VER EMAILS Y MSJS
class OrdersDaoMongoDB {
  constructor() {
    this.model_cart = cart_Model;
    this.model_user = user_Model;
    this.model_order = order_Model;
  }

  //ORDER - Crea orden de compra
  async NewOrder(idUser, idCart) {
    try {
      const cart = await this.model_cart.findById(idCart);
      const user = await this.model_user.findById(idUser);

      const date = new Date().toLocaleString();

      //APLICAR DTO
      const OrderToAdd = {
        timestamp: date,
        user: {
          username: user.username,
          email: user.email,
          address: user.address,
          age: user.age,
          phone: user.phone_number,
          cartID: user.cartID,
          userID: user._id,
        },
        products: cart.products,
      };

      const newOrder = new this.model_order(OrderToAdd);

      const savedOrder = await newOrder.save();

      const orderID = savedOrder._id.toString();

      logger.info(`Nueva orden generada con exito!: ${orderID}`);

      //MOVER A CONTROLLER
      Email_NewOrder(user, cart, orderID)
        .then(() => {
          logger.info("Email_NewOrder ejecutada.");
        })
        .catch((error) => logger.error(error));

      //MOVER A CONTROLLER
      MsjToUser_Twilio(user, orderID)
        .then(() => {
          logger.info("MsjToUser_Twilio ejecutada.");
        })
        .catch((error) => logger.error(error));

      return orderID;
    } catch (error) {
      logger.error(`Error en la creación de nueva orden: ${error}`);
      return { Error: "Error en la creación de nueva orden" };
    }
  }
}

export default OrdersDaoMongoDB;
