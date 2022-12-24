import express from "express";
import {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/Booking.js";

const router = express.Router();

router.get("/:id", getBooking);
router.get("/", getBookings);
router.post("/", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
