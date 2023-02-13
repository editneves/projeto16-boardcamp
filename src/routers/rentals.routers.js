import { Router } from "express";
import {
    listRentals,
    createRentals,
    // finalizeRental,
    // deleteRental,
} from "../controllers/rentals.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../models/rentals.model.js";

const router = Router();

router.get("/rentals", listRentals);
router.post("/rentals", validateSchema(rentalsSchema), createRentals);
// router.put("/rentals/:id/return", finalizeRental);
// router.delete("/rentals/:id", deleteRental);


export default router;