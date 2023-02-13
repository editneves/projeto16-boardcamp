import { Router } from "express";
import gameRouters from "./game.routers.js";
import customersRouters from "./customers.routers.js";

const router = Router();

router.use(gameRouters);
router.use(customersRouters);


export default router;