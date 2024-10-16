import express from "express";

import {
  getProduct,
  creatProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProduct);

router.post("/", creatProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
