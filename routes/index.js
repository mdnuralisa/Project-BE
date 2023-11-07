import { Router } from "express";
import publicController from "../controllers/public.js";

const apiRoutes = Router();

apiRoutes.get("/", publicController.get);
apiRoutes.post("/", publicController.post);

export default apiRoutes;