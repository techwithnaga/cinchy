import express from "express";
import {
    createDeliveryFee,
    getDeliveryFee,
    getDeliveryFees,
    updateDeliveryFee,
    deleteDeliveryFee,
  } from "../controllers/DeliveryFee.js";
  
  const router = express.Router();
  
  router.get("/:id", getDeliveryFee);
  router.get("/", getDeliveryFees);
  router.post("/", createDeliveryFee);
  router.put("/:id", updateDeliveryFee);
  router.delete("/:id", deleteDeliveryFee);
  
  export default router;