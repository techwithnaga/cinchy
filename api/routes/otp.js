import express from "express";
import { getOTP, verifyOTP } from "../controllers/otp.js";

const router = express.Router();

router.get("/:whatsappNumber", getOTP);
router.post("/verifyOTP", verifyOTP);
// router.get("/sendMessage", sendMessage);

export default router;
