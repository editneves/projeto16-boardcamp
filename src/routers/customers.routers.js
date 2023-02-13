import { Router } from "express";
import {
    listCustomers,
    CustomersById,
    createCustomers,
    updateCustomers,
} from "../controllers/customers.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customersSchema } from "../models/customers.model.js";

const router = Router();

router.get("/customers", listCustomers);
router.get("/customers/:id", CustomersById);
router.post("/customers", validateSchema(customersSchema), createCustomers);
router.put("/customers/:id", updateCustomers);

export default router;