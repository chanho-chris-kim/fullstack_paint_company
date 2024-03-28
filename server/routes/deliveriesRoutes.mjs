import express from "express";
import {
  getDeliveries,
  getDelivery,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from "../controllers/deliveriesController.mjs";

const router = express.Router();

// routes for deliveries
router.route("/").get(getDeliveries).post(createDelivery)
router.route("/:id").get(getDelivery).put(updateDelivery).delete(deleteDelivery);

export default router;