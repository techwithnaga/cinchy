import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersBookings,
  getMyCurrentBooking,
} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:whatsappNumber", getUsersBookings);
router.get("/mycurrentbooking/:whatsappNumber", getMyCurrentBooking);

export default router;
