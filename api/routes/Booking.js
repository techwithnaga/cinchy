import express from "express";
import {
<<<<<<< HEAD
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
=======
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
>>>>>>> 08656ecd6edbcb5d1de67896747af4bdde76d442
