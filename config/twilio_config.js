import twilio from "twilio";
import { logger } from "./winston_config.js";
import {
  accountSID,
  authToken,
  twilio_PhoneNumber,
} from "../config/dotenv_config.js";

export async function MsjToUser_Twilio(user, orderID) {
  const client = twilio(accountSID, authToken);

  try {
    const message = await client.messages.create({
      body: `Su pedido ha sido recibido y se encuentra en proceso! N° de orden: ${orderID}`,
      from: twilio_PhoneNumber,
      to: user.phone_number,
    });
    logger.info(message)
  } catch (error) {
    logger.error(
      `Error al enviarle MSJ de texto a usuario notificando nueva orden: ${error}`
    );
  }
}
