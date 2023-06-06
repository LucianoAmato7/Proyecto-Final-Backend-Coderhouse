import messages_repository from "../repository/messages_repository.js";
import { logger } from "../../config/winston_config.js";
import { io } from "../server.js";

let isWebSocketInitialized = false;

export const WebSocket_controller = async (req, res) => {
  try {
    let user = req.session.user;

    res.render("chat");

    if (!isWebSocketInitialized) {
      io.on("connection", (socket) => {
        ListMsjs_controller()
          .then((msjs) => {
            socket.emit("messages", msjs);
          })
          .catch((err) => {
            const errorMessage = "Error al listar los mensajes.";
            logger.error(
              `En el CONTROLLER WebSocket_controller: ${errorMessage}`,
              err
            );
          });

        socket.on("newMessage", (msj) => {
          SaveMsj_controller(msj, user)
            .then((msjs) => {
              io.sockets.emit("messages", msjs);
            })
            .catch((err) => {
              const errorMessage = "Error al guardar el mensaje.";
              logger.error(
                `En el CONTROLLER WebSocket_controller: ${errorMessage}`,
                err
              );
            });
        });
      });
      isWebSocketInitialized = true;
    }
  } catch (err) {
    const errorMessage = "Error al iniciar el chat.";
    logger.error(`En el CONTROLLER WebSocket_controller: ${errorMessage}`, err);
    res.status(500).json({ error: errorMessage });
  }
};

const ListMsjs_controller = async () => {
  try {
    const msjs = await messages_repository.find();
    return msjs;
  } catch (err) {
    const errorMessage = "Error al listar los mensajes.";
    logger.error(`En el CONTROLLER ListMsjs_controller: ${errorMessage}`, err);
  }
};

const SaveMsj_controller = async (msj, user) => {
  try {
    const msjs = await messages_repository.save(msj, user);
    return msjs;
  } catch (err) {
    const errorMessage = "Error al guardar el mensaje.";
    logger.error(`En el CONTROLLER SaveMsj_controller: ${errorMessage}`, err);
  }
};

export const ListMsjsByEmail_controller = async (req, res) => {
  try {
    const { email } = req.params;
    const msjsByEmail = await messages_repository.findByEmail(email);
    res.json(msjsByEmail);
  } catch (err) {
    const errorMessage = "Error al listar los mensajes por email.";
    logger.error(
      `En el CONTROLLER ListMsjsByEmail_controller: ${errorMessage}`,
      err
    );
    res.status(500).json({ error: errorMessage });
  }
};
