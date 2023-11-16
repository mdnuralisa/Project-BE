import { Router } from "express";
import publicController from "../controllers/public.js";
import authController from "../controllers/auth.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import categoriesController from "../controllers/categories.js";
import itemsController from "../controllers/items.js";


const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

//api for auth
apiRoutes.post("/register", authController.register);
apiRoutes.post("/login", authController.login);

apiRoutes.get("/public", authController.publicController);
apiRoutes.get("/protected", isAuthenticated, authController.protectedController);


//api for categories
apiRoutes.post("/categories/store", isAuthenticated, categoriesController.store);
apiRoutes.delete("/categories/delete/:id", isAuthenticated, categoriesController.deleteCategories);
apiRoutes.put("/categories/update/:id", isAuthenticated, categoriesController.update);
apiRoutes.get("/categories/show/:id", isAuthenticated, categoriesController.show);
apiRoutes.get("/categories/listing", isAuthenticated, categoriesController.listing);

//api for items
apiRoutes.post("/items/store", isAuthenticated, itemsController.store);


export default apiRoutes;