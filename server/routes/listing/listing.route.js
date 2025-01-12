import express from "express";
import isAuth from "../../middlewares/authMiddleware.js";
import listingController from "../../controllers/listing.route.js";
const listRouter = express.Router();

listRouter.get("/test", (req, res) => {
  return res.json({ message: "Listing route" });
});

listRouter.post("/create", isAuth, listingController.create);

export default listRouter;
