import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersBookings,
  getMyCurrentBooking,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:whatsappNumber", getUsersBookings);
router.get("/mycurrentbooking/:whatsappNumber", getMyCurrentBooking);

export default router;
