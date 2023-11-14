import { Router } from "express";
import publicController from "../controllers/public.js";
import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import categoriesController from "../controllers/categories.js";


const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

apiRoutes.post("/register", authController.register);
apiRoutes.post("/login", authController.login);

apiRoutes.get("/public", authController.publicController);
apiRoutes.get("/protected", isAuthenticated, authController.protectedController);

apiRoutes.post("/store", categoriesController.store);
apiRoutes.delete("/delete", categoriesController.deleteCategories);
apiRoutes.put("/update", categoriesController.update);
apiRoutes.get("/show", categoriesController.show);

export default apiRoutes;