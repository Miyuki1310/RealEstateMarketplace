import express from "express";
import isAuth from "../../middlewares/authMiddleware.js";
import { listingController } from "../../controllers/index.js";
const listRouter = express.Router();

listRouter.get("/test", (req, res) => {
  return res.json({ message: "Listing route" });
});

listRouter.post("/create", isAuth, listingController.create);
listRouter.get("/getAll/:id", isAuth, listingController.getUserListings);
listRouter.delete("/delete/:id", isAuth, listingController.deleteListing);
listRouter.put("/update/:id", isAuth, listingController.updateListing);

export default listRouter;
