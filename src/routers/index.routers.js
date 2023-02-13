import { Router } from "express";
import gameRouters from "./game.routers.js";
import customersRouters from "./customers.routers.js";
import rentalsRouters from "./rentals.routers.js";
const router = Router();

router.use(gameRouters);
router.use(customersRouters);
router.use(rentalsRouters);

export default router;