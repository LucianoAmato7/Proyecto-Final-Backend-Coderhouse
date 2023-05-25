import { Router } from "express";
import {
    CreateOrder_controller,
    UserOrders
} from "../controllers/products_controller.js";

const router = Router();

router.post("/:idCart/neworder/:idUser", CreateOrder_controller);

router.get("/:idUser", UserOrders)

export default router;