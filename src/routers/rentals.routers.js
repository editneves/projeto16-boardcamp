import { Router } from "express";
import {
    listRentals,
    createRentals,
} from "../controllers/rentals.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../models/rentals.model.js";

const router = Router();

router.get("/rentals", listRentals);
router.post("/rentals", validateSchema(rentalsSchema), createRentals);

export default router;