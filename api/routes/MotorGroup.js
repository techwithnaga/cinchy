import express from "express";
import {
  createMotorGroup,
  getMotorGroups,
  getMotorGroup,
  updateMotorGroup,
  deleteMotorGroup,
  updateBookedTime,
} from "../controllers/MotorGroup.js";

const router = express.Router();

router.get("/:startTime&:endTime", getMotorGroups);

router.get("/:id", getMotorGroup);
router.post("/", createMotorGroup);
router.put("/:id", updateMotorGroup);
router.put("/updatetime/:id", updateBookedTime);
router.delete("/:id", deleteMotorGroup);

export default router;
