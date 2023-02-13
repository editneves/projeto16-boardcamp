import { Router } from "express";
import {
  listGame,
  createGame,
} from "../controllers/game.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../models/game.model.js";

const router = Router();

router.get("/games", listGame);
router.post("/games", validateSchema(gameSchema), createGame);

export default router;