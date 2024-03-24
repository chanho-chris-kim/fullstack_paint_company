import express from 'express';
import { getPaints } from '../controllers/paintsController.mjs';

const router = express.Router();

// Route to get paints
router.route("/").get(getPaints);

export default router;