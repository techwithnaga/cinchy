import express from "express";
import {
  createMotorGroup,
  getMotorGroups,
  updateMotorGroup,
  deleteMotorGroup,
} from "../controllers/MotorGroup.js";

const router = express.Router();

router.get("/", getMotorGroups);
router.post("/", createMotorGroup);
router.put("/:id", updateMotorGroup);
router.delete("/:id", deleteMotorGroup);

export default router;
