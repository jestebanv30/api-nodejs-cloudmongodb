import { Router } from "express";
import * as controllerProduct from "../controllers/product.controller.js";

const router = Router();

router.get("/product", controllerProduct.getAllRecipes);
router.get("/product/:id", controllerProduct.getRecipeById);
router.post("/product", controllerProduct.createRecipe);
router.put("/product/:id", controllerProduct.updateRecipe);
router.delete("/product/:id", controllerProduct.deleteRecipe);

export default router;
