import express from "express";
import {
  createMotor,
  getMotor,
  getMotors,
  updateMotor,
  deleteMotor,
} from "../controllers/MotorDetail.js";

const router = express.Router();

router.get("/:id", getMotor);
router.get("/", getMotors);
router.post("/", createMotor);
router.put("/:id", updateMotor);
router.delete("/:id", deleteMotor);

export default router;
