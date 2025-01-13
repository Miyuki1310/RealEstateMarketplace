import express from "express";
import isAuth from "../../middlewares/authMiddleware.js";
import listingController from "../../controllers/listing.route.js";
const listRouter = express.Router();

listRouter.get("/test", (req, res) => {
  return res.json({ message: "Listing route" });
});

listRouter.post("/create", isAuth, listingController.create);
listRouter.get("/getAll/:id", isAuth, listingController.getUserListings);
listRouter.delete("/delete/:id", isAuth, listingController.deleteListing);

export default listRouter;
