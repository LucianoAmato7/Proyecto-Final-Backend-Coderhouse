import { Router } from "express";
import {
  ListMsjsByEmail_controller,
  WebSocket_controller
} from "../controllers/messages_controller.js";

const router = Router();

router.get("/", WebSocket_controller);

router.get("/:email", ListMsjsByEmail_controller);

export default router;
