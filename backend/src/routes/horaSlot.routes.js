"use strict";
import { Router } from "express";
import horaSlotController from "../controllers/horaSlot.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", horaSlotController.getHoraSlots);
router.get("/disponibles", horaSlotController.getHoraSlotsDisponibles);
router.post("/", isAdmin, horaSlotController.createHoraSlot);
router.delete("/:id", isAdmin, horaSlotController.deleteHoraSlotById);
router.put("/:id", isAdmin, horaSlotController.updateHoraSlotById);
router.get("/:id", horaSlotController.getHoraSlotById);
router.post("/create-range-hour", horaSlotController.createRangeHour);
router.get("/idPyme/:idPyme", horaSlotController.getHoraSlotByIdPyme);

export default router;
