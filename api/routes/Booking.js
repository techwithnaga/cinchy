import express from "express";
import {
  createBooking,
  getBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  sendBookingConfirmation,
} from "../controllers/Booking.js";

const router = express.Router();

router.get("/:id", getBooking);
router.get("/", getBookings);

router.post("/", createBooking);
router.post("/sendbookingconfirmation", sendBookingConfirmation);

router.put("/:id", updateBooking);
router.delete("/:motorGroupId/:bookingId", deleteBooking);

export default router;
